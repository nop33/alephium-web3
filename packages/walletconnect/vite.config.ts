import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'alephiumWalletConnect',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        'fs',
        'path',
        'crypto',
        'stream',
        'http',
        'https',
        'child_process',
        'events',
        'os',
        'util',
        'url',
        'net',
        'tls',
        '@alephium/web3',
        '@alephium/web3-wallet',
        '@walletconnect/sign-client',
        '@walletconnect/types',
        '@walletconnect/utils',
        '@walletconnect/core',
        '@walletconnect/keyvaluestorage',
        'eventemitter3',
        'async-sema'
      ],
    },
  },
})
