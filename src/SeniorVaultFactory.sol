// SPDX-License-Identifier: MIT
pragma solidity 0.8.31;

import {SeniorVault} from "./SeniorVault.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";

contract SeniorVaultFactory is Ownable, Pausable {
    error InvalidAddress();
    error VaultAlredyExist();

    event VaultCreated(address indexed user, address indexed vault);
    


    mapping(address senior => address vault) public seniorToVault;



    function createVault() external whenNotPaused returns(address){
        if(seniorToVault[msg.sender] != address(0)) revert VaultAlredyExist();
        SeniorVault vault = new SeniorVault(msg.sender);
        seniorToVault[msg.sender] = address(vault);
        emit VaultCreated(msg.sender, address(vault));
        return address(vault);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

}