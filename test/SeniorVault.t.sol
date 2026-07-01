// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


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
        vm.deal(senior, 10 ether);
    }


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




}