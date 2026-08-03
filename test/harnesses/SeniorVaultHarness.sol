// SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

import {SeniorVault} from "../../src/SeniorVault.sol";


contract SeniorVaultHarness is SeniorVault {

    constructor(address _senior) SeniorVault(_senior){}


    function exposedRequireTimeLock(uint256 amount) external returns (bool){
        return _requiresTimeLock(amount);
    }
} 