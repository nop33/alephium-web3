/*
Copyright 2018 - 2022 The Alephium Authors
This file is part of the alephium project.

The library is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

The library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with the library. If not, see <http://www.gnu.org/licenses/>.
*/

import { binToHex, concatBytes, hexToBinUnsafe } from '@alephium/web3'
import { randomBytes } from '@noble/hashes/utils'
import { pbkdf2 } from '@noble/hashes/pbkdf2'
import { sha256 } from '@noble/hashes/sha256'
import { gcm } from '@noble/ciphers/aes'

const saltByteLength = 64
const ivByteLength = 64
const authTagLength = 16

export const encrypt = (password: string, dataRaw: string): string => {
  const data = new TextEncoder().encode(dataRaw)

  const salt = randomBytes(saltByteLength)
  const derivedKey = keyFromPassword(password, salt)
  const iv = randomBytes(ivByteLength)
  const cipher = gcm(derivedKey, iv)
  const encryptedWithAuthTag = cipher.encrypt(data)

  const payload = {
    salt: binToHex(salt),
    iv: binToHex(iv),
    encrypted: binToHex(encryptedWithAuthTag),
    version: 1
  }

  return JSON.stringify(payload)
}

export const decrypt = (password: string, payloadRaw: string): string => {
  const payload = JSON.parse(payloadRaw)

  const version = payload.version
  if (version !== 1) {
    throw new Error(`Invalid version: got ${version}, expected: 1`)
  }

  const salt = hexToBinUnsafe(payload.salt)
  const iv = hexToBinUnsafe(payload.iv)
  const encryptedWithAuthTag = hexToBinUnsafe(payload.encrypted)

  const derivedKey = keyFromPassword(password, salt)
  const cipher = gcm(derivedKey, iv)
  const decrypted = cipher.decrypt(encryptedWithAuthTag)

  return new TextDecoder().decode(decrypted)
}

const keyFromPassword = (password: string | Uint8Array, salt: Uint8Array): Uint8Array => {
  return pbkdf2(sha256, password, salt, { c: 10000, dkLen: 32 })
}
