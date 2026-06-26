// SPDX-License-Identifier: MIT
pragma solidity ^0.8.31;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract SeniorVault {
    using SafeERC20 for IERC20;


    error SeniorVault__InvalidAddress();
    error SeniorVault__PreviousGuardianDidntApproveYourCandidacy();
    


    event DepositedEth(address indexed user, uint256 amount);
    event DepositedERC20(address indexed token, uint256 amount);

    struct Request{
        address from;
        uint256 amount;
        bool approved;
    }


    address public constant ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    address senior;
    address guardian;
    address pendingGuardian;
    address[] whiteListedAddresses;
    address proposedSafeAddress;


    mapping(uint256 => Request) private _requests;
    mapping(address => bool ) public isWhiteListed;
    mapping(address => uint256) private _balances; 
    bool guardianApprove;


    constructor() {
        senior = msg.sender;
    }


    modifier onlySenior() {
        require(msg.sender == senior, "Unauthorized");
        _;
    }

    modifier onlyGuardian() {
         require(msg.sender == guardian, "Unauthorized");
        _;
    }
    

    function deposit() external payable onlySenior {
        _balances[ETH_ADDRESS] +=  msg.value;
        emit DepositedEth(msg.sender, msg.value);
    }


    function depositERC20(address tokenAddress, uint256 amount) external onlySenior {
        require(isWhiteListed[tokenAddress], "Token not whitelisted");
        IERC20(tokenAddress).safeTransferFrom(msg.sender, address(this), amount);
        _balances[tokenAddress] += amount;
        emit DepositedERC20(tokenAddress, amount);
    }

    

    function proposeGuardian(address _guardian) public onlySenior {
        if(_guardian == address(0)) revert SeniorVault__InvalidAddress();
        if(guardian == address(0)) {
            guardian = _guardian;
        }else{
            pendingGuardian = _guardian;
        }
    }





    function approveNewGuardian() external onlyGuardian {
        guardian = pendingGuardian;
        pendingGuardian = address(0);
    }


    function proposesSafeAddress(address safeAddress) public onlySenior {
        if(tokenAddress == address(0)) revert SeniorVault__InvalidAddress();
        proposedSafeAddress = safeAddress;
    }


    function approveAddress() external onlyGuardian {
        whiteListedTokens.push(proposedSafeAddress);
        proposedSafeAddress = address(0);
    }

//todo guaridan functions

}