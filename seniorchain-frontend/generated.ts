import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20Mock
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20MockAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20MetadataAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Permit
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20PermitAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3Abi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pausable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pausableAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SeniorVault
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const seniorVaultAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_senior', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ETH_ADDRESS',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'TIMELOCK_DURATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptGuardian',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'safeAddress', internalType: 'address', type: 'address' }],
    name: 'approveSafeAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
    ],
    name: 'approveToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'withdrawalId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'cancelWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'depositERC20',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'withdrawalId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'executeWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
    ],
    name: 'getUserTokenBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'guardian',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'safeAddress', internalType: 'address', type: 'address' }],
    name: 'isAddressWhiteListed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
    ],
    name: 'isTokenWhiteListed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isWhiteListedAddress',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isWhiteListedToken',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nextWithdrawalId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingGuardian',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'pendingWithdrawals',
    outputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'unlockTime', internalType: 'uint256', type: 'uint256' },
      { name: 'executed', internalType: 'bool', type: 'bool' },
      { name: 'cancelled', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_guardian', internalType: 'address', type: 'address' }],
    name: 'proposeGuardian',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
    ],
    name: 'proposeToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'safeAddress', internalType: 'address', type: 'address' }],
    name: 'proposesSafeAddresses',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'safeAddress', internalType: 'address', type: 'address' }],
    name: 'removeSafeAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'senior',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: '_periodLimit', internalType: 'uint256', type: 'uint256' },
      { name: '_singleTxThreshold', internalType: 'uint256', type: 'uint256' },
      { name: '_perdioDuration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setWithdrawalLimits',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
    ],
    name: 'withdrawERC20',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawETH',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'withdrawalLimits',
    outputs: [
      { name: 'periodLimit', internalType: 'uint256', type: 'uint256' },
      { name: 'singleTxThreshold', internalType: 'uint256', type: 'uint256' },
      { name: 'currentPeriodSpent', internalType: 'uint256', type: 'uint256' },
      { name: 'currentPeriodStart', internalType: 'uint256', type: 'uint256' },
      { name: 'periodDuration', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'safeAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'AddressApproved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DepositedERC20',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DepositedEth',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newGuardian',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'GuardianChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposed',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'GuardianProposed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TokenAddressApproved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'withdrawalId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WithdrawalCancelledByGuardian',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'withdrawalId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WithdrawalCancelledBySenior',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'periodLimit',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'singleTxThreshold',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'periodDuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WithdrawalLimitsChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'nextWithdrawalId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'unlockTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WithdrawalQueued',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WithdrawedERC20',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WithdrawedETH',
  },
  { type: 'error', inputs: [], name: 'SeniorVault__AddressNotWhiteListed' },
  { type: 'error', inputs: [], name: 'SeniorVault__InvalidAddress' },
  { type: 'error', inputs: [], name: 'SeniorVault__InvalidAmount' },
  { type: 'error', inputs: [], name: 'SeniorVault__InvalidPeriod' },
  { type: 'error', inputs: [], name: 'SeniorVault__InvalidPeriodDuration' },
  { type: 'error', inputs: [], name: 'SeniorVault__InvalidSingleTxThreshold' },
  { type: 'error', inputs: [], name: 'SeniorVault__NoAccess' },
  { type: 'error', inputs: [], name: 'SeniorVault__NoGuardianProposed' },
  { type: 'error', inputs: [], name: 'SeniorVault__NotEnoughMoney' },
  { type: 'error', inputs: [], name: 'SeniorVault__NotGuardian' },
  { type: 'error', inputs: [], name: 'SeniorVault__NotProposed' },
  { type: 'error', inputs: [], name: 'SeniorVault__NotSenior' },
  { type: 'error', inputs: [], name: 'SeniorVault__PeriodLimitExceed' },
  { type: 'error', inputs: [], name: 'SeniorVault__RecipientNotWhiteListed' },
  { type: 'error', inputs: [], name: 'SeniorVault__TimeLockNotExpired' },
  {
    type: 'error',
    inputs: [],
    name: 'SeniorVault__TokenAddressNotWhiteListed',
  },
  { type: 'error', inputs: [], name: 'SeniorVault__TokenNotWhiteListed' },
  { type: 'error', inputs: [], name: 'SeniorVault__TransferFailed' },
  {
    type: 'error',
    inputs: [],
    name: 'SeniorVault__WithdrawalAlreadyCancelled',
  },
  { type: 'error', inputs: [], name: 'SeniorVault__WithdrawalAlreadyExecuted' },
  { type: 'error', inputs: [], name: 'SeniorVault__WithdrawalNotFound' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SeniorVaultFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const seniorVaultFactoryAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'createVault',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'senior', internalType: 'address', type: 'address' }],
    name: 'seniorToVault',
    outputs: [{ name: 'vault', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'vault',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'VaultCreated',
  },
  { type: 'error', inputs: [], name: 'InvalidAddress' },
  { type: 'error', inputs: [], name: 'VaultAlredyExist' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SeniorVaultHarness
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const seniorVaultHarnessAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_senior', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ETH_ADDRESS',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'TIMELOCK_DURATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptGuardian',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'safeAddress', internalType: 'address', type: 'address' }],
    name: 'approveSafeAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
    ],
    name: 'approveToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'withdrawalId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'cancelWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'depositERC20',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'withdrawalId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'executeWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'exposedRequireTimeLock',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
    ],
    name: 'getUserTokenBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'guardian',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'safeAddress', internalType: 'address', type: 'address' }],
    name: 'isAddressWhiteListed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
    ],
    name: 'isTokenWhiteListed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isWhiteListedAddress',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isWhiteListedToken',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nextWithdrawalId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingGuardian',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'pendingWithdrawals',
    outputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'unlockTime', internalType: 'uint256', type: 'uint256' },
      { name: 'executed', internalType: 'bool', type: 'bool' },
      { name: 'cancelled', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_guardian', internalType: 'address', type: 'address' }],
    name: 'proposeGuardian',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
    ],
    name: 'proposeToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'safeAddress', internalType: 'address', type: 'address' }],
    name: 'proposesSafeAddresses',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'safeAddress', internalType: 'address', type: 'address' }],
    name: 'removeSafeAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'senior',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: '_periodLimit', internalType: 'uint256', type: 'uint256' },
      { name: '_singleTxThreshold', internalType: 'uint256', type: 'uint256' },
      { name: '_perdioDuration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setWithdrawalLimits',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
    ],
    name: 'withdrawERC20',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawETH',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'withdrawalLimits',
    outputs: [
      { name: 'periodLimit', internalType: 'uint256', type: 'uint256' },
      { name: 'singleTxThreshold', internalType: 'uint256', type: 'uint256' },
      { name: 'currentPeriodSpent', internalType: 'uint256', type: 'uint256' },
      { name: 'currentPeriodStart', internalType: 'uint256', type: 'uint256' },
      { name: 'periodDuration', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'safeAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'AddressApproved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DepositedERC20',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DepositedEth',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newGuardian',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'GuardianChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposed',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'GuardianProposed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TokenAddressApproved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'withdrawalId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WithdrawalCancelledByGuardian',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'withdrawalId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WithdrawalCancelledBySenior',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'periodLimit',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'singleTxThreshold',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'periodDuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WithdrawalLimitsChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'nextWithdrawalId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'unlockTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WithdrawalQueued',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WithdrawedERC20',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WithdrawedETH',
  },
  { type: 'error', inputs: [], name: 'SeniorVault__AddressNotWhiteListed' },
  { type: 'error', inputs: [], name: 'SeniorVault__InvalidAddress' },
  { type: 'error', inputs: [], name: 'SeniorVault__InvalidAmount' },
  { type: 'error', inputs: [], name: 'SeniorVault__InvalidPeriod' },
  { type: 'error', inputs: [], name: 'SeniorVault__InvalidPeriodDuration' },
  { type: 'error', inputs: [], name: 'SeniorVault__InvalidSingleTxThreshold' },
  { type: 'error', inputs: [], name: 'SeniorVault__NoAccess' },
  { type: 'error', inputs: [], name: 'SeniorVault__NoGuardianProposed' },
  { type: 'error', inputs: [], name: 'SeniorVault__NotEnoughMoney' },
  { type: 'error', inputs: [], name: 'SeniorVault__NotGuardian' },
  { type: 'error', inputs: [], name: 'SeniorVault__NotProposed' },
  { type: 'error', inputs: [], name: 'SeniorVault__NotSenior' },
  { type: 'error', inputs: [], name: 'SeniorVault__PeriodLimitExceed' },
  { type: 'error', inputs: [], name: 'SeniorVault__RecipientNotWhiteListed' },
  { type: 'error', inputs: [], name: 'SeniorVault__TimeLockNotExpired' },
  {
    type: 'error',
    inputs: [],
    name: 'SeniorVault__TokenAddressNotWhiteListed',
  },
  { type: 'error', inputs: [], name: 'SeniorVault__TokenNotWhiteListed' },
  { type: 'error', inputs: [], name: 'SeniorVault__TransferFailed' },
  {
    type: 'error',
    inputs: [],
    name: 'SeniorVault__WithdrawalAlreadyCancelled',
  },
  { type: 'error', inputs: [], name: 'SeniorVault__WithdrawalAlreadyExecuted' },
  { type: 'error', inputs: [], name: 'SeniorVault__WithdrawalNotFound' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useWriteErc20DecreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc20Abi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useWriteErc20IncreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc20Abi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useSimulateErc20DecreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useSimulateErc20IncreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20MockAbi}__
 */
export const useReadErc20Mock = /*#__PURE__*/ createUseReadContract({
  abi: erc20MockAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20MockAllowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20MockAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20MockBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20MockAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20MockDecimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20MockAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"name"`
 */
export const useReadErc20MockName = /*#__PURE__*/ createUseReadContract({
  abi: erc20MockAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20MockSymbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20MockAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20MockTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20MockAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20MockAbi}__
 */
export const useWriteErc20Mock = /*#__PURE__*/ createUseWriteContract({
  abi: erc20MockAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20MockApprove = /*#__PURE__*/ createUseWriteContract({
  abi: erc20MockAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteErc20MockBurn = /*#__PURE__*/ createUseWriteContract({
  abi: erc20MockAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useWriteErc20MockDecreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc20MockAbi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useWriteErc20MockIncreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc20MockAbi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteErc20MockMint = /*#__PURE__*/ createUseWriteContract({
  abi: erc20MockAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20MockTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20MockAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20MockTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc20MockAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20MockAbi}__
 */
export const useSimulateErc20Mock = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20MockAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20MockApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20MockAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateErc20MockBurn = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20MockAbi, functionName: 'burn' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useSimulateErc20MockDecreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20MockAbi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useSimulateErc20MockIncreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20MockAbi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateErc20MockMint = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20MockAbi, functionName: 'mint' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20MockTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20MockAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20MockTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20MockAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20MockAbi}__
 */
export const useWatchErc20MockEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: erc20MockAbi },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20MockAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20MockApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20MockAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20MockAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20MockTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20MockAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useReadIerc20Metadata = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadIerc20MetadataAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'allowance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc20MetadataBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadIerc20MetadataDecimals =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'decimals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"name"`
 */
export const useReadIerc20MetadataName = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadIerc20MetadataSymbol = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIerc20MetadataTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useWriteIerc20Metadata = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc20MetadataApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIerc20MetadataTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc20MetadataTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useSimulateIerc20Metadata =
  /*#__PURE__*/ createUseSimulateContract({ abi: ierc20MetadataAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc20MetadataApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIerc20MetadataTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc20MetadataTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useWatchIerc20MetadataEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: ierc20MetadataAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc20MetadataApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc20MetadataAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc20MetadataTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc20MetadataAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20PermitAbi}__
 */
export const useReadIerc20Permit = /*#__PURE__*/ createUseReadContract({
  abi: ierc20PermitAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadIerc20PermitDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20PermitAbi,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadIerc20PermitNonces = /*#__PURE__*/ createUseReadContract({
  abi: ierc20PermitAbi,
  functionName: 'nonces',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20PermitAbi}__
 */
export const useWriteIerc20Permit = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20PermitAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteIerc20PermitPermit = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20PermitAbi,
  functionName: 'permit',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20PermitAbi}__
 */
export const useSimulateIerc20Permit = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc20PermitAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateIerc20PermitPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20PermitAbi,
    functionName: 'permit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useReadIMulticall3 = /*#__PURE__*/ createUseReadContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBasefee"`
 */
export const useReadIMulticall3GetBasefee = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getBasefee' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockHash"`
 */
export const useReadIMulticall3GetBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockNumber"`
 */
export const useReadIMulticall3GetBlockNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getChainId"`
 */
export const useReadIMulticall3GetChainId = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getChainId' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockCoinbase"`
 */
export const useReadIMulticall3GetCurrentBlockCoinbase =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockCoinbase',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockDifficulty"`
 */
export const useReadIMulticall3GetCurrentBlockDifficulty =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockDifficulty',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockGasLimit"`
 */
export const useReadIMulticall3GetCurrentBlockGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockGasLimit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockTimestamp"`
 */
export const useReadIMulticall3GetCurrentBlockTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getEthBalance"`
 */
export const useReadIMulticall3GetEthBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getEthBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getLastBlockHash"`
 */
export const useReadIMulticall3GetLastBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getLastBlockHash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useWriteIMulticall3 = /*#__PURE__*/ createUseWriteContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useWriteIMulticall3Aggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useWriteIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useWriteIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useWriteIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useWriteIMulticall3TryAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useWriteIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useSimulateIMulticall3 = /*#__PURE__*/ createUseSimulateContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useSimulateIMulticall3Aggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useSimulateIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useSimulateIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useSimulateIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useSimulateIMulticall3TryAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useSimulateIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useReadOwnable = /*#__PURE__*/ createUseReadContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"owner"`
 */
export const useReadOwnableOwner = /*#__PURE__*/ createUseReadContract({
  abi: ownableAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useWriteOwnable = /*#__PURE__*/ createUseWriteContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteOwnableRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteOwnableTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useSimulateOwnable = /*#__PURE__*/ createUseSimulateContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateOwnableRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateOwnableTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableAbi}__
 */
export const useWatchOwnableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchOwnableOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ownableAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pausableAbi}__
 */
export const useReadPausable = /*#__PURE__*/ createUseReadContract({
  abi: pausableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pausableAbi}__ and `functionName` set to `"paused"`
 */
export const useReadPausablePaused = /*#__PURE__*/ createUseReadContract({
  abi: pausableAbi,
  functionName: 'paused',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pausableAbi}__
 */
export const useWatchPausableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: pausableAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pausableAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchPausablePausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pausableAbi,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pausableAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchPausableUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pausableAbi,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultAbi}__
 */
export const useReadSeniorVault = /*#__PURE__*/ createUseReadContract({
  abi: seniorVaultAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"ETH_ADDRESS"`
 */
export const useReadSeniorVaultEthAddress = /*#__PURE__*/ createUseReadContract(
  { abi: seniorVaultAbi, functionName: 'ETH_ADDRESS' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"TIMELOCK_DURATION"`
 */
export const useReadSeniorVaultTimelockDuration =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultAbi,
    functionName: 'TIMELOCK_DURATION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"getUserTokenBalance"`
 */
export const useReadSeniorVaultGetUserTokenBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultAbi,
    functionName: 'getUserTokenBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"guardian"`
 */
export const useReadSeniorVaultGuardian = /*#__PURE__*/ createUseReadContract({
  abi: seniorVaultAbi,
  functionName: 'guardian',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"isAddressWhiteListed"`
 */
export const useReadSeniorVaultIsAddressWhiteListed =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultAbi,
    functionName: 'isAddressWhiteListed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"isTokenWhiteListed"`
 */
export const useReadSeniorVaultIsTokenWhiteListed =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultAbi,
    functionName: 'isTokenWhiteListed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"isWhiteListedAddress"`
 */
export const useReadSeniorVaultIsWhiteListedAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultAbi,
    functionName: 'isWhiteListedAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"isWhiteListedToken"`
 */
export const useReadSeniorVaultIsWhiteListedToken =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultAbi,
    functionName: 'isWhiteListedToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"nextWithdrawalId"`
 */
export const useReadSeniorVaultNextWithdrawalId =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultAbi,
    functionName: 'nextWithdrawalId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"pendingGuardian"`
 */
export const useReadSeniorVaultPendingGuardian =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultAbi,
    functionName: 'pendingGuardian',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"pendingWithdrawals"`
 */
export const useReadSeniorVaultPendingWithdrawals =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultAbi,
    functionName: 'pendingWithdrawals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"senior"`
 */
export const useReadSeniorVaultSenior = /*#__PURE__*/ createUseReadContract({
  abi: seniorVaultAbi,
  functionName: 'senior',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"withdrawalLimits"`
 */
export const useReadSeniorVaultWithdrawalLimits =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultAbi,
    functionName: 'withdrawalLimits',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultAbi}__
 */
export const useWriteSeniorVault = /*#__PURE__*/ createUseWriteContract({
  abi: seniorVaultAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"acceptGuardian"`
 */
export const useWriteSeniorVaultAcceptGuardian =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultAbi,
    functionName: 'acceptGuardian',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"approveSafeAddress"`
 */
export const useWriteSeniorVaultApproveSafeAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultAbi,
    functionName: 'approveSafeAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"approveToken"`
 */
export const useWriteSeniorVaultApproveToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultAbi,
    functionName: 'approveToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"cancelWithdrawal"`
 */
export const useWriteSeniorVaultCancelWithdrawal =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultAbi,
    functionName: 'cancelWithdrawal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteSeniorVaultDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: seniorVaultAbi,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"depositERC20"`
 */
export const useWriteSeniorVaultDepositErc20 =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultAbi,
    functionName: 'depositERC20',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"executeWithdrawal"`
 */
export const useWriteSeniorVaultExecuteWithdrawal =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultAbi,
    functionName: 'executeWithdrawal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"proposeGuardian"`
 */
export const useWriteSeniorVaultProposeGuardian =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultAbi,
    functionName: 'proposeGuardian',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"proposeToken"`
 */
export const useWriteSeniorVaultProposeToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultAbi,
    functionName: 'proposeToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"proposesSafeAddresses"`
 */
export const useWriteSeniorVaultProposesSafeAddresses =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultAbi,
    functionName: 'proposesSafeAddresses',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"removeSafeAddress"`
 */
export const useWriteSeniorVaultRemoveSafeAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultAbi,
    functionName: 'removeSafeAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"setWithdrawalLimits"`
 */
export const useWriteSeniorVaultSetWithdrawalLimits =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultAbi,
    functionName: 'setWithdrawalLimits',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"withdrawERC20"`
 */
export const useWriteSeniorVaultWithdrawErc20 =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultAbi,
    functionName: 'withdrawERC20',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"withdrawETH"`
 */
export const useWriteSeniorVaultWithdrawEth =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultAbi,
    functionName: 'withdrawETH',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultAbi}__
 */
export const useSimulateSeniorVault = /*#__PURE__*/ createUseSimulateContract({
  abi: seniorVaultAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"acceptGuardian"`
 */
export const useSimulateSeniorVaultAcceptGuardian =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultAbi,
    functionName: 'acceptGuardian',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"approveSafeAddress"`
 */
export const useSimulateSeniorVaultApproveSafeAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultAbi,
    functionName: 'approveSafeAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"approveToken"`
 */
export const useSimulateSeniorVaultApproveToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultAbi,
    functionName: 'approveToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"cancelWithdrawal"`
 */
export const useSimulateSeniorVaultCancelWithdrawal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultAbi,
    functionName: 'cancelWithdrawal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateSeniorVaultDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"depositERC20"`
 */
export const useSimulateSeniorVaultDepositErc20 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultAbi,
    functionName: 'depositERC20',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"executeWithdrawal"`
 */
export const useSimulateSeniorVaultExecuteWithdrawal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultAbi,
    functionName: 'executeWithdrawal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"proposeGuardian"`
 */
export const useSimulateSeniorVaultProposeGuardian =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultAbi,
    functionName: 'proposeGuardian',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"proposeToken"`
 */
export const useSimulateSeniorVaultProposeToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultAbi,
    functionName: 'proposeToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"proposesSafeAddresses"`
 */
export const useSimulateSeniorVaultProposesSafeAddresses =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultAbi,
    functionName: 'proposesSafeAddresses',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"removeSafeAddress"`
 */
export const useSimulateSeniorVaultRemoveSafeAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultAbi,
    functionName: 'removeSafeAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"setWithdrawalLimits"`
 */
export const useSimulateSeniorVaultSetWithdrawalLimits =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultAbi,
    functionName: 'setWithdrawalLimits',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"withdrawERC20"`
 */
export const useSimulateSeniorVaultWithdrawErc20 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultAbi,
    functionName: 'withdrawERC20',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultAbi}__ and `functionName` set to `"withdrawETH"`
 */
export const useSimulateSeniorVaultWithdrawEth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultAbi,
    functionName: 'withdrawETH',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultAbi}__
 */
export const useWatchSeniorVaultEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: seniorVaultAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultAbi}__ and `eventName` set to `"AddressApproved"`
 */
export const useWatchSeniorVaultAddressApprovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultAbi,
    eventName: 'AddressApproved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultAbi}__ and `eventName` set to `"DepositedERC20"`
 */
export const useWatchSeniorVaultDepositedErc20Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultAbi,
    eventName: 'DepositedERC20',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultAbi}__ and `eventName` set to `"DepositedEth"`
 */
export const useWatchSeniorVaultDepositedEthEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultAbi,
    eventName: 'DepositedEth',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultAbi}__ and `eventName` set to `"GuardianChanged"`
 */
export const useWatchSeniorVaultGuardianChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultAbi,
    eventName: 'GuardianChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultAbi}__ and `eventName` set to `"GuardianProposed"`
 */
export const useWatchSeniorVaultGuardianProposedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultAbi,
    eventName: 'GuardianProposed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultAbi}__ and `eventName` set to `"TokenAddressApproved"`
 */
export const useWatchSeniorVaultTokenAddressApprovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultAbi,
    eventName: 'TokenAddressApproved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultAbi}__ and `eventName` set to `"WithdrawalCancelledByGuardian"`
 */
export const useWatchSeniorVaultWithdrawalCancelledByGuardianEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultAbi,
    eventName: 'WithdrawalCancelledByGuardian',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultAbi}__ and `eventName` set to `"WithdrawalCancelledBySenior"`
 */
export const useWatchSeniorVaultWithdrawalCancelledBySeniorEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultAbi,
    eventName: 'WithdrawalCancelledBySenior',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultAbi}__ and `eventName` set to `"WithdrawalLimitsChanged"`
 */
export const useWatchSeniorVaultWithdrawalLimitsChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultAbi,
    eventName: 'WithdrawalLimitsChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultAbi}__ and `eventName` set to `"WithdrawalQueued"`
 */
export const useWatchSeniorVaultWithdrawalQueuedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultAbi,
    eventName: 'WithdrawalQueued',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultAbi}__ and `eventName` set to `"WithdrawedERC20"`
 */
export const useWatchSeniorVaultWithdrawedErc20Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultAbi,
    eventName: 'WithdrawedERC20',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultAbi}__ and `eventName` set to `"WithdrawedETH"`
 */
export const useWatchSeniorVaultWithdrawedEthEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultAbi,
    eventName: 'WithdrawedETH',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultFactoryAbi}__
 */
export const useReadSeniorVaultFactory = /*#__PURE__*/ createUseReadContract({
  abi: seniorVaultFactoryAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultFactoryAbi}__ and `functionName` set to `"owner"`
 */
export const useReadSeniorVaultFactoryOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultFactoryAbi,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultFactoryAbi}__ and `functionName` set to `"paused"`
 */
export const useReadSeniorVaultFactoryPaused =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultFactoryAbi,
    functionName: 'paused',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultFactoryAbi}__ and `functionName` set to `"seniorToVault"`
 */
export const useReadSeniorVaultFactorySeniorToVault =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultFactoryAbi,
    functionName: 'seniorToVault',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultFactoryAbi}__
 */
export const useWriteSeniorVaultFactory = /*#__PURE__*/ createUseWriteContract({
  abi: seniorVaultFactoryAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultFactoryAbi}__ and `functionName` set to `"createVault"`
 */
export const useWriteSeniorVaultFactoryCreateVault =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultFactoryAbi,
    functionName: 'createVault',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultFactoryAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteSeniorVaultFactoryPause =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultFactoryAbi,
    functionName: 'pause',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteSeniorVaultFactoryRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultFactoryAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteSeniorVaultFactoryTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultFactoryAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultFactoryAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteSeniorVaultFactoryUnpause =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultFactoryAbi,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultFactoryAbi}__
 */
export const useSimulateSeniorVaultFactory =
  /*#__PURE__*/ createUseSimulateContract({ abi: seniorVaultFactoryAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultFactoryAbi}__ and `functionName` set to `"createVault"`
 */
export const useSimulateSeniorVaultFactoryCreateVault =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultFactoryAbi,
    functionName: 'createVault',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultFactoryAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateSeniorVaultFactoryPause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultFactoryAbi,
    functionName: 'pause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateSeniorVaultFactoryRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultFactoryAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateSeniorVaultFactoryTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultFactoryAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultFactoryAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateSeniorVaultFactoryUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultFactoryAbi,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultFactoryAbi}__
 */
export const useWatchSeniorVaultFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: seniorVaultFactoryAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultFactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchSeniorVaultFactoryOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultFactoryAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultFactoryAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchSeniorVaultFactoryPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultFactoryAbi,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultFactoryAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchSeniorVaultFactoryUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultFactoryAbi,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultFactoryAbi}__ and `eventName` set to `"VaultCreated"`
 */
export const useWatchSeniorVaultFactoryVaultCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultFactoryAbi,
    eventName: 'VaultCreated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__
 */
export const useReadSeniorVaultHarness = /*#__PURE__*/ createUseReadContract({
  abi: seniorVaultHarnessAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"ETH_ADDRESS"`
 */
export const useReadSeniorVaultHarnessEthAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'ETH_ADDRESS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"TIMELOCK_DURATION"`
 */
export const useReadSeniorVaultHarnessTimelockDuration =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'TIMELOCK_DURATION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"getUserTokenBalance"`
 */
export const useReadSeniorVaultHarnessGetUserTokenBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'getUserTokenBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"guardian"`
 */
export const useReadSeniorVaultHarnessGuardian =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'guardian',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"isAddressWhiteListed"`
 */
export const useReadSeniorVaultHarnessIsAddressWhiteListed =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'isAddressWhiteListed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"isTokenWhiteListed"`
 */
export const useReadSeniorVaultHarnessIsTokenWhiteListed =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'isTokenWhiteListed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"isWhiteListedAddress"`
 */
export const useReadSeniorVaultHarnessIsWhiteListedAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'isWhiteListedAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"isWhiteListedToken"`
 */
export const useReadSeniorVaultHarnessIsWhiteListedToken =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'isWhiteListedToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"nextWithdrawalId"`
 */
export const useReadSeniorVaultHarnessNextWithdrawalId =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'nextWithdrawalId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"pendingGuardian"`
 */
export const useReadSeniorVaultHarnessPendingGuardian =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'pendingGuardian',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"pendingWithdrawals"`
 */
export const useReadSeniorVaultHarnessPendingWithdrawals =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'pendingWithdrawals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"senior"`
 */
export const useReadSeniorVaultHarnessSenior =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'senior',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"withdrawalLimits"`
 */
export const useReadSeniorVaultHarnessWithdrawalLimits =
  /*#__PURE__*/ createUseReadContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'withdrawalLimits',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__
 */
export const useWriteSeniorVaultHarness = /*#__PURE__*/ createUseWriteContract({
  abi: seniorVaultHarnessAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"acceptGuardian"`
 */
export const useWriteSeniorVaultHarnessAcceptGuardian =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'acceptGuardian',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"approveSafeAddress"`
 */
export const useWriteSeniorVaultHarnessApproveSafeAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'approveSafeAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"approveToken"`
 */
export const useWriteSeniorVaultHarnessApproveToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'approveToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"cancelWithdrawal"`
 */
export const useWriteSeniorVaultHarnessCancelWithdrawal =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'cancelWithdrawal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteSeniorVaultHarnessDeposit =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"depositERC20"`
 */
export const useWriteSeniorVaultHarnessDepositErc20 =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'depositERC20',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"executeWithdrawal"`
 */
export const useWriteSeniorVaultHarnessExecuteWithdrawal =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'executeWithdrawal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"exposedRequireTimeLock"`
 */
export const useWriteSeniorVaultHarnessExposedRequireTimeLock =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'exposedRequireTimeLock',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"proposeGuardian"`
 */
export const useWriteSeniorVaultHarnessProposeGuardian =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'proposeGuardian',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"proposeToken"`
 */
export const useWriteSeniorVaultHarnessProposeToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'proposeToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"proposesSafeAddresses"`
 */
export const useWriteSeniorVaultHarnessProposesSafeAddresses =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'proposesSafeAddresses',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"removeSafeAddress"`
 */
export const useWriteSeniorVaultHarnessRemoveSafeAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'removeSafeAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"setWithdrawalLimits"`
 */
export const useWriteSeniorVaultHarnessSetWithdrawalLimits =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'setWithdrawalLimits',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"withdrawERC20"`
 */
export const useWriteSeniorVaultHarnessWithdrawErc20 =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'withdrawERC20',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"withdrawETH"`
 */
export const useWriteSeniorVaultHarnessWithdrawEth =
  /*#__PURE__*/ createUseWriteContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'withdrawETH',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__
 */
export const useSimulateSeniorVaultHarness =
  /*#__PURE__*/ createUseSimulateContract({ abi: seniorVaultHarnessAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"acceptGuardian"`
 */
export const useSimulateSeniorVaultHarnessAcceptGuardian =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'acceptGuardian',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"approveSafeAddress"`
 */
export const useSimulateSeniorVaultHarnessApproveSafeAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'approveSafeAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"approveToken"`
 */
export const useSimulateSeniorVaultHarnessApproveToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'approveToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"cancelWithdrawal"`
 */
export const useSimulateSeniorVaultHarnessCancelWithdrawal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'cancelWithdrawal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateSeniorVaultHarnessDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"depositERC20"`
 */
export const useSimulateSeniorVaultHarnessDepositErc20 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'depositERC20',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"executeWithdrawal"`
 */
export const useSimulateSeniorVaultHarnessExecuteWithdrawal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'executeWithdrawal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"exposedRequireTimeLock"`
 */
export const useSimulateSeniorVaultHarnessExposedRequireTimeLock =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'exposedRequireTimeLock',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"proposeGuardian"`
 */
export const useSimulateSeniorVaultHarnessProposeGuardian =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'proposeGuardian',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"proposeToken"`
 */
export const useSimulateSeniorVaultHarnessProposeToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'proposeToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"proposesSafeAddresses"`
 */
export const useSimulateSeniorVaultHarnessProposesSafeAddresses =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'proposesSafeAddresses',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"removeSafeAddress"`
 */
export const useSimulateSeniorVaultHarnessRemoveSafeAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'removeSafeAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"setWithdrawalLimits"`
 */
export const useSimulateSeniorVaultHarnessSetWithdrawalLimits =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'setWithdrawalLimits',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"withdrawERC20"`
 */
export const useSimulateSeniorVaultHarnessWithdrawErc20 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'withdrawERC20',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `functionName` set to `"withdrawETH"`
 */
export const useSimulateSeniorVaultHarnessWithdrawEth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: seniorVaultHarnessAbi,
    functionName: 'withdrawETH',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultHarnessAbi}__
 */
export const useWatchSeniorVaultHarnessEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: seniorVaultHarnessAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `eventName` set to `"AddressApproved"`
 */
export const useWatchSeniorVaultHarnessAddressApprovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultHarnessAbi,
    eventName: 'AddressApproved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `eventName` set to `"DepositedERC20"`
 */
export const useWatchSeniorVaultHarnessDepositedErc20Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultHarnessAbi,
    eventName: 'DepositedERC20',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `eventName` set to `"DepositedEth"`
 */
export const useWatchSeniorVaultHarnessDepositedEthEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultHarnessAbi,
    eventName: 'DepositedEth',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `eventName` set to `"GuardianChanged"`
 */
export const useWatchSeniorVaultHarnessGuardianChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultHarnessAbi,
    eventName: 'GuardianChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `eventName` set to `"GuardianProposed"`
 */
export const useWatchSeniorVaultHarnessGuardianProposedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultHarnessAbi,
    eventName: 'GuardianProposed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `eventName` set to `"TokenAddressApproved"`
 */
export const useWatchSeniorVaultHarnessTokenAddressApprovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultHarnessAbi,
    eventName: 'TokenAddressApproved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `eventName` set to `"WithdrawalCancelledByGuardian"`
 */
export const useWatchSeniorVaultHarnessWithdrawalCancelledByGuardianEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultHarnessAbi,
    eventName: 'WithdrawalCancelledByGuardian',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `eventName` set to `"WithdrawalCancelledBySenior"`
 */
export const useWatchSeniorVaultHarnessWithdrawalCancelledBySeniorEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultHarnessAbi,
    eventName: 'WithdrawalCancelledBySenior',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `eventName` set to `"WithdrawalLimitsChanged"`
 */
export const useWatchSeniorVaultHarnessWithdrawalLimitsChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultHarnessAbi,
    eventName: 'WithdrawalLimitsChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `eventName` set to `"WithdrawalQueued"`
 */
export const useWatchSeniorVaultHarnessWithdrawalQueuedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultHarnessAbi,
    eventName: 'WithdrawalQueued',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `eventName` set to `"WithdrawedERC20"`
 */
export const useWatchSeniorVaultHarnessWithdrawedErc20Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultHarnessAbi,
    eventName: 'WithdrawedERC20',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link seniorVaultHarnessAbi}__ and `eventName` set to `"WithdrawedETH"`
 */
export const useWatchSeniorVaultHarnessWithdrawedEthEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: seniorVaultHarnessAbi,
    eventName: 'WithdrawedETH',
  })
