// @flow

import type {WalletImplementation} from '../../src/types'

export var isHaskellShelley: (walletImplementationId: string) => boolean
export var isByron: (walletImplementationId: string) => boolean

// prettier-ignore
export var CONFIG: {
  NUMBERS: {
    HARD_DERIVATION_START: number
  },
  DEBUG: {
    PREFILL_FORMS: boolean,
    WALLET_NAME: string,
    PASSWORD: string,
    START_WITH_INDEX_SCREEN: boolean,
    MNEMONIC1: string,
    MNEMONIC2: string,
    MNEMONIC3: string,
    START_WITH_INDEX_SCREEN: boolean,
    PREFILL_FORMS: boolean,
    PASSWORD: string
  },
  CATALYST: {
    MIN_ADA: any,
    DISPLAYED_MIN_ADA: any,
  },
  HARDWARE_WALLETS: {
    LEDGER_NANO: {
      ENABLE_USB_TRANSPORT: boolean,
      ENABLED: boolean,
      DEFAULT_WALLET_NAME: string
    }
  },
  LOG_LEVEL: string,
  ANDROID_BIO_AUTH_EXCLUDED_SDK: Array<number>,
  PIN_LENGTH: number,
  WALLETS: {
    HASKELL_SHELLEY: WalletConfig,
    HASKELL_SHELLEY_24: WalletConfig,
    HASKELL_BYRON: WalletConfig,
    JORMUNGANDR_ITN: WalletConfig,
  },
  NETWORKS: {
    HASKELL_SHELLEY: NetworkConfig,
    HASKELL_SHELLEY_TESTNET: NetworkConfig,
    JORMUNGANDR: NetworkConfig,
  }
}

export var isNightly: () => boolean

// prettier-ignore
type NetworkConfig = {
  NETWORK_ID: number,
  ENABLED: boolean
}

type WalletConfig = {
  WALLET_IMPLEMENTATION_ID: number
}

export var getWalletConfigById: (walletImplementationId: string) => WalletImplementation

export var UI_V2: boolean
