// SPDX-License-Identifier: MIT
pragma solidity ^0.8.31;

import {IERC20} from "@openzeppelin-contracts-upgradeable/contracts/token/ERC20/IERC20.sol";

contract SeniorVault {

    mapping(address => uint256) private _balances; 

    IERC20 public token;

    event DepositedEth(address indexed user, uint256 amount);
    event DepositedERC20(address indexed user, uint256 amount);

    function deposit() external payable {
        _balances[msg.sender] +=  msg.value;
        emit DepositedEth(msg.sender, msg.value);
    }


    function depositERC20(uint256 amount) external{
        token.safeTransferFrom(msg.sender, address(this), amount);

        emit DepositedERC20(msg.sender, amount);
    }
}