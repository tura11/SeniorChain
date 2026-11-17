// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import {Test} from "forge-std/Test.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/ERC20Mock.sol";
import {SeniorVault} from "../../src/SeniorVault.sol";

contract CovRejectEther {
    receive() external payable {
        revert();
    }
}

/// Factory, ktory poprawnie obsluguje updateSeniorAddress.
contract CovFactory {
    address public lastOldSenior;
    address public lastNewSenior;

    function deploy(address senior) external returns (SeniorVault) {
        return new SeniorVault(senior);
    }

    function updateSeniorAddress(address oldSenior, address newSenior) external {
        lastOldSenior = oldSenior;
        lastNewSenior = newSenior;
    }
}

/// Factory, ktore zawsze reverta w updateSeniorAddress (sciezka catch).
contract CovRevertingFactory {
    function deploy(address senior) external returns (SeniorVault) {
        return new SeniorVault(senior);
    }

    function updateSeniorAddress(address, address) external pure {
        revert("factory down");
    }
}

/// Harness do osiagniecia sciezki, ktorej nie da sie wywolac normalnym flow
/// (token traci whitelist po zakolejkowaniu wyplaty).
contract CovVaultHarness is SeniorVault {
    constructor(address _senior) SeniorVault(_senior) {}

    function exposedUnwhitelistToken(address t) external {
        isWhiteListedToken[t] = false;
    }
}

contract SeniorVaultCoverageTest is Test {
    CovVaultHarness public vault;
    ERC20Mock public token;

    address public senior;
    address public guardian;
    address public newSenior;
    address public stranger;
    address public recipient;

    address public constant ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    function setUp() public {
        senior = makeAddr("senior");
        guardian = makeAddr("guardian");
        newSenior = makeAddr("newSenior");
        stranger = makeAddr("stranger");
        recipient = makeAddr("recipient");

        // factory == address(this) (kontrakt testowy nie ma updateSeniorAddress -> catch)
        vault = new CovVaultHarness(senior);
        token = new ERC20Mock();

        vm.prank(senior);
        vault.proposeGuardian(guardian);
        vm.prank(guardian);
        vault.acceptGuardian();

        vm.deal(senior, 10 ether);
        vm.deal(newSenior, 10 ether);
        token.mint(senior, 1000e6);
        vm.prank(senior);
        token.approve(address(vault), type(uint256).max);
    }

    /////////////////////////////////////////
    /////////////// HELPERS /////////////////
    /////////////////////////////////////////

    function _whitelistRecipient(address r) internal {
        vm.prank(senior);
        vault.proposesSafeAddresses(r);
        vm.prank(guardian);
        vault.approveSafeAddress(r);
    }

    function _depositEth(uint256 amount) internal {
        vm.prank(senior);
        vault.deposit{value: amount}();
    }

    function _depositToken(uint256 amount) internal {
        vm.prank(senior);
        vault.depositERC20(address(token), amount);
    }

    function _setLimits(address t, uint256 periodLimit, uint256 singleTx) internal {
        vm.prank(guardian);
        vault.setWithdrawalLimits(t, periodLimit, singleTx, 1 days);
    }

    function _passTimelock() internal {
        vm.warp(block.timestamp + vault.TIMELOCK_DURATION());
    }

    function _whitelistToken() internal {
        vm.prank(senior);
        vault.proposeToken(address(token));
        vm.prank(guardian);
        vault.approveToken(address(token));
    }

    /// 5 ETH w vaulcie, recipient na whiteliscie, limit single tx = 1 ETH
    function _prepareEth() internal {
        _whitelistRecipient(recipient);
        vm.prank(senior);
        vault.deposit{value: 5 ether}();
        vm.prank(guardian);
        vault.setWithdrawalLimits(ETH_ADDRESS, 5 ether, 1 ether, 1 days);
    }

    /// kolejkuje wyplate 2 ETH (> threshold) i zwraca jej id
    function _queueEth() internal returns (uint256 id) {
        _prepareEth();
        id = vault.nextWithdrawalId();
        vm.prank(senior);
        vault.withdrawETH(recipient, 2 ether);
    }

    /// kolejkuje wyplate 300e6 tokena (> threshold 200e6) i zwraca jej id
    function _queueErc20() internal returns (uint256 id) {
        _whitelistRecipient(recipient);
        _whitelistToken();
        vm.prank(senior);
        vault.depositERC20(address(token), 500e6);
        vm.prank(guardian);
        vault.setWithdrawalLimits(address(token), 1000e6, 200e6, 1 days);
        id = vault.nextWithdrawalId();
        vm.prank(senior);
        vault.withdrawERC20(recipient, 300e6, address(token));
    }

    function _proposeRecovery() internal {
        vm.prank(guardian);
        vault.proposeNewSenior(newSenior);
    }

    function _completeRecovery() internal {
        _proposeRecovery();
        vm.warp(vault.recoveryUnlockTime());
        vm.prank(newSenior);
        vault.executeRecovery();
    }

    /////////////////////////////////////////
    /////////////// CONSTRUCTOR /////////////
    /////////////////////////////////////////

    function testConstructorRevertsOnZeroSenior() public {
        vm.expectRevert(SeniorVault.SeniorVault__InvalidAddress.selector);
        new SeniorVault(address(0));
    }

    function testConstructorSetsSeniorAndFactory() public view {
        assertEq(vault.senior(), senior);
        assertEq(vault.factory(), address(this));
    }

    /////////////////////////////////////////
    /////////// ACCESS / WHITELISTS /////////
    /////////////////////////////////////////

    function testOnlyGuardianRevertsForStranger() public {
        vm.prank(stranger);
        vm.expectRevert(SeniorVault.SeniorVault__NotGuardian.selector);
        vault.approveSafeAddress(recipient);
    }

    function testProposeSafeAddressRevertsOnZero() public {
        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__InvalidAddress.selector);
        vault.proposesSafeAddresses(address(0));
    }

    function testApproveSafeAddressRevertsIfNotProposed() public {
        vm.prank(guardian);
        vm.expectRevert(SeniorVault.SeniorVault__NotProposed.selector);
        vault.approveSafeAddress(recipient);
    }

    function testRemoveSafeAddress() public {
        _whitelistRecipient(recipient);
        assertTrue(vault.isAddressWhiteListed(recipient));

        vm.prank(guardian);
        vault.removeSafeAddress(recipient);

        assertFalse(vault.isAddressWhiteListed(recipient));
    }

    function testRemoveSafeAddressRevertsIfNotWhitelisted() public {
        vm.prank(guardian);
        vm.expectRevert(SeniorVault.SeniorVault__AddressNotWhiteListed.selector);
        vault.removeSafeAddress(recipient);
    }

    function testProposeTokenRevertsOnZero() public {
        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__InvalidAddress.selector);
        vault.proposeToken(address(0));
    }

    function testApproveTokenRevertsIfNotProposed() public {
        vm.prank(guardian);
        vm.expectRevert(SeniorVault.SeniorVault__NotProposed.selector);
        vault.approveToken(address(token));
    }

    function testIsTokenWhiteListedGetter() public {
        assertFalse(vault.isTokenWhiteListed(address(token)));
        _whitelistToken();
        assertTrue(vault.isTokenWhiteListed(address(token)));
    }

    /////////////////////////////////////////
    /////////// WITHDRAWAL LIMITS ///////////
    /////////////////////////////////////////

    function testSetWithdrawalLimitsEmitsEvent() public {
        vm.expectEmit(true, false, false, true);
        emit SeniorVault.WithdrawalLimitsChanged(ETH_ADDRESS, 5 ether, 1 ether, 1 days);
        vm.prank(guardian);
        vault.setWithdrawalLimits(ETH_ADDRESS, 5 ether, 1 ether, 1 days);
    }

    function testSetWithdrawalLimitsRevertsIfTokenNotWhitelisted() public {
        vm.prank(guardian);
        vm.expectRevert(SeniorVault.SeniorVault__TokenNotWhiteListed.selector);
        vault.setWithdrawalLimits(address(token), 1, 1, 1);
    }

    function testSetWithdrawalLimitsRevertsOnZeroPeriodLimit() public {
        vm.prank(guardian);
        vm.expectRevert(SeniorVault.SeniorVault__InvalidPeriod.selector);
        vault.setWithdrawalLimits(ETH_ADDRESS, 0, 1, 1);
    }

    function testSetWithdrawalLimitsRevertsOnZeroSingleTx() public {
        vm.prank(guardian);
        vm.expectRevert(SeniorVault.SeniorVault__InvalidSingleTxThreshold.selector);
        vault.setWithdrawalLimits(ETH_ADDRESS, 1, 0, 1);
    }

    function testSetWithdrawalLimitsRevertsOnZeroDuration() public {
        vm.prank(guardian);
        vm.expectRevert(SeniorVault.SeniorVault__InvalidPeriodDuration.selector);
        vault.setWithdrawalLimits(ETH_ADDRESS, 1, 1, 0);
    }

    /////////////////////////////////////////
    /////////// WITHDRAW REVERTS ////////////
    /////////////////////////////////////////

    function testWithdrawEthRevertsOnZeroAmount() public {
        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__InvalidAmount.selector);
        vault.withdrawETH(recipient, 0);
    }

    function testWithdrawEthRevertsIfRecipientNotWhitelisted() public {
        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__AddressNotWhiteListed.selector);
        vault.withdrawETH(recipient, 1 ether);
    }

    function testWithdrawErc20RevertsOnZeroAmount() public {
        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__InvalidAmount.selector);
        vault.withdrawERC20(recipient, 0, address(token));
    }

    function testWithdrawErc20RevertsIfTokenNotWhitelisted() public {
        _whitelistRecipient(recipient);

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__TokenAddressNotWhiteListed.selector);
        vault.withdrawERC20(recipient, 1e6, address(token));
    }

    function testWithdrawEthRevertsDuringPendingRecovery() public {
        _proposeRecovery();

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__RecoveryIsPending.selector);
        vault.withdrawETH(recipient, 1 ether);
    }

    function testWithdrawErc20RevertsDuringPendingRecovery() public {
        _proposeRecovery();

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__RecoveryIsPending.selector);
        vault.withdrawERC20(recipient, 1e6, address(token));
    }

    /////////////////////////////////////////
    /////////// EXECUTE / CANCEL ////////////
    /////////////////////////////////////////

    function testExecuteWithdrawalRevertsIfEthTransferFails() public {
        CovRejectEther rejecter = new CovRejectEther();
        _whitelistRecipient(address(rejecter));

        vm.prank(senior);
        vault.deposit{value: 2 ether}();
        vm.prank(guardian);
        vault.setWithdrawalLimits(ETH_ADDRESS, 5 ether, 1 ether, 1 days);
        vm.prank(senior);
        vault.withdrawETH(address(rejecter), 2 ether);

        vm.warp(block.timestamp + vault.TIMELOCK_DURATION());

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__TransferFailed.selector);
        vault.executeWithdrawal(0);
    }

    function testExecuteWithdrawalRevertsIfCancelled() public {
        uint256 id = _queueEth();

        vm.prank(guardian);
        vault.cancelWithdrawal(id);

        vm.warp(block.timestamp + vault.TIMELOCK_DURATION());

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__WithdrawalAlreadyCancelled.selector);
        vault.executeWithdrawal(id);
    }

    function testExecuteWithdrawalRevertsIfTokenLostWhitelist() public {
        uint256 id = _queueErc20();

        vault.exposedUnwhitelistToken(address(token));
        vm.warp(block.timestamp + vault.TIMELOCK_DURATION());

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__TokenNotWhiteListed.selector);
        vault.executeWithdrawal(id);
    }

    function testCancelWithdrawalRestoresBalance() public {
        uint256 id = _queueEth();
        assertEq(vault.getUserTokenBalance(ETH_ADDRESS), 3 ether);

        vm.prank(senior);
        vault.cancelWithdrawal(id);

        assertEq(vault.getUserTokenBalance(ETH_ADDRESS), 5 ether);
    }

    function testCancelWithdrawalRevertsIfAlreadyCancelled() public {
        uint256 id = _queueEth();

        vm.prank(senior);
        vault.cancelWithdrawal(id);

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__Cancelled.selector);
        vault.cancelWithdrawal(id);
    }

    function testExecuteWithdrawalStillWorksDuringPendingRecovery() public {
        uint256 id = _queueEth();
        _proposeRecovery();

        vm.warp(block.timestamp + vault.TIMELOCK_DURATION());

        vm.prank(guardian);
        vault.executeWithdrawal(id);

        assertEq(recipient.balance, 2 ether);
    }

    /////////////////////////////////////////
    /////////// proposeNewSenior ////////////
    /////////////////////////////////////////

    function testProposeNewSeniorSetsStateAndEmits() public {
        uint256 expectedUnlock = block.timestamp + vault.RECOVERY_TIMELOCK();

        vm.expectEmit(true, true, false, true);
        emit SeniorVault.RecoveryProposed(guardian, newSenior, expectedUnlock);
        vm.prank(guardian);
        vault.proposeNewSenior(newSenior);

        assertEq(vault.pendingSenior(), newSenior);
        assertEq(vault.recoveryUnlockTime(), expectedUnlock);
        // stary senior dalej jest seniorem do czasu execute
        assertEq(vault.senior(), senior);
    }

    function testProposeNewSeniorRevertsIfNotGuardian() public {
        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__NotGuardian.selector);
        vault.proposeNewSenior(newSenior);

        vm.prank(stranger);
        vm.expectRevert(SeniorVault.SeniorVault__NotGuardian.selector);
        vault.proposeNewSenior(newSenior);
    }

    function testProposeNewSeniorRevertsOnZeroAddress() public {
        vm.prank(guardian);
        vm.expectRevert(SeniorVault.SeniorVault__InvalidNewSenior.selector);
        vault.proposeNewSenior(address(0));
    }

    function testProposeNewSeniorRevertsIfSameAsSenior() public {
        vm.prank(guardian);
        vm.expectRevert(SeniorVault.SeniorVault__InvalidNewSenior.selector);
        vault.proposeNewSenior(senior);
    }

    function testProposeNewSeniorRevertsIfSameAsGuardian() public {
        vm.prank(guardian);
        vm.expectRevert(SeniorVault.SeniorVault__InvalidNewSenior.selector);
        vault.proposeNewSenior(guardian);
    }

    function testProposeNewSeniorOverwriteResetsTimer() public {
        _proposeRecovery();
        vm.warp(block.timestamp + 3 days);

        address other = makeAddr("other");
        uint256 expectedUnlock = block.timestamp + vault.RECOVERY_TIMELOCK();
        vm.prank(guardian);
        vault.proposeNewSenior(other);

        assertEq(vault.pendingSenior(), other);
        assertEq(vault.recoveryUnlockTime(), expectedUnlock);
    }

    function testRecoveryImpossibleWithoutGuardian() public {
        CovVaultHarness lonely = new CovVaultHarness(senior);

        vm.prank(stranger);
        vm.expectRevert(SeniorVault.SeniorVault__NotGuardian.selector);
        lonely.proposeNewSenior(newSenior);
    }

    /////////////////////////////////////////
    /////////// cancelRecovery //////////////
    /////////////////////////////////////////

    function testCancelRecoveryBySenior() public {
        _proposeRecovery();

        vm.expectEmit(true, false, false, false);
        emit SeniorVault.RecoveryCancelled(senior);
        vm.prank(senior);
        vault.cancelRecovery();

        assertEq(vault.pendingSenior(), address(0));
        assertEq(vault.recoveryUnlockTime(), 0);
    }

    function testCancelRecoveryByGuardian() public {
        _proposeRecovery();

        vm.expectEmit(true, false, false, false);
        emit SeniorVault.RecoveryCancelled(guardian);
        vm.prank(guardian);
        vault.cancelRecovery();

        assertEq(vault.pendingSenior(), address(0));
    }

    function testCancelRecoveryRevertsIfNothingPending() public {
        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__NoRecoveryPending.selector);
        vault.cancelRecovery();
    }

    function testCancelRecoveryRevertsForStranger() public {
        _proposeRecovery();

        vm.prank(stranger);
        vm.expectRevert(SeniorVault.SeniorVault__NoAccess.selector);
        vault.cancelRecovery();

        // nawet proponowany nowy senior nie moze anulowac
        vm.prank(newSenior);
        vm.expectRevert(SeniorVault.SeniorVault__NoAccess.selector);
        vault.cancelRecovery();
    }

    function testExecuteRecoveryRevertsAfterCancel() public {
        _proposeRecovery();
        vm.prank(senior);
        vault.cancelRecovery();

        vm.warp(block.timestamp + vault.RECOVERY_TIMELOCK());

        vm.expectRevert(SeniorVault.SeniorVault__NoRecoveryPending.selector);
        vault.executeRecovery();
    }

    /////////////////////////////////////////
    /////////// executeRecovery /////////////
    /////////////////////////////////////////

    function testExecuteRecoveryRevertsIfNothingPending() public {
        vm.expectRevert(SeniorVault.SeniorVault__NoRecoveryPending.selector);
        vault.executeRecovery();
    }

    function testExecuteRecoveryRevertsBeforeTimelock() public {
        _proposeRecovery();
        vm.warp(vault.recoveryUnlockTime() - 1);

        vm.expectRevert(SeniorVault.SeniorVault__RecoveryTimeLockNotExpired.selector);
        vault.executeRecovery();
    }

    function testExecuteRecoverySuccessExactlyAtUnlockTime() public {
        _proposeRecovery();
        uint256 epochBefore = vault.recoveryEpoch();
        vm.warp(vault.recoveryUnlockTime());

        vm.expectEmit(true, true, false, false);
        emit SeniorVault.RecoveryExecuted(senior, newSenior);
        vm.prank(stranger); // wykonac moze ktokolwiek
        vault.executeRecovery();

        assertEq(vault.senior(), newSenior);
        assertEq(vault.pendingSenior(), address(0));
        assertEq(vault.recoveryUnlockTime(), 0);
        assertEq(vault.recoveryEpoch(), epochBefore + 1);
    }

    function testOldSeniorLosesAccessAfterRecovery() public {
        _completeRecovery();

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__NotSenior.selector);
        vault.deposit{value: 1 ether}();

        vm.prank(newSenior);
        vault.deposit{value: 1 ether}();
        assertEq(vault.getUserTokenBalance(ETH_ADDRESS), 1 ether);
    }

    function testExecuteRecoveryNotifiesFactory() public {
        CovFactory f = new CovFactory();
        SeniorVault v = f.deploy(senior);

        vm.prank(senior);
        v.proposeGuardian(guardian);
        vm.prank(guardian);
        v.acceptGuardian();
        vm.prank(guardian);
        v.proposeNewSenior(newSenior);

        vm.warp(v.recoveryUnlockTime());
        vm.prank(newSenior);
        v.executeRecovery();

        assertEq(v.senior(), newSenior);
        assertEq(f.lastOldSenior(), senior);
        assertEq(f.lastNewSenior(), newSenior);
    }

    function testExecuteRecoverySucceedsEvenIfFactoryReverts() public {
        CovRevertingFactory f = new CovRevertingFactory();
        SeniorVault v = f.deploy(senior);

        vm.prank(senior);
        v.proposeGuardian(guardian);
        vm.prank(guardian);
        v.acceptGuardian();
        vm.prank(guardian);
        v.proposeNewSenior(newSenior);

        vm.warp(v.recoveryUnlockTime());
        vm.prank(newSenior);
        v.executeRecovery();

        assertEq(v.senior(), newSenior);
    }

    /////////////////////////////////////////
    /////////// EPOCH ///////////////////////
    /////////////////////////////////////////

    function testWithdrawAfterRecoveryUsesNewEpoch() public {
        _prepareEth();
        _completeRecovery();

        vm.prank(newSenior);
        vault.withdrawETH(recipient, 2 ether);

        (, , , , uint256 epoch, , ) = vault.pendingWithdrawals(0);
        assertEq(epoch, 1);

        vm.warp(block.timestamp + vault.TIMELOCK_DURATION());
        vm.prank(newSenior);
        vault.executeWithdrawal(0);

        assertEq(recipient.balance, 2 ether);
    }

    function testExecuteWithdrawalRevertsForOldEpoch() public {
        uint256 id = _queueEth();
        _completeRecovery();

        vm.prank(newSenior);
        vm.expectRevert(SeniorVault.SeniorVault__InvalidWithdrawalEpoch.selector);
        vault.executeWithdrawal(id);
    }

    /// UWAGA: ten test dokumentuje AKTUALNE zachowanie, ktore jest bugiem.
    /// Wyplata z poprzedniej epoki nie da sie ani wykonac, ani anulowac,
    /// a _balances zostalo zmniejszone przy kolejkowaniu -> 2 ETH zablokowane na stale.
    /// Jesli usuniesz check epoki z cancelWithdrawal, zamien ten test na taki,
    /// w ktorym nowy senior anuluje wyplate i odzyskuje saldo.
    function testCancelWithdrawalRevertsForOldEpochAndFundsStayLocked() public {
        uint256 id = _queueEth();
        _completeRecovery();

        vm.prank(newSenior);
        vm.expectRevert(SeniorVault.SeniorVault__InvalidWithdrawalEpoch.selector);
        vault.cancelWithdrawal(id);

        assertEq(vault.getUserTokenBalance(ETH_ADDRESS), 3 ether);
        assertEq(address(vault).balance, 5 ether);
    }
    

    /////////////////////////////////////////
    /////////// TESTY Z DRUGIEGO PLIKU //////
    /////////////////////////////////////////

    function testDepositErc20RevertsIfTokenNotWhitelisted() public {
        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__AddressNotWhiteListed.selector);
        vault.depositERC20(address(token), 1e6);
    }

    function testProposeGuardianRevertsOnZeroAddress() public {
        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__InvalidAddress.selector);
        vault.proposeGuardian(address(0));
    }

    function testAcceptGuardianRevertsIfNotProposed() public {
        vm.prank(stranger);
        vm.expectRevert(SeniorVault.SeniorVault__NotProposed.selector);
        vault.acceptGuardian();
    }

    /////////////////////////////////////////
    /////////// withdrawETH /////////////////
    /////////////////////////////////////////

    function testWithdrawEthRevertsIfNotEnoughMoney() public {
        _whitelistRecipient(recipient);
        _depositEth(1 ether);

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__NotEnoughMoney.selector);
        vault.withdrawETH(recipient, 2 ether);
    }

    function testWithdrawEthBelowLimitsIsInstant() public {
        _whitelistRecipient(recipient);
        _depositEth(5 ether);
        _setLimits(ETH_ADDRESS, 5 ether, 2 ether);

        vm.expectEmit(true, false, false, true);
        emit SeniorVault.WithdrawedETH(recipient, 1 ether);
        vm.prank(senior);
        vault.withdrawETH(recipient, 1 ether);

        assertEq(recipient.balance, 1 ether);
        assertEq(vault.getUserTokenBalance(ETH_ADDRESS), 4 ether);
        assertEq(vault.nextWithdrawalId(), 0);

        (, , uint256 spent, , ) = vault.withdrawalLimits(ETH_ADDRESS);
        assertEq(spent, 1 ether);
    }

    function testWithdrawEthQueuedWhenPeriodLimitExceeded() public {
        _whitelistRecipient(recipient);
        _depositEth(5 ether);
        _setLimits(ETH_ADDRESS, 3 ether, 2 ether);

        // 1. wyplata: 2 ETH (nie > singleTx, 0 + 2 <= 3) -> natychmiast
        vm.prank(senior);
        vault.withdrawETH(recipient, 2 ether);
        assertEq(recipient.balance, 2 ether);
        assertEq(vault.nextWithdrawalId(), 0);

        // 2. wyplata: 2 ETH (2 + 2 = 4 > 3) -> kolejka
        vm.prank(senior);
        vault.withdrawETH(recipient, 2 ether);
        assertEq(recipient.balance, 2 ether);
        assertEq(vault.nextWithdrawalId(), 1);
        assertEq(vault.getUserTokenBalance(ETH_ADDRESS), 1 ether);
    }

    function testWithdrawEthRevertsIfInstantTransferFails() public {
        CovRejectEther rejecter = new CovRejectEther();
        _whitelistRecipient(address(rejecter));
        _depositEth(5 ether);
        _setLimits(ETH_ADDRESS, 5 ether, 2 ether);

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__TransferFailed.selector);
        vault.withdrawETH(address(rejecter), 1 ether);
    }

    /////////////////////////////////////////
    /////////// withdrawERC20 ///////////////
    /////////////////////////////////////////

    function testWithdrawErc20RevertsIfRecipientNotWhitelisted() public {
        _whitelistToken();

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__AddressNotWhiteListed.selector);
        vault.withdrawERC20(recipient, 1e6, address(token));
    }

    function testWithdrawErc20RevertsIfNotEnoughMoney() public {
        _whitelistRecipient(recipient);
        _whitelistToken();
        _depositToken(100e6);

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__NotEnoughMoney.selector);
        vault.withdrawERC20(recipient, 200e6, address(token));
    }

    function testWithdrawErc20BelowLimitsIsInstant() public {
        _whitelistRecipient(recipient);
        _whitelistToken();
        _depositToken(500e6);
        _setLimits(address(token), 1000e6, 500e6);

        vm.expectEmit(true, false, false, true);
        emit SeniorVault.WithdrawedERC20(address(token), 200e6);
        vm.prank(senior);
        vault.withdrawERC20(recipient, 200e6, address(token));

        assertEq(token.balanceOf(recipient), 200e6);
        assertEq(vault.getUserTokenBalance(address(token)), 300e6);
        assertEq(vault.nextWithdrawalId(), 0);
    }

    /////////////////////////////////////////
    /////////// executeWithdrawal ///////////
    /////////////////////////////////////////

    function testExecuteWithdrawalErc20Success() public {
        uint256 id = _queueErc20();
        _passTimelock();

        vm.expectEmit(true, false, false, true);
        emit SeniorVault.WithdrawedERC20(address(token), 300e6);
        vm.prank(guardian);
        vault.executeWithdrawal(id);

        assertEq(token.balanceOf(recipient), 300e6);

        (, , , , , bool executed, ) = vault.pendingWithdrawals(id);
        assertTrue(executed);
    }

    function testExecuteWithdrawalRevertsIfNotFound() public {
        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__WithdrawalNotFound.selector);
        vault.executeWithdrawal(999);
    }

    function testExecuteWithdrawalRevertsForStranger() public {
        uint256 id = _queueEth();
        _passTimelock();

        vm.prank(stranger);
        vm.expectRevert(SeniorVault.SeniorVault__NoAccess.selector);
        vault.executeWithdrawal(id);
    }

    function testExecuteWithdrawalRevertsIfRecipientRemovedFromWhitelist() public {
        uint256 id = _queueEth();

        vm.prank(guardian);
        vault.removeSafeAddress(recipient);
        _passTimelock();

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__RecipientNotWhiteListed.selector);
        vault.executeWithdrawal(id);
    }

    function testExecuteWithdrawalRevertsIfAlreadyExecuted() public {
        uint256 id = _queueEth();
        _passTimelock();

        vm.prank(senior);
        vault.executeWithdrawal(id);

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__WithdrawalAlreadyExecuted.selector);
        vault.executeWithdrawal(id);
    }

    function testExecuteWithdrawalRevertsBeforeTimelock() public {
        uint256 id = _queueEth();
        vm.warp(block.timestamp + vault.TIMELOCK_DURATION() - 1);

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__TimeLockNotExpired.selector);
        vault.executeWithdrawal(id);
    }

    /////////////////////////////////////////
    /////////// cancelWithdrawal ////////////
    /////////////////////////////////////////

    function testCancelWithdrawalRevertsIfNotFound() public {
        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__WithdrawalNotFound.selector);
        vault.cancelWithdrawal(999);
    }

    function testCancelWithdrawalRevertsForStranger() public {
        uint256 id = _queueEth();

        vm.prank(stranger);
        vm.expectRevert(SeniorVault.SeniorVault__NoAccess.selector);
        vault.cancelWithdrawal(id);
    }

    function testCancelWithdrawalRevertsIfAlreadyExecuted() public {
        uint256 id = _queueEth();
        _passTimelock();

        vm.prank(senior);
        vault.executeWithdrawal(id);

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__WithdrawalAlreadyExecuted.selector);
        vault.cancelWithdrawal(id);
    }
}
