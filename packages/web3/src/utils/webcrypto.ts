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

import { randomBytes } from '@noble/hashes/utils'

export class WebCrypto {
  subtle = typeof globalThis.crypto !== 'undefined' ? globalThis.crypto.subtle : undefined

  public getRandomValues<T extends ArrayBufferView | null>(array: T): T {
    if (!ArrayBuffer.isView(array)) {
      throw new TypeError(
        "Failed to execute 'getRandomValues' on 'Crypto': parameter 1 is not of type 'ArrayBufferView'"
      )
    }
    const bytes = randomBytes(array.byteLength)
    const view = new Uint8Array(array.buffer, array.byteOffset, array.byteLength)
    view.set(bytes)
    return array
  }
}
