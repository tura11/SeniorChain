// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


import {SeniorVault} from "../src/SeniorVault.sol";
import {Test} from "lib/forge-std/src/Test.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/ERC20Mock.sol";


contract SeniorVaultTest is Test{

    address senior;
    address guardian;
    SeniorVault vault;
    ERC20Mock token;    

    function setUp() public {
        vault = new SeniorVault();
        senior = address(this);
        guardian = makeAddr("guardian");
        token = new ERC20Mock();
    }





}