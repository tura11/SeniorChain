// SPDX-License-Identifier: MIT
pragma solidity 0.8.31;

import {SeniorVault} from "./SeniorVault.sol";

contract SeniorVaultFactory {
    error InvalidAddress();



    address senior;



    mapping(address senior => address vault) public seniorToVault;

    constructor(address _senior) public {
        if(_senior == address(0)) revert InvalidAddress();
        senior = _senior;
    }


    function createVault() external returns(address){
        if(seniorToVault[msg.sender] != address(0)) revert VaultAlredyExist();
        SeniorVault vault = new SeniorVault(msg.sender);
        seniorToVault[msg.sender] = address(vault);
        emit VaultCreated(msg.sender, address(vault));
        return address(vault);
    }

}