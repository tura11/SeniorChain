// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.31;


import {SeniorVault} from "../src/SeniorVault.sol";
import {Test} from "lib/forge-std/src/Test.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/ERC20Mock.sol";


contract SeniorVaultTest is Test {

    event DepositedEth(address indexed user, uint256 amount);

    address public senior;
    address public guardian;
    SeniorVault public vault;
    ERC20Mock public token;
    address public constant ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    function setUp() public {
        vault = new SeniorVault();
        senior = address(this);
        guardian = makeAddr("guardian");
        token = new ERC20Mock();
        vault.proposeGuardian(guardian);
        vm.deal(senior, 10 ether);
        token.mint(senior, 1000e6);// 1000 usdc
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



}