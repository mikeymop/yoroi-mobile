// @flow

/**
 * Step 5 for the Catalyst registration
 * Ask password used for signing transaction or sign with HW wallet
 * submit the transaction
 */

import {useNavigation} from '@react-navigation/native'
import type {ComponentType} from 'react'
import React, {useEffect, useState} from 'react'
import type {IntlShape} from 'react-intl'
import {defineMessages, injectIntl} from 'react-intl'
import {Platform, SafeAreaView, View} from 'react-native'
import {connect} from 'react-redux'

import {showErrorDialog, submitSignedTx, submitTransaction} from '../../actions'
import {setLedgerDeviceId, setLedgerDeviceObj} from '../../actions/hwWallet'
import {generateVotingTransaction} from '../../actions/voting'
import {CONFIG} from '../../config/config'
import {WrongPassword} from '../../crypto/errors'
import {ISignRequest} from '../../crypto/ISignRequest'
import KeyStore from '../../crypto/KeyStore'
import type {DeviceId, DeviceObj, HWDeviceInfo} from '../../crypto/shelley/ledgerUtils'
import walletManager, {SystemAuthDisabled} from '../../crypto/walletManager'
import globalMessages, {confirmationMessages, errorMessages, ledgerMessages, txLabels} from '../../i18n/global-messages'
import LocalizableError from '../../i18n/LocalizableError'
import {CATALYST_ROUTES, WALLET_ROOT_ROUTES} from '../../RoutesList'
import {
  defaultNetworkAssetSelector,
  easyConfirmationSelector,
  hwDeviceInfoSelector,
  isHWSelector,
} from '../../selectors'
import type {DefaultAsset} from '../../types/HistoryTransaction'
import assert from '../../utils/assert'
import {formatTokenWithSymbol} from '../../utils/format'
import {ErrorView} from '../Common/ErrorModal'
import HWInstructions from '../Ledger/HWInstructions'
import LedgerConnect from '../Ledger/LedgerConnect'
import {LedgerTransportSwitch} from '../Ledger/LedgerTransportSwitchModal'
import {Button, Modal, OfflineBanner, ProgressStep, StatusBar, Text, ValidatedTextInput} from '../UiKit'
import {PleaseWaitView} from '../UiKit/PleaseWaitModal'
import styles from './styles/Step5.style'

const messages = defineMessages({
  subTitle: {
    id: 'components.catalyst.step5.subTitle',
    defaultMessage: '!!!Confirm Registration',
  },
  description: {
    id: 'components.catalyst.step5.description',
    defaultMessage:
      '!!!Please enter your spending password again to confirm your voting ' +
      'registration and submit the certificate generated in the previous ' +
      'step.',
  },
  bioAuthDescription: {
    id: 'components.catalyst.step5.bioAuthDescription',
    defaultMessage:
      '!!!Please confirm your voting registration. You will be asked to ' +
      'authenticate once again to sign and submit the certificate generated ' +
      'in the previous step.',
  },
})

type ErrorData = {|
  errorMessage: string,
  errorLogs: ?string,
|}

const DIALOG_STEPS = {
  CLOSED: 'CLOSED',
  CHOOSE_TRANSPORT: 'CHOOSE_TRANSPORT',
  LEDGER_CONNECT: 'LEDGER_CONNECT',
  ERROR: 'ERROR',
  SUBMITTING: 'SUBMITTING',
  WAITING_HW_RESPONSE: 'WAITING_HW_RESPONSE',
}
type DialogStep = $Values<typeof DIALOG_STEPS>

type DialogProps = {|
  +step: DialogStep,
  +onRequestClose: () => void,
  +onChooseTransport: (Object, boolean) => mixed,
  +onConnectBLE: (DeviceId) => mixed,
  +onConnectUSB: (DeviceObj) => mixed,
  +useUSB: boolean,
  +errorData: ErrorData,
  +intl: IntlShape,
|}
const Dialog = ({
  step,
  onRequestClose,
  onChooseTransport,
  onConnectBLE,
  onConnectUSB,
  useUSB,
  errorData,
  intl,
}: DialogProps) => {
  const getBody = () => {
    switch (step) {
      case DIALOG_STEPS.CLOSED:
        return null
      case DIALOG_STEPS.CHOOSE_TRANSPORT:
        return (
          <LedgerTransportSwitch
            onSelectUSB={(event) => onChooseTransport(event, true)}
            onSelectBLE={(event) => onChooseTransport(event, false)}
          />
        )
      case DIALOG_STEPS.LEDGER_CONNECT:
        return <LedgerConnect onConnectBLE={onConnectBLE} onConnectUSB={onConnectUSB} useUSB={useUSB} />
      case DIALOG_STEPS.WAITING_HW_RESPONSE:
        return <PleaseWaitView title={''} spinnerText={intl.formatMessage(ledgerMessages.followSteps)} />
      case DIALOG_STEPS.SUBMITTING:
        return (
          <PleaseWaitView
            title={intl.formatMessage(txLabels.submittingTx)}
            spinnerText={intl.formatMessage(globalMessages.pleaseWait)}
          />
        )
      case DIALOG_STEPS.ERROR:
        return (
          <ErrorView errorMessage={errorData.errorMessage} errorLogs={errorData.errorLogs} onDismiss={onRequestClose} />
        )
      default:
        return null
    }
  }
  return (
    <Modal
      visible={step !== DIALOG_STEPS.CLOSED}
      onRequestClose={onRequestClose}
      showCloseIcon={step !== DIALOG_STEPS.WAITING_HW_RESPONSE && step !== DIALOG_STEPS.SUBMITTING}
    >
      {getBody()}
    </Modal>
  )
}

const renderInstructions = (isEasyConfirmationEnabled: boolean, isHW: boolean, useUSB: boolean, intl: IntlShape) => {
  if (isHW) {
    return <HWInstructions useUSB={useUSB} />
  } else {
    return (
      <Text style={styles.description}>
        {isEasyConfirmationEnabled
          ? intl.formatMessage(messages.bioAuthDescription)
          : intl.formatMessage(messages.description)}
      </Text>
    )
  }
}

type Props = {
  intl: IntlShape,
  isEasyConfirmationEnabled: boolean,
  isHW: boolean,
  hwDeviceInfo: HWDeviceInfo,
  generateVotingTransaction: (string | void) => mixed,
  submitTransaction: (ISignRequest<any>, string) => void,
  submitSignedTx: (string) => mixed,
  setLedgerDeviceId: (DeviceId) => mixed,
  setLedgerDeviceObj: (DeviceObj) => mixed,
  defaultAsset: DefaultAsset,
  unsignedTx?: ISignRequest<any>,
}

const Step5 = ({
  intl,
  isEasyConfirmationEnabled,
  isHW,
  hwDeviceInfo,
  generateVotingTransaction,
  submitTransaction,
  submitSignedTx,
  setLedgerDeviceId,
  setLedgerDeviceObj,
  defaultAsset,
  unsignedTx,
}: Props) => {
  const navigation = useNavigation()
  const [password, setPassword] = useState(CONFIG.DEBUG.PREFILL_FORMS ? CONFIG.DEBUG.PASSWORD : '')

  const [dialogStep, setDialogStep] = useState<DialogStep>(DIALOG_STEPS.CLOSED)
  const [errorData, setErrorData] = useState<ErrorData>({
    errorMessage: '',
    errorLogs: '',
  })
  const [fees, setFees] = useState(null)
  const [useUSB, setUseUSB] = useState<boolean>(false)

  const onChooseTransport = (_e: Object, shouldUseUSB: boolean) => {
    setUseUSB(shouldUseUSB)
    if (
      (shouldUseUSB && hwDeviceInfo.hwFeatures.deviceObj == null) ||
      (!shouldUseUSB && hwDeviceInfo.hwFeatures.deviceId == null)
    ) {
      setDialogStep(DIALOG_STEPS.LEDGER_CONNECT)
    } else {
      setDialogStep(DIALOG_STEPS.CLOSED)
    }
  }

  const onConnectUSB = async (deviceObj: DeviceObj) => {
    await setLedgerDeviceObj(deviceObj)
    setDialogStep(DIALOG_STEPS.CLOSED)
  }

  const onConnectBLE = async (deviceId: DeviceId) => {
    await setLedgerDeviceId(deviceId)
    setDialogStep(DIALOG_STEPS.CLOSED)
  }

  useEffect(() => {
    const generateTx = async () => {
      await generateVotingTransaction()
    }

    if (unsignedTx != null) {
      unsignedTx.fee().then((o) => {
        setFees(o.getDefault())
      })
    } else if (isHW) {
      generateTx()
    }
  }, [unsignedTx, generateVotingTransaction, isHW])

  useEffect(() => {
    if (isHW && Platform.OS === 'android' && CONFIG.HARDWARE_WALLETS.LEDGER_NANO.ENABLE_USB_TRANSPORT) {
      setDialogStep(DIALOG_STEPS.CHOOSE_TRANSPORT)
    }
  }, [isHW])

  const isConfirmationDisabled = !isEasyConfirmationEnabled && !isHW && !password

  const submitTx = async (decryptedKey: string | void) => {
    try {
      if (unsignedTx == null) {
        // note: should never happen
        throw new Error('Catalyst::submitTx: Could not retrieve transaction data')
      }
      if (decryptedKey !== undefined) {
        assert.assert(typeof decryptedKey === 'string', 'Catalyst::submitTx: Invalid decryption key')
        setDialogStep(DIALOG_STEPS.SUBMITTING)
        await submitTransaction(unsignedTx, decryptedKey)
      } else {
        // if no decryption key is given, we are signing with a HW
        assert.assert(isHW, 'Catalyst::submitTx: expected a HW wallet')
        setDialogStep(DIALOG_STEPS.WAITING_HW_RESPONSE)
        const signedTx = await walletManager.signTxWithLedger(unsignedTx, useUSB)
        setDialogStep(DIALOG_STEPS.SUBMITTING)
        await submitSignedTx(Buffer.from(signedTx.encodedTx).toString('base64'))
      }
      navigation.navigate(CATALYST_ROUTES.STEP6)
    } finally {
      setDialogStep(DIALOG_STEPS.CLOSED)
    }
  }

  const onContinue = async (_event) => {
    try {
      if (isHW) {
        await submitTx()
        return
      }

      if (isEasyConfirmationEnabled) {
        try {
          await walletManager.ensureKeysValidity()
          navigation.navigate(CATALYST_ROUTES.BIOMETRICS_SIGNING, {
            keyId: walletManager._id,
            onSuccess: async (decryptedKey) => {
              await submitTx(decryptedKey)
            },
            addWelcomeMessage: false,
            onFail: () => navigation.goBack(),
          })
        } catch (e) {
          if (e instanceof SystemAuthDisabled) {
            await walletManager.closeWallet()
            await showErrorDialog(errorMessages.enableSystemAuthFirst, intl)
            navigation.navigate(WALLET_ROOT_ROUTES.WALLET_SELECTION)

            return
          } else {
            throw e
          }
        }
        return
      }

      try {
        const decryptedKey = await KeyStore.getData(walletManager._id, 'MASTER_PASSWORD', '', password, intl)

        await submitTx(decryptedKey)
      } catch (e) {
        if (e instanceof WrongPassword) {
          await showErrorDialog(errorMessages.incorrectPassword, intl)
        } else {
          throw e
        }
      }
    } catch (e) {
      if (e instanceof LocalizableError) {
        setErrorData({
          errorMessage: intl.formatMessage({id: e.id, defaultMessage: e.defaultMessage}, e.values),
          errorLogs: e.values.response || null,
        })
      } else {
        setErrorData({
          errorMessage: intl.formatMessage(errorMessages.generalTxError.message),
          errorLogs: e.message || null,
        })
      }
      setDialogStep(DIALOG_STEPS.ERROR)
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ProgressStep currentStep={5} totalSteps={6} />
      <StatusBar type="dark" />

      <OfflineBanner />
      <View style={styles.container}>
        <View>
          <Text style={styles.subTitle}>{intl.formatMessage(messages.subTitle)}</Text>
          <View style={[styles.mb70]}>{renderInstructions(isEasyConfirmationEnabled, isHW, useUSB, intl)}</View>
          <ValidatedTextInput
            value={fees ? formatTokenWithSymbol(fees, defaultAsset) : ''}
            label={`${intl.formatMessage(txLabels.fees)}`}
            editable={false}
            onChangeText={() => ({})}
          />
          {!isEasyConfirmationEnabled && !isHW && (
            <View>
              <ValidatedTextInput
                secureTextEntry
                value={password}
                label={intl.formatMessage(txLabels.password)}
                onChangeText={setPassword}
              />
            </View>
          )}
        </View>
        <Button
          onPress={onContinue}
          title={intl.formatMessage(confirmationMessages.commonButtons.confirmButton)}
          disabled={isConfirmationDisabled}
        />
      </View>

      <Dialog
        step={dialogStep}
        onRequestClose={() => setDialogStep(DIALOG_STEPS.CLOSED)}
        onChooseTransport={onChooseTransport}
        onConnectUSB={onConnectUSB}
        onConnectBLE={onConnectBLE}
        useUSB={useUSB}
        errorData={errorData}
        intl={intl}
      />
    </SafeAreaView>
  )
}

export default (injectIntl(
  connect(
    (state) => ({
      isEasyConfirmationEnabled: easyConfirmationSelector(state),
      unsignedTx: state.voting.unsignedTx,
      defaultAsset: defaultNetworkAssetSelector(state),
      isHW: isHWSelector(state),
      hwDeviceInfo: hwDeviceInfoSelector(state),
    }),
    {
      generateVotingTransaction,
      submitTransaction,
      submitSignedTx,
      setLedgerDeviceId,
      setLedgerDeviceObj,
    },
    (state, dispatchProps, ownProps) => ({
      ...state,
      ...dispatchProps,
      ...ownProps,
    }),
  )(Step5),
): ComponentType<{}>)
