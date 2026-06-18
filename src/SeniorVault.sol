// SPDX-License-Identifier: MIT
pragma solidity ^0.8.31;



contract SeniorVault {

    mapping(address => uint256) private _balances; 


    event DepositedEth(address indexed user, uint256 amount);

    function deposit() external payable {
        _balances[msg.sender] +=  msg.value;
        emit DepositedEth(msg.sender, msg.value);
    }


    function depositERC20(uint256 amount) external{}
}