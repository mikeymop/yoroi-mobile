import type {ReactNode} from 'react'
import React from 'react'
import {defineMessages, useIntl} from 'react-intl'
import {StyleSheet} from 'react-native'
import {ActivityIndicator, Image, SafeAreaView, View} from 'react-native'
import type {ImageSource} from 'react-native/Libraries/Image/ImageSource'
import type {ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet'
import {useSelector} from 'react-redux'

import {Button, ProgressStep, TextInput} from '../../../legacy/components/UiKit'
import {CONFIG} from '../../../legacy/config/config'
import globalMessages from '../../../legacy/i18n/global-messages'
import {walletNamesSelector} from '../../../legacy/selectors'
import {spacing} from '../../../legacy/styles/config'
import {ignoreConcurrentAsyncHandler} from '../../../legacy/utils/utils'
import {getWalletNameError, validateWalletName} from '../../../legacy/utils/validators'

type Props = {
  onSubmit: ({name: string}) => void
  defaultWalletName?: string
  image?: ImageSource
  progress?: {
    currentStep: number
    totalSteps: number
  }
  containerStyle?: ViewStyleProp
  buttonStyle?: ViewStyleProp
  topContent?: ReactNode
  bottomContent?: ReactNode
  isWaiting?: boolean
}

export const WalletNameForm = ({
  onSubmit,
  image,
  progress,
  containerStyle,
  buttonStyle,
  topContent,
  bottomContent,
  isWaiting = false,
}: Props) => {
  const strings = useStrings()
  const [name, setName] = React.useState(CONFIG.HARDWARE_WALLETS.LEDGER_NANO.DEFAULT_WALLET_NAME || '')
  const walletNames = useSelector(walletNamesSelector)
  const validationErrors = validateWalletName(name, null, walletNames)
  const hasErrors = Object.keys(validationErrors).length > 0
  const errorMessages = {
    tooLong: strings.walletNameErrorTooLong,
    nameAlreadyTaken: strings.walletNameErrorNameAlreadyTaken,
    mustBeFilled: strings.walletNameErrorMustBeFilled,
  }
  const walletNameErrorText = getWalletNameError(errorMessages, validationErrors) || undefined

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const submit = React.useCallback(ignoreConcurrentAsyncHandler(() => () => onSubmit({name}), 1000)(), [onSubmit, name])

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {progress != null && (
        <ProgressStep currentStep={progress.currentStep} totalSteps={progress.totalSteps} displayStepNumber />
      )}

      <View style={[styles.container, containerStyle]}>
        <View style={styles.heading}>{image != null && <Image source={image} />}</View>

        {topContent}

        <TextInput
          autoFocus
          label={strings.walletNameInputLabel}
          value={name}
          onChangeText={setName}
          errorText={walletNameErrorText}
          disabled={isWaiting}
        />

        {bottomContent}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          block
          onPress={submit}
          title={strings.save}
          style={[styles.button, buttonStyle]}
          disabled={hasErrors || isWaiting}
          testID="saveWalletButton"
        />
      </View>

      {isWaiting ? <ActivityIndicator /> : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    flex: 1,
  },
  heading: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.paragraphBottomMargin,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  button: {
    marginHorizontal: 10,
    marginVertical: 16,
  },
})

const messages = defineMessages({
  walletNameInputLabel: {
    id: 'components.walletinit.walletform.walletNameInputLabel',
    defaultMessage: '!!!Wallet name',
  },
  save: {
    id: 'components.walletinit.connectnanox.savenanoxscreen.save',
    defaultMessage: '!!!Save',
  },
})

const useStrings = () => {
  const intl = useIntl()

  return {
    walletNameInputLabel: intl.formatMessage(messages.walletNameInputLabel),
    save: intl.formatMessage(messages.save),
    walletNameErrorTooLong: intl.formatMessage(globalMessages.walletNameErrorTooLong),
    walletNameErrorNameAlreadyTaken: intl.formatMessage(globalMessages.walletNameErrorNameAlreadyTaken),
    walletNameErrorMustBeFilled: intl.formatMessage(globalMessages.walletNameErrorMustBeFilled),
  }
}
