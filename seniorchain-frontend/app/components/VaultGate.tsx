'use client'

import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FACTORY_ADDRESS, seniorVaultFactoryAbi } from '@/lib/contracts'

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export function VaultGate({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount()

  const { data: vaultAddress, isLoading, refetch } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: seniorVaultFactoryAbi,
    functionName: 'seniorToVault',
    args: [address!],
    query: { enabled: !!address },
  })

  const { writeContract, isPending } = useWriteContract()

  const hasVault = vaultAddress && vaultAddress !== ZERO_ADDRESS

  if (!isConnected) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-stone-50 p-8">
        <h1 className="text-3xl font-bold text-stone-900">SeniorChain</h1>
        <p className="text-lg text-stone-500">Połącz portfel, aby zarządzać swoim vaultem</p>
        <ConnectButton />
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50">
        <p className="text-lg text-stone-500">Sprawdzanie vaultu...</p>
      </main>
    )
  }

  if (!hasVault) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-stone-50 p-8">
        <h1 className="text-3xl font-bold text-stone-900">SeniorChain</h1>
        <p className="text-lg text-stone-600">
          Nie masz jeszcze vaultu. Utwórz go, aby zacząć.
        </p>
        <button
          onClick={() =>
            writeContract(
              {
                address: FACTORY_ADDRESS,
                abi: seniorVaultFactoryAbi,
                functionName: 'createVault',
              },
              { onSuccess: () => refetch() }
            )
          }
          disabled={isPending}
          className="w-full max-w-xs rounded-xl bg-emerald-600 py-4 text-xl font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {isPending ? 'Tworzenie...' : 'Utwórz vault'}
        </button>
      </main>
    )
  }

  return <>{children}</>
}