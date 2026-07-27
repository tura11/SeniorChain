// SPDX-License-Identifier: MIT
pragma solidity 0.8.31;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract SeniorVault {
    using SafeERC20 for IERC20;

    error SeniorVault__InvalidAddress();
    error SeniorVault__NotProposed();
    error SeniorVault__AddressNotWhiteListed();
    error SeniorVault__NotEnoughMoney();
    error SeniorVault__TransferFailed();
    error SeniorVault__NotSenior();
    error SeniorVault__NotGuardian();
    error SeniorVault__InvalidPeriod();
    error SeniorVault__InvalidSingleTxThreshold();
    error SeniorVault__InvalidPeriodDuration();
    error SeniorVault__PeriodLimitExceed();

    event DepositedEth(address indexed user, uint256 amount);
    event DepositedERC20(address indexed token, uint256 amount);
    event GuardianChanged(address indexed newGuardian);
    event AddressApproved(address indexed safeAddress);
    event TokenAddressApproved(address indexed tokenAddress);
    event WithdrawedERC20(address indexed token, uint256 amount);
    event WithdrawalLimitsChanged(uint256 periodLimit, uint256 singleTxThreshold, uint256 periodDuration);

    address public constant ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    address public senior; // should be immutable
    address public guardian;
    address public pendingGuardian;
    uint256 public nextWithdrawalId;
    WithdrawalLimits public withdrawalLimits;

    mapping(address => bool) public isWhiteListed;
    mapping(address => uint256) private _balances;
    mapping(address => bool) private _pendingRecipient;
    mapping(address => bool) private _pendingToken;
    mapping(uint256 => PendingWithdrawal) public pendingWithdrawals;


    struct WithdrawalLimits {
        uint256 periodLimit;  // maximum amount that can be withdrawn in a given period
        uint256 singleTxThreshold;  // maximum amount that can be withdrawn in a single transaction 
        uint256 currentPeriodSpent; // amount spent in the current period
        uint256 currentPeriodStart; // timestamp of the start of the current period
        uint256 periodDuration; // duration of the period in seconds
    }


    struct PendingWithdrawal {
        address token;
        uint256 amount;
        address recipient;
        uint256 unlockTime;
        bool executed;
        bool cancelled;
    }


    constructor(address _senior) {
        if(_senior == address(0)) revert SeniorVault__InvalidAddress();
        senior = _senior;
    }

    modifier onlySenior() {
        _onlySenior();
        _;
    }

    modifier onlyGuardian() {
        _onlyGuardian();
        _;
    }

    function deposit() external payable onlySenior {
        _balances[ETH_ADDRESS] += msg.value;
        emit DepositedEth(msg.sender, msg.value);
    }

    function depositERC20(address tokenAddress, uint256 amount) external onlySenior {
        if (!isWhiteListed[tokenAddress]) revert SeniorVault__AddressNotWhiteListed();
        _balances[tokenAddress] += amount;

        IERC20(tokenAddress).safeTransferFrom(msg.sender, address(this), amount);

        emit DepositedERC20(tokenAddress, amount);
    }

    function proposeGuardian(address _guardian) public onlySenior {
        if (_guardian == address(0)) revert SeniorVault__InvalidAddress();
        if (guardian == address(0)) {
            // audit-medium what if senior enter accidently wrong address??
            guardian = _guardian;
        } else {
            pendingGuardian = _guardian; //q does it matter if senior could overwrite propose before approval
        }
    }

    function approveNewGuardian() external onlyGuardian {
        guardian = pendingGuardian;
        pendingGuardian = address(0);
        emit GuardianChanged(guardian);
    }

    function proposesSafeAddresses(address safeAddress) public onlySenior {
        if (safeAddress == address(0)) revert SeniorVault__InvalidAddress();
        _pendingRecipient[safeAddress] = true;
    }

    function approveSafeAddress(address safeAddress) external onlyGuardian {
        if (!_pendingRecipient[safeAddress]) revert SeniorVault__NotProposed();
        isWhiteListed[safeAddress] = true;
        _pendingRecipient[safeAddress] = false;
        emit AddressApproved(safeAddress);
    }

    function removeSafeAddress(address safeAddress) external onlyGuardian {
        if (!isWhiteListed[safeAddress]) revert SeniorVault__AddressNotWhiteListed();
        isWhiteListed[safeAddress] = false;
    }

    function proposeToken(address tokenAddress) public onlySenior {
        if (tokenAddress == address(0)) revert SeniorVault__InvalidAddress();
        _pendingToken[tokenAddress] = true;
    }

    function approveToken(address tokenAddress) external onlyGuardian {
        if (!_pendingToken[tokenAddress]) revert SeniorVault__NotProposed();
        isWhiteListed[tokenAddress] = true;
        _pendingToken[tokenAddress] = false;
        emit TokenAddressApproved(tokenAddress);
    }


    function setWithdrawalLimits(uint256 _periodLimit, uint256 _singleTxThreshold, uint256 _perdioDuration) external onlyGuardian {
        if(_periodLimit == 0) revert SeniorVault__InvalidPeriod();
        if(_singleTxThreshold == 0) revert SeniorVault__InvalidSingleTxThreshold();
        if(_perdioDuration == 0) revert SeniorVault__InvalidPeriodDuration();
        withdrawalLimits = WithdrawalLimits({
            periodLimit: _periodLimit,
            singleTxThreshold: _singleTxThreshold,
            currentPeriodSpent: 0,
            currentPeriodStart: block.timestamp,
            periodDuration: _perdioDuration
        });
        emit WithdrawalLimitsChanged(_periodLimit, _singleTxThreshold, _perdioDuration);
        
    }

    function withdrawETH(address recipient, uint256 amount) external onlySenior {
        if (!isWhiteListed[recipient]) revert SeniorVault__AddressNotWhiteListed();
        if (amount > _balances[ETH_ADDRESS]) revert SeniorVault__NotEnoughMoney();

        _balances[ETH_ADDRESS] -= amount;

        (bool success,) = recipient.call{value: amount}("");
        if (!success) revert SeniorVault__TransferFailed();
    }

    function withdrawERC20(address recipient, uint256 amount, address tokenAddress) external onlySenior {
        if (!isWhiteListed[recipient]) revert SeniorVault__AddressNotWhiteListed();
        if (amount > _balances[tokenAddress]) revert SeniorVault__NotEnoughMoney();

        _balances[tokenAddress] -= amount;
        IERC20(tokenAddress).safeTransfer(recipient, amount);

        emit WithdrawedERC20(tokenAddress, amount);
    }

    function _onlySenior() internal view {
        if (msg.sender != senior) revert SeniorVault__NotSenior();
    }

    function _onlyGuardian() internal view {
        if (msg.sender != guardian) revert SeniorVault__NotGuardian();
    }

    function _requiresTimeLock(uint256 amount) internal  returns (bool) {
        if (block.timestamp >= withdrawalLimits.currentPeriodStart + withdrawalLimits.periodDuration)  {
            withdrawalLimits.currentPeriodSpent = 0;
            withdrawalLimits.currentPeriodStart = block.timestamp;
        }

        if(amount > withdrawalLimits.singleTxThreshold) {
            return true;
        }

        if(withdrawalLimits.currentPeriodSpent + amount > withdrawalLimits.periodLimit){
            return true;
        }
        withdrawalLimits.currentPeriodSpent += amount;
        return false;

    }

    function getUserTokenBalance(address tokenAddress) external view returns (uint256) {
        return _balances[tokenAddress];
    }

    function isAddressWhiteListed(address safeAddress) external view returns (bool) {
        return isWhiteListed[safeAddress];
    }

    //todo senior factory vault complex aaa
}

