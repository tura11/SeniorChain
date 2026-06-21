// SPDX-License-Identifier: MIT
pragma solidity ^0.8.31;

import {IERC20} from "@openzeppelin-contracts-upgradeable/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin-contracts-upgradeable/contracts/token/ERC20/SafeERC20.sol";

contract SeniorVault {
    using SafeERC20 for IERC20;

    


    event DepositedEth(address indexed user, uint256 amount);
    event DepositedERC20(address indexed token, uint256 amount);

    struct Request{
        address from;
        uint256 amount;
        bool approved;
    }


    address public constant ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;


    mapping(uint256 => Request) private _requests;
    mapping(address => bool ) public isWhiteListed;
    mapping(address => uint256) private _balances; 


    function deposit() external payable {
        _balances[ETH_ADDRESS] +=  msg.value;
        emit DepositedEth(msg.sender, msg.value);
    }


    function depositERC20(address tokenAddress, uint256 amount) external {
        require(isWhiteListed[tokenAddress], "Token not whitelisted");
        IERC20(tokenAddress).safeTransferFrom(msg.sender, address(this), amount);
        _balances[tokenAddress] += amount;
        emit DepositedERC20(tokenAddress, amount);
    }


}