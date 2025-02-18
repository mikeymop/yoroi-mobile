// @flow

import React from 'react'
import {type IntlShape, defineMessages, injectIntl} from 'react-intl'
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native'

import chevronLeft from '../../assets/img/chevron_left.png'
import chevronRight from '../../assets/img/chevron_right.png'
import image from '../../assets/img/error.png'
import globalMessages, {errorMessages} from '../../i18n/global-messages'
import {Button, Modal} from '../UiKit'
import styles from './styles/ErrorModal.style'

const messages = defineMessages({
  showError: {
    id: 'components.common.errormodal.showError',
    defaultMessage: '!!!Show error message',
  },
  hideError: {
    id: 'components.common.errormodal.hideError',
    defaultMessage: '!!!Hide error message',
  },
})

type ErrorViewProps = {
  title?: string,
  errorMessage: string,
  errorLogs?: ?string,
  onDismiss: () => void,
}
type HOCProps = {
  intl: IntlShape,
}

const _ErrorView = ({intl, title, errorMessage, errorLogs, onDismiss}: ErrorViewProps & HOCProps) => {
  const [showErrorLogs, setShowErrorLogs] = React.useState(false)
  const toggleShowErrorlogs = () => setShowErrorLogs(!showErrorLogs)

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.headerView}>
        <Text style={styles.title}>{title ?? intl.formatMessage(errorMessages.generalLocalizableError.title)}</Text>
        <Image source={image} style={styles.image} />
      </View>

      <Text style={styles.paragraph}>{errorMessage}</Text>

      {errorLogs != null && (
        <View style={styles.errorSection}>
          <TouchableOpacity accessibilityRole="button" onPress={toggleShowErrorlogs} activeOpacity={0.5}>
            <View style={styles.errorSectionHeader}>
              <Text style={styles.showErrorTrigger}>
                {showErrorLogs ? intl.formatMessage(messages.hideError) : intl.formatMessage(messages.showError)}
              </Text>
              <Image source={showErrorLogs ? chevronLeft : chevronRight} />
            </View>
          </TouchableOpacity>

          {showErrorLogs && (
            <View style={styles.errorSectionView}>
              <View style={styles.errorSectionContent}>
                <Text style={styles.paragraph}>{errorLogs}</Text>
              </View>
            </View>
          )}
        </View>
      )}
      <Button block onPress={onDismiss} title={intl.formatMessage(globalMessages.close)} />
    </ScrollView>
  )
}

export const ErrorView = injectIntl(_ErrorView)

type Props = {
  visible: boolean,
  title?: string,
  errorMessage: string,
  errorLogs?: ?string,
  onRequestClose: () => void,
}

const ErrorModal = ({visible, title, errorMessage, errorLogs, onRequestClose}: Props) => (
  <Modal visible={visible} onRequestClose={onRequestClose} showCloseIcon>
    <ErrorView title={title} errorMessage={errorMessage} errorLogs={errorLogs} onDismiss={onRequestClose} />
  </Modal>
)

export default ErrorModal
