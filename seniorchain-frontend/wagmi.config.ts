import { defineConfig } from '@wagmi/cli'
import { foundry } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'generated.ts',
  plugins: [
    foundry({
      project: '../seniorchain-backend',
    }),
  ],
})
