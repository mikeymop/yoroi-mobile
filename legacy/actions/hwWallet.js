// @flow

import type {Dispatch} from 'redux'

import type {DeviceId, DeviceObj, HWDeviceInfo} from '../crypto/shelley/ledgerUtils'
import {NoDeviceInfoError} from '../crypto/shelley/ledgerUtils'
import walletManager from '../crypto/walletManager'
import {hwDeviceInfoSelector} from '../selectors'
import type {State} from '../state'
import {Logger} from '../utils/logging'

const _saveHW = (hwDeviceInfo) => ({
  path: ['wallet', 'hwDeviceInfo'],
  payload: hwDeviceInfo,
  reducer: (state, value) => value,
  type: 'SAVE_HW',
})

export const saveHW = (hwDeviceInfo: HWDeviceInfo) => (dispatch: Dispatch<any>) => {
  dispatch(_saveHW(hwDeviceInfo))
}

export const setLedgerDeviceId = (deviceId: DeviceId) => async (dispatch: Dispatch<any>, getState: () => State) => {
  Logger.debug('setting deviceId', deviceId)
  const state = getState()
  const hwDeviceInfo = hwDeviceInfoSelector(state)
  if (hwDeviceInfo == null || hwDeviceInfo.hwFeatures == null) {
    throw new NoDeviceInfoError()
  }
  const updatedInfo = {
    ...hwDeviceInfo,
    hwFeatures: {
      ...hwDeviceInfo.hwFeatures,
      deviceId,
    },
  }
  Logger.debug('updating hwDeviceInfo', updatedInfo)
  // saved in redux state internally through notify()
  await walletManager.updateHWDeviceInfo(updatedInfo)
}

export const setLedgerDeviceObj = (deviceObj: DeviceObj) => async (dispatch: Dispatch<any>, getState: () => State) => {
  Logger.debug('setting deviceObj', deviceObj)
  const state = getState()
  const hwDeviceInfo = hwDeviceInfoSelector(state)
  if (hwDeviceInfo == null || hwDeviceInfo.hwFeatures == null) {
    throw new NoDeviceInfoError()
  }
  const updatedInfo = {
    ...hwDeviceInfo,
    hwFeatures: {
      ...hwDeviceInfo.hwFeatures,
      deviceObj,
    },
  }
  Logger.debug('updating hwDeviceInfo', updatedInfo)
  // saved in redux state internally through notify()
  await walletManager.updateHWDeviceInfo(updatedInfo)
}
