// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.31;

import {SeniorVault} from "../src/SeniorVault.sol";
import {Test} from "lib/forge-std/src/Test.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/ERC20Mock.sol";

contract SeniorVaultTest is Test {
    event DepositedEth(address indexed user, uint256 amount);
    event DepositedToken(address indexed user, uint256 amount);
    event WithdrawedERC20(address indexed token, uint256 amount);

    address public senior;
    address public guardian;
    SeniorVault public vault;
    ERC20Mock public token;
    address public constant ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    function setUp() public {
        vault = new SeniorVault(senior);
        senior = address(this);
        guardian = makeAddr("guardian");
        token = new ERC20Mock();
        vault.proposeGuardian(guardian);
        vm.deal(senior, 10 ether);
        token.mint(senior, 1000e6); // 1000 usdc
        token.approve(address(vault), 1000e6);
    }

    /////////////////////////////////////////
    /////////// DEPOSIT TESTS ///////////////
    /////////////////////////////////////////

    function testDepositEth() public {
        vm.startPrank(senior);
        vault.deposit{value: 1 ether}();
        vm.stopPrank();

        assertEq(vault.getUserTokenBalance(ETH_ADDRESS), 1 ether);
    }

    function testDepositRevertIfNotSenior() public {
        vm.startPrank(guardian);
        vm.deal(guardian, 1 ether);
        vm.expectRevert(); // expecting revert beacuse its not senior
        vault.deposit{value: 1 ether}();
        vm.stopPrank();
    }

    function testDepositEmitEvent() public {
        vm.startPrank(senior);
        vm.expectEmit(true, false, false, true);
        emit DepositedEth(senior, 1 ether);
        vault.deposit{value: 1 ether}();
        vm.stopPrank();
    }

    /////////////////////////////////////////
    /////////// DEPOSIT TOKEN  TESTS ////////
    /////////////////////////////////////////

    function testDepositToken() public {
        vm.prank(senior);
        vault.proposeToken(address(token));
        vm.prank(guardian);
        vault.approveToken(address(token));
        vm.prank(senior);
        vault.depositERC20(address(token), 500e6);
        assertEq(vault.getUserTokenBalance(address(token)), 500e6);
    }

    function testDepositTokenWhiteListedRevert() public {
        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__AddressNotWhiteListed.selector);
        vault.depositERC20(address(token), 500e6);
    }

    function testDepositTokenEmitEvent() public {
        vm.prank(senior);
        vault.proposeToken(address(token));
        vm.prank(guardian);
        vault.approveToken(address(token));
        vm.prank(senior);
        emit DepositedToken(address(token), 500e6);
        vault.depositERC20(address(token), 500e6);
    }

    function testProposeAndApproveGuardian() public {
        address guardian2 = makeAddr("guardian2");
        vm.prank(senior);
        vault.proposeGuardian(guardian2);
        vm.prank(guardian);
        vault.approveNewGuardian();
        assertEq(vault.guardian(), guardian2);
    }

    function testProposeSafeAddress() public {
        address safeAddress1 = makeAddr("safeAddress1");
        vm.prank(senior);
        vault.proposesSafeAddresses(safeAddress1);
        vm.prank(guardian);
        vault.approveSafeAddress(safeAddress1);
        assertEq(vault.isAddressWhiteListed(safeAddress1), true);
    }

    /////////////////////////////////////////
    /////////// WITHDRAW ETH TESTS //////////
    /////////////////////////////////////////

    function testWithdrawEth() public {
        address safeAddress1 = makeAddr("safeAddress1");

        vm.prank(senior);
        vault.proposesSafeAddresses(safeAddress1);
        vm.prank(guardian);
        vault.approveSafeAddress(safeAddress1);

        vm.prank(senior);
        vault.deposit{value: 5 ether}();

        uint256 recipientBalanceBefore = safeAddress1.balance;

        vm.prank(senior);
        vault.withdrawETH(safeAddress1, 2 ether);

        assertEq(vault.getUserTokenBalance(ETH_ADDRESS), 3 ether);
        assertEq(safeAddress1.balance, recipientBalanceBefore + 2 ether);
    }

    function testWithdrawEthRevertIfNotWhiteListed() public {
        address notWhiteListed = makeAddr("notWhiteListed");

        vm.prank(senior);
        vault.deposit{value: 5 ether}();

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__AddressNotWhiteListed.selector);
        vault.withdrawETH(notWhiteListed, 1 ether);
    }

    function testWithdrawEthRevertIfNotEnoughMoney() public {
        address safeAddress1 = makeAddr("safeAddress1");

        vm.prank(senior);
        vault.proposesSafeAddresses(safeAddress1);
        vm.prank(guardian);
        vault.approveSafeAddress(safeAddress1);

        vm.prank(senior);
        vault.deposit{value: 1 ether}();

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__NotEnoughMoney.selector);
        vault.withdrawETH(safeAddress1, 2 ether);
    }

    function testWithdrawEthRevertIfNotSenior() public {
        address safeAddress1 = makeAddr("safeAddress1");

        vm.prank(senior);
        vault.proposesSafeAddresses(safeAddress1);
        vm.prank(guardian);
        vault.approveSafeAddress(safeAddress1);

        vm.prank(senior);
        vault.deposit{value: 1 ether}();

        vm.prank(guardian);
        vm.expectRevert(SeniorVault.SeniorVault__NotSenior.selector);
        vault.withdrawETH(safeAddress1, 1 ether);
    }

    function testWithdrawEthRevertIfTransferFailed() public {
        RejectEther rejecter = new RejectEther();

        vm.prank(senior);
        vault.proposesSafeAddresses(address(rejecter));
        vm.prank(guardian);
        vault.approveSafeAddress(address(rejecter));

        vm.prank(senior);
        vault.deposit{value: 1 ether}();

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__TransferFailed.selector);
        vault.withdrawETH(address(rejecter), 1 ether);
    }

    /////////////////////////////////////////
    /////////// WITHDRAW ERC20 TESTS ////////
    /////////////////////////////////////////

    function testWithdrawErc20() public {
        address safeAddress1 = makeAddr("safeAddress1");

        vm.startPrank(senior);
        vault.proposesSafeAddresses(safeAddress1);
        vm.stopPrank();
        vm.prank(guardian);
        vault.approveSafeAddress(safeAddress1);

        vm.startPrank(senior);
        vault.proposeToken(address(token));
        vm.stopPrank();
        vm.prank(guardian);
        vault.approveToken(address(token));

        vm.prank(senior);
        vault.depositERC20(address(token), 500e6);

        vm.prank(senior);
        vault.withdrawERC20(safeAddress1, 200e6, address(token));

        assertEq(vault.getUserTokenBalance(address(token)), 300e6);
        assertEq(token.balanceOf(safeAddress1), 200e6);
    }

    function testWithdrawErc20RevertIfNotWhiteListed() public {
        address notWhiteListed = makeAddr("notWhiteListed");

        vm.prank(senior);
        vault.proposeToken(address(token));
        vm.prank(guardian);
        vault.approveToken(address(token));

        vm.prank(senior);
        vault.depositERC20(address(token), 500e6);

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__AddressNotWhiteListed.selector);
        vault.withdrawERC20(notWhiteListed, 100e6, address(token));
    }

    function testWithdrawErc20RevertIfNotEnoughMoney() public {
        address safeAddress1 = makeAddr("safeAddress1");

        vm.prank(senior);
        vault.proposesSafeAddresses(safeAddress1);
        vm.prank(guardian);
        vault.approveSafeAddress(safeAddress1);

        vm.prank(senior);
        vault.proposeToken(address(token));
        vm.prank(guardian);
        vault.approveToken(address(token));

        vm.prank(senior);
        vault.depositERC20(address(token), 100e6);

        vm.prank(senior);
        vm.expectRevert(SeniorVault.SeniorVault__NotEnoughMoney.selector);
        vault.withdrawERC20(safeAddress1, 200e6, address(token));
    }

    function testWithdrawErc20RevertIfNotSenior() public {
        address safeAddress1 = makeAddr("safeAddress1");

        vm.prank(senior);
        vault.proposesSafeAddresses(safeAddress1);
        vm.prank(guardian);
        vault.approveSafeAddress(safeAddress1);

        vm.prank(senior);
        vault.proposeToken(address(token));
        vm.prank(guardian);
        vault.approveToken(address(token));

        vm.prank(senior);
        vault.depositERC20(address(token), 100e6);

        vm.prank(guardian);
        vm.expectRevert(SeniorVault.SeniorVault__NotSenior.selector);
        vault.withdrawERC20(safeAddress1, 50e6, address(token));
    }

    function testWithdrawErc20EmitEvent() public {
        address safeAddress1 = makeAddr("safeAddress1");

        vm.prank(senior);
        vault.proposesSafeAddresses(safeAddress1);
        vm.prank(guardian);
        vault.approveSafeAddress(safeAddress1);

        vm.prank(senior);
        vault.proposeToken(address(token));
        vm.prank(guardian);
        vault.approveToken(address(token));

        vm.prank(senior);
        vault.depositERC20(address(token), 500e6);

        vm.prank(senior);
        vm.expectEmit(true, false, false, true);
        emit WithdrawedERC20(address(token), 200e6);
        vault.withdrawERC20(safeAddress1, 200e6, address(token));
    }
}

contract RejectEther {
    receive() external payable {
        revert();
    }
}
