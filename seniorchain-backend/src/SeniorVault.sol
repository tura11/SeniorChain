// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface ISeniorVaultFactory {
    function updateSeniorAddress(address oldSenior, address newSenior) external;
}

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
    error SeniorVault__TokenAddressNotWhiteListed();
    error SeniorVault__InvalidAmount();
    error SeniorVault__WithdrawalNotFound();
    error SeniorVault__NoAccess();
    error SeniorVault__WithdrawalAlreadyExecuted();
    error SeniorVault__WithdrawalAlreadyCancelled();
    error SeniorVault__TimeLockNotExpired();
    error SeniorVault__NoGuardianProposed();
    error SeniorVault__RecipientNotWhiteListed();
    error SeniorVault__TokenNotWhiteListed();
    

    error SeniorVault__NoRecoveryPending();
    error SeniorVault__RecoveryTimeLockNotExpired();
    error SeniorVault__InvalidNewSenior();
    error SeniorVault__RecoveryAlreadyPending();
    error SeniorVault__InvalidWithdrawalEpoch();
    error SeniorVault__RecoveryIsPending();

    event DepositedEth(address indexed user, uint256 amount);
    event DepositedERC20(address indexed token, uint256 amount);
    event GuardianProposed(address indexed proposed);
    event GuardianChanged(address indexed newGuardian);
    event AddressApproved(address indexed safeAddress);
    event TokenAddressApproved(address indexed tokenAddress);
    event WithdrawedERC20(address indexed token, uint256 amount);
    event WithdrawalLimitsChanged(address indexed token, uint256 periodLimit, uint256 singleTxThreshold, uint256 periodDuration);
    event WithdrawalQueued(uint256 indexed nextWithdrawalId, address indexed recipient, uint256 amount, uint256 unlockTime);
    event WithdrawedETH(address indexed recipient, uint256 amount);
    event WithdrawalCancelledBySenior(uint256 indexed withdrawalId, address indexed recipient, uint256 amount);
    event WithdrawalCancelledByGuardian(uint256 indexed withdrawalId, address indexed recipient, uint256 amount);

 
    event RecoveryProposed(address indexed proposedBy, address indexed newSenior, uint256 unlockTime);
    event RecoveryCancelled(address indexed cancelledBy);
    event RecoveryExecuted(address indexed oldSenior, address indexed newSenior);

    address public constant ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    uint256 public constant TIMELOCK_DURATION = 24 hours;
    uint256 public constant RECOVERY_TIMELOCK = 7 days;

    address public factory;
    address public senior;
    address public guardian;
    address public pendingGuardian;
    

    address public pendingSenior;
    uint256 public recoveryUnlockTime;
    uint256 public recoveryEpoch; // Zabezpieczenie przed realizacją starych wypłat po recovery

    uint256 public nextWithdrawalId;

    mapping(address => bool) public isWhiteListedToken;
    mapping(address => bool) public isWhiteListedAddress;
    mapping(address => uint256) private _balances;
    mapping(address => bool) private _pendingRecipient;
    mapping(address => bool) private _pendingToken;
    mapping(uint256 => PendingWithdrawal) public pendingWithdrawals;
    mapping(address token => WithdrawalLimits) public withdrawalLimits;

    struct WithdrawalLimits {
        uint256 periodLimit;
        uint256 singleTxThreshold;
        uint256 currentPeriodSpent;
        uint256 currentPeriodStart;
        uint256 periodDuration;
    }

    struct PendingWithdrawal {
        address token;
        uint256 amount;
        address recipient;
        uint256 unlockTime;
        uint256 epoch; // Epoka, w której zlecono wypłatę
        bool executed;
        bool cancelled;
    }

    constructor(address _senior) {
        if (_senior == address(0)) revert SeniorVault__InvalidAddress();
        senior = _senior;
        factory = msg.sender;
    }

    modifier onlySenior() {
        _onlySenior();
        _;
    }

    modifier onlyGuardian() {
        _onlyGuardian();
        _;
    }

   

    function proposeNewSenior(address _newSenior) external onlyGuardian {
        if (_newSenior == address(0) || _newSenior == senior || _newSenior == guardian) {
            revert SeniorVault__InvalidNewSenior();
        }

        uint256 unlockTime = block.timestamp + RECOVERY_TIMELOCK;
        pendingSenior = _newSenior;
        recoveryUnlockTime = unlockTime;

        emit RecoveryProposed(msg.sender, _newSenior, unlockTime);
    }

    function cancelRecovery() external {
        if (pendingSenior == address(0)) revert SeniorVault__NoRecoveryPending();
        if (msg.sender != senior && msg.sender != guardian) revert SeniorVault__NoAccess();

        pendingSenior = address(0);
        recoveryUnlockTime = 0;

        emit RecoveryCancelled(msg.sender);
    }

    function executeRecovery() external {
        if (pendingSenior == address(0)) revert SeniorVault__NoRecoveryPending();
        if (block.timestamp < recoveryUnlockTime) revert SeniorVault__RecoveryTimeLockNotExpired();

        address oldSenior = senior;
        address newSenior = pendingSenior;

        pendingSenior = address(0);
        recoveryUnlockTime = 0;

        recoveryEpoch++;

        senior = newSenior;

        if (factory != address(0)) {
            try ISeniorVaultFactory(factory).updateSeniorAddress(oldSenior, newSenior) {} catch {}
        }

        emit RecoveryExecuted(oldSenior, newSenior);
    }


    function deposit() external payable onlySenior {
        _balances[ETH_ADDRESS] += msg.value;
        emit DepositedEth(msg.sender, msg.value);
    }

    function depositERC20(address tokenAddress, uint256 amount) external onlySenior {
        if (!isWhiteListedToken[tokenAddress]) revert SeniorVault__AddressNotWhiteListed();
        _balances[tokenAddress] += amount;

        IERC20(tokenAddress).safeTransferFrom(msg.sender, address(this), amount);

        emit DepositedERC20(tokenAddress, amount);
    }

    function proposeGuardian(address _guardian) external onlySenior {
        if (_guardian == address(0)) revert SeniorVault__InvalidAddress();
        pendingGuardian = _guardian;
        emit GuardianProposed(_guardian);
    }

    function acceptGuardian() external {
        if (msg.sender != pendingGuardian) revert SeniorVault__NotProposed();
        guardian = msg.sender;
        pendingGuardian = address(0);
        emit GuardianChanged(msg.sender);
    }

    function proposesSafeAddresses(address safeAddress) public onlySenior {
        if (safeAddress == address(0)) revert SeniorVault__InvalidAddress();
        _pendingRecipient[safeAddress] = true;
    }

    function approveSafeAddress(address safeAddress) external onlyGuardian {
        if (!_pendingRecipient[safeAddress]) revert SeniorVault__NotProposed();
        isWhiteListedAddress[safeAddress] = true;
        _pendingRecipient[safeAddress] = false;
        emit AddressApproved(safeAddress);
    }

    function removeSafeAddress(address safeAddress) external onlyGuardian {
        if (!isWhiteListedAddress[safeAddress]) revert SeniorVault__AddressNotWhiteListed();
        isWhiteListedAddress[safeAddress] = false;
    }

    function proposeToken(address tokenAddress) public onlySenior {
        if (tokenAddress == address(0)) revert SeniorVault__InvalidAddress();
        _pendingToken[tokenAddress] = true;
    }

    function approveToken(address tokenAddress) external onlyGuardian {
        if (!_pendingToken[tokenAddress]) revert SeniorVault__NotProposed();
        isWhiteListedToken[tokenAddress] = true;
        _pendingToken[tokenAddress] = false;
        emit TokenAddressApproved(tokenAddress);
    }

    function setWithdrawalLimits(
        address token,
        uint256 _periodLimit,
        uint256 _singleTxThreshold,
        uint256 _perdioDuration
    ) external onlyGuardian {
        if (token != ETH_ADDRESS && !isWhiteListedToken[token]) revert SeniorVault__TokenNotWhiteListed();
        if (_periodLimit == 0) revert SeniorVault__InvalidPeriod();
        if (_singleTxThreshold == 0) revert SeniorVault__InvalidSingleTxThreshold();
        if (_perdioDuration == 0) revert SeniorVault__InvalidPeriodDuration();

        withdrawalLimits[token] = WithdrawalLimits({
            periodLimit: _periodLimit,
            singleTxThreshold: _singleTxThreshold,
            currentPeriodSpent: 0,
            currentPeriodStart: block.timestamp,
            periodDuration: _perdioDuration
        });
        emit WithdrawalLimitsChanged(token, _periodLimit, _singleTxThreshold, _perdioDuration);
    }

    function withdrawETH(address recipient, uint256 amount) external onlySenior {
        if (pendingSenior != address(0)) revert SeniorVault__RecoveryIsPending();
        if (amount == 0) revert SeniorVault__InvalidAmount();
        if (!isWhiteListedAddress[recipient]) revert SeniorVault__AddressNotWhiteListed();
        if (amount > _balances[ETH_ADDRESS]) revert SeniorVault__NotEnoughMoney();

        _balances[ETH_ADDRESS] -= amount;

        if (_requiresTimeLock(ETH_ADDRESS, amount)) {
            uint256 unlockTime = block.timestamp + TIMELOCK_DURATION;
            pendingWithdrawals[nextWithdrawalId] = PendingWithdrawal({
                token: ETH_ADDRESS,
                amount: amount,
                recipient: recipient,
                unlockTime: unlockTime,
                epoch: recoveryEpoch,
                executed: false,
                cancelled: false
            });
            emit WithdrawalQueued(nextWithdrawalId, recipient, amount, unlockTime);
            nextWithdrawalId++;
        } else {
            (bool success, ) = recipient.call{value: amount}("");
            if (!success) revert SeniorVault__TransferFailed();
            emit WithdrawedETH(recipient, amount);
        }
    }

    function withdrawERC20(address recipient, uint256 amount, address tokenAddress) external onlySenior {
        if (pendingSenior != address(0)) revert SeniorVault__RecoveryIsPending();
        if (amount == 0) revert SeniorVault__InvalidAmount();
        if (!isWhiteListedAddress[recipient]) revert SeniorVault__AddressNotWhiteListed();
        if (!isWhiteListedToken[tokenAddress]) revert SeniorVault__TokenAddressNotWhiteListed();
        if (amount > _balances[tokenAddress]) revert SeniorVault__NotEnoughMoney();

        _balances[tokenAddress] -= amount;

        if (_requiresTimeLock(tokenAddress, amount)) {
            uint256 unlockTime = block.timestamp + TIMELOCK_DURATION;
            pendingWithdrawals[nextWithdrawalId] = PendingWithdrawal({
                token: tokenAddress,
                amount: amount,
                recipient: recipient,
                unlockTime: unlockTime,
                epoch: recoveryEpoch,
                executed: false,
                cancelled: false
            });
            emit WithdrawalQueued(nextWithdrawalId, recipient, amount, unlockTime);
            nextWithdrawalId++;
        } else {
            IERC20(tokenAddress).safeTransfer(recipient, amount);
            emit WithdrawedERC20(tokenAddress, amount);
        }
    }

    function executeWithdrawal(uint256 withdrawalId) external {
        PendingWithdrawal storage w = pendingWithdrawals[withdrawalId];

        if (w.recipient == address(0)) revert SeniorVault__WithdrawalNotFound();
        if (msg.sender != senior && msg.sender != guardian) revert SeniorVault__NoAccess();
        if (w.epoch != recoveryEpoch) revert SeniorVault__InvalidWithdrawalEpoch();
        if (!isWhiteListedAddress[w.recipient]) revert SeniorVault__RecipientNotWhiteListed();
        if (w.token != ETH_ADDRESS && !isWhiteListedToken[w.token]) revert SeniorVault__TokenNotWhiteListed();
        if (w.executed) revert SeniorVault__WithdrawalAlreadyExecuted();
        if (w.cancelled) revert SeniorVault__WithdrawalAlreadyCancelled();
        if (block.timestamp < w.unlockTime) revert SeniorVault__TimeLockNotExpired();

        address token = w.token;
        uint256 amount = w.amount;
        address recipient = w.recipient;

        w.executed = true;

        if (token == ETH_ADDRESS) {
            (bool success, ) = recipient.call{value: amount}("");
            if (!success) revert SeniorVault__TransferFailed();
            emit WithdrawedETH(recipient, amount);
        } else {
            IERC20(token).safeTransfer(recipient, amount);
            emit WithdrawedERC20(token, amount);
        }
    }

    function cancelWithdrawal(uint256 withdrawalId) external {
        PendingWithdrawal storage w = pendingWithdrawals[withdrawalId];

        if (w.recipient == address(0)) revert SeniorVault__WithdrawalNotFound();
        if (msg.sender != senior && msg.sender != guardian) revert SeniorVault__NoAccess();
        if (w.epoch != recoveryEpoch) revert SeniorVault__InvalidWithdrawalEpoch();
        if (w.executed) revert SeniorVault__WithdrawalAlreadyExecuted();
        if (w.cancelled) revert SeniorVault__Cancelled();

        w.cancelled = true;
        _balances[w.token] += w.amount;

        if (msg.sender == senior) {
            emit WithdrawalCancelledBySenior(withdrawalId, w.recipient, w.amount);
        } else {
            emit WithdrawalCancelledByGuardian(withdrawalId, w.recipient, w.amount);
        }
    }

    function _onlySenior() internal view {
        if (msg.sender != senior) revert SeniorVault__NotSenior();
    }

    function _onlyGuardian() internal view {
        if (msg.sender != guardian) revert SeniorVault__NotGuardian();
    }

    function _requiresTimeLock(address token, uint256 amount) internal returns (bool) {
        WithdrawalLimits storage l = withdrawalLimits[token];
        if (block.timestamp >= l.currentPeriodStart + l.periodDuration) {
            l.currentPeriodSpent = 0;
            l.currentPeriodStart = block.timestamp;
        }

        if (amount > l.singleTxThreshold) {
            return true;
        }

        if (l.currentPeriodSpent + amount > l.periodLimit) {
            return true;
        }
        l.currentPeriodSpent += amount;
        return false;
    }

    function getUserTokenBalance(address tokenAddress) external view returns (uint256) {
        return _balances[tokenAddress];
    }

    function isAddressWhiteListed(address safeAddress) external view returns (bool) {
        return isWhiteListedAddress[safeAddress];
    }

    function isTokenWhiteListed(address tokenAddress) external view returns (bool) {
        return isWhiteListedToken[tokenAddress];
    }
}