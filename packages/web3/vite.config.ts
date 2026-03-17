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
      name: 'alephium',
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
        '@noble/secp256k1',
        '@noble/hashes/sha256',
        '@noble/hashes/hmac',
        'base-x',
        'bignumber.js',
        'blakejs',
        'bn.js',
        'cross-fetch',
        'elliptic',
        'eventemitter3',
      ],
    },
  },
})
