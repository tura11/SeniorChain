// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Script, console} from "lib/forge-std/src/Script.sol";
import {SeniorVaultFactory} from "../src/SeniorVaultFactory.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast();
        SeniorVaultFactory factory = new SeniorVaultFactory();
        vm.stopBroadcast();

        console.log("SeniorVaultFactory deployed at:", address(factory));
    }
} //contract address 0xDb753ccd7d144f72e1654f7a80c950F655D28879