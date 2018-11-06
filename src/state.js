// @flow
import trans from './l10n'

import type {Transaction, RawUtxo} from './types/HistoryTransaction'
import type {Translation} from './l10n/type'

export type Dict<T> = {[string]: T}

export type State = {
  languageCode: string,
  wallet: {
    isInitialized: boolean,
    transactions: Dict<Transaction>,
    ownAddresses: Array<string>,
    confirmationCounts: Dict<number>,
    generatedReceiveAddresses: Array<{address: string, isUsed: boolean}>,
  },
  txHistory: {
    isSynchronizing: boolean,
    lastSyncError: any, // TODO(ppershing): type me
  },
  balance: {
    isFetching: boolean,
    lastFetchingError: any,
    utxos: ?Array<RawUtxo>,
  },
  trans: Translation,
  isOnline: boolean,
}

export const getInitialState = (): State => ({
  languageCode: 'en-US',
  wallet: {
    isInitialized: false,
    transactions: {},
    ownAddresses: [],
    confirmationCounts: {},
    generatedReceiveAddresses: [],
  },
  txHistory: {
    isSynchronizing: false,
    lastSyncError: null,
  },
  balance: {
    isFetching: false,
    lastFetchingError: null,
    utxos: null,
  },
  trans,
  isOnline: true, // we are online by default
})

export default getInitialState
