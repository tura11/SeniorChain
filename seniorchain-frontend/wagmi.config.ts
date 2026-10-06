import { defineConfig } from '@wagmi/cli'
import { foundry, react } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'generated.ts',
  plugins: [
    foundry({
      project: '../seniorchain-backend',
    }),
    react(),
  ],
})