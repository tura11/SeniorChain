// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/ERC20Mock.sol";
import {SeniorVault} from "../../src/SeniorVault.sol";

contract SeniorVaultFuzzTest is Test {
    SeniorVault internal vault;
    ERC20Mock internal token;

    address internal senior;
    address internal guardian;
    address internal recipient;

    address internal constant ETH_ADDRESS =
        0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    function setUp() public {
        senior = makeAddr("senior");
        guardian = makeAddr("guardian");
        recipient = makeAddr("recipient");

        vault = new SeniorVault(senior);
        token = new ERC20Mock();

        vm.prank(senior);
        vault.proposeGuardian(guardian);
        vm.prank(guardian);
        vault.acceptGuardian();

        vm.prank(senior);
        vault.proposesSafeAddresses(recipient);
        vm.prank(guardian);
        vault.approveSafeAddress(recipient);

        vm.prank(senior);
        vault.proposeToken(address(token));
        vm.prank(guardian);
        vault.approveToken(address(token));

        vm.prank(guardian);
        vault.setWithdrawalLimits(
            ETH_ADDRESS,
            type(uint256).max,
            type(uint256).max,
            30 days
        );

        vm.prank(guardian);
        vault.setWithdrawalLimits(
            address(token),
            type(uint256).max,
            type(uint256).max,
            30 days
        );

        vm.deal(senior, type(uint96).max);
        token.mint(senior, type(uint128).max);

        vm.prank(senior);
        token.approve(address(vault), type(uint256).max);
    }

    function testFuzzDepositEth(uint96 rawAmount) public {
        uint256 amount = bound(uint256(rawAmount), 0, 10 ether);

        vm.deal(senior, amount);
        vm.prank(senior);
        vault.deposit{value: amount}();

        assertEq(vault.getUserTokenBalance(ETH_ADDRESS), amount);
        assertEq(address(vault).balance, amount);
    }

    function testFuzzDepositERC20(uint96 rawAmount) public {
        uint256 amount = bound(uint256(rawAmount), 0, 1_000_000e18);

        token.mint(senior, amount);

        vm.prank(senior);
        vault.depositERC20(address(token), amount);

        assertEq(vault.getUserTokenBalance(address(token)), amount);
        assertEq(token.balanceOf(address(vault)), amount);
    }

    function testFuzzInstantEthWithdrawal(uint96 rawAmount) public {
        uint256 depositAmount = 10 ether;
        uint256 amount = bound(uint256(rawAmount), 1, depositAmount);

        vm.deal(senior, depositAmount);
        vm.prank(senior);
        vault.deposit{value: depositAmount}();

        vm.prank(senior);
        vault.withdrawETH(recipient, amount);

        assertEq(recipient.balance, amount);
        assertEq(vault.getUserTokenBalance(ETH_ADDRESS), depositAmount - amount);
        assertEq(address(vault).balance, depositAmount - amount);
    }

    function testFuzzInstantERC20Withdrawal(uint96 rawAmount) public {
        uint256 depositAmount = 1_000_000e18;
        uint256 amount = bound(uint256(rawAmount), 1, depositAmount);

        token.mint(senior, depositAmount);
        vm.prank(senior);
        vault.depositERC20(address(token), depositAmount);

        vm.prank(senior);
        vault.withdrawERC20(recipient, amount, address(token));

        assertEq(token.balanceOf(recipient), amount);
        assertEq(
            vault.getUserTokenBalance(address(token)),
            depositAmount - amount
        );
        assertEq(
            token.balanceOf(address(vault)),
            depositAmount - amount
        );
    }

    function testFuzzWithdrawalAboveSingleTxThresholdGetsQueued(
        uint96 rawAmount,
        uint96 rawThreshold
    ) public {
        uint256 amount = bound(uint256(rawAmount), 2, 1_000_000);
        uint256 threshold = bound(uint256(rawThreshold), 1, amount - 1);

        vm.deal(senior, amount);
        vm.prank(senior);
        vault.deposit{value: amount}();

        vm.prank(guardian);
        vault.setWithdrawalLimits(ETH_ADDRESS, type(uint256).max, threshold, 30 days);

        uint256 idBefore = vault.nextWithdrawalId();

        vm.prank(senior);
        vault.withdrawETH(recipient, amount);

        assertEq(vault.nextWithdrawalId(), idBefore + 1);
        assertEq(vault.getUserTokenBalance(ETH_ADDRESS), 0);

        (
            address queuedToken,
            uint256 queuedAmount,
            address queuedRecipient,
            ,
            uint256 queuedEpoch,
            bool executed,
            bool cancelled
        ) = vault.pendingWithdrawals(idBefore);

        assertEq(queuedToken, ETH_ADDRESS);
        assertEq(queuedAmount, amount);
        assertEq(queuedRecipient, recipient);
        assertEq(queuedEpoch, vault.recoveryEpoch());
        assertFalse(executed);
        assertFalse(cancelled);
    }

    function testFuzzCancelQueuedEthWithdrawalRestoresLedger(
        uint96 rawAmount
    ) public {
        uint256 amount = bound(uint256(rawAmount), 2, 10 ether);

        vm.deal(senior, amount);
        vm.prank(senior);
        vault.deposit{value: amount}();

        vm.prank(guardian);
        vault.setWithdrawalLimits(ETH_ADDRESS, type(uint256).max, 1, 30 days);

        vm.prank(senior);
        vault.withdrawETH(recipient, amount);

        uint256 id = vault.nextWithdrawalId() - 1;

        vm.prank(senior);
        vault.cancelWithdrawal(id);

        assertEq(vault.getUserTokenBalance(ETH_ADDRESS), amount);
        assertEq(address(vault).balance, amount);

        (, , , , , bool executed, bool cancelled) = vault.pendingWithdrawals(id);
        assertFalse(executed);
        assertTrue(cancelled);
    }
}


