// @flow

import {BigNumber} from 'bignumber.js'

export const NUMBERS = {
  DECIMAL_PLACES_IN_ADA: 6,
  LOVELACES_PER_ADA: new BigNumber('1 000 000'.replace(/ /g, ''), 10),
  HARD_DERIVATION_START: 2147483648,
  WALLET_TYPE_PURPOSE: {
    BIP44: 2147483692, // HARD_DERIVATION_START + 44;
    CIP1852: 2147485500, // HARD_DERIVATION_START + 1852;
  },
  COIN_TYPES: {
    CARDANO: 2147485463, // HARD_DERIVATION_START + 1815;
  },
  ACCOUNT_INDEX: 0,
  CHAIN_DERIVATIONS: {
    EXTERNAL: 0,
    INTERNAL: 1,
    CHIMERIC_ACCOUNT: 2,
  },
  BIP44_DERIVATION_LEVELS: {
    ROOT: 0,
    PURPOSE: 1,
    COIN_TYPE: 2,
    ACCOUNT: 3,
    CHAIN: 4,
    ADDRESS: 5,
  },
  STAKING_KEY_INDEX: 0,
  EPOCH_REWARD_DENOMINATOR: new BigNumber(10).pow(8),
}
