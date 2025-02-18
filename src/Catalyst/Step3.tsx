import {useNavigation} from '@react-navigation/native'
import React, {useState} from 'react'
import {defineMessages, useIntl} from 'react-intl'
import {ScrollView, StyleSheet, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useSelector} from 'react-redux'

import {showErrorDialog} from '../../legacy/actions'
import PinInputKeyboard from '../../legacy/components/Common/PinInputKeyboard'
import {ProgressStep, Spacer} from '../../legacy/components/UiKit'
import {errorMessages} from '../../legacy/i18n/global-messages'
import {CATALYST_ROUTES} from '../../legacy/RoutesList'
import {isHWSelector, pinSelector} from '../../legacy/selectors'
import {Description, PinBox, Row, Title} from './components'

const PIN_LENGTH = 4

export const Step3 = () => {
  const intl = useIntl()
  const strings = useStrings()
  const navigation = useNavigation()
  const pin = useSelector(pinSelector)
  const isHW = useSelector(isHWSelector)
  const [confirmPin, setPin] = useState('')

  const pinChange = (enteredPin: string) => {
    setPin(enteredPin)
    if (enteredPin.length === 4) {
      if (pin.join('') === enteredPin) {
        if (isHW) {
          navigation.navigate(CATALYST_ROUTES.STEP5)
        } else {
          navigation.navigate(CATALYST_ROUTES.STEP4)
        }
      } else {
        showErrorDialog(errorMessages.incorrectPin, intl)
      }
    }
  }

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.safeAreaView}>
      <ProgressStep currentStep={3} totalSteps={6} />

      <ScrollView bounces={false} contentContainerStyle={styles.contentContainer}>
        <Spacer height={48} />

        <Title>{strings.subTitle}</Title>

        <Spacer height={16} />

        <Description>{strings.description}</Description>

        <Spacer height={48} />

        <Row style={{justifyContent: 'center'}}>
          <PinBox selected={confirmPin.length === 0}>{confirmPin[0]}</PinBox>
          <Spacer width={16} />
          <PinBox selected={confirmPin.length === 1}>{confirmPin[1]}</PinBox>
          <Spacer width={16} />
          <PinBox selected={confirmPin.length === 2}>{confirmPin[2]}</PinBox>
          <Spacer width={16} />
          <PinBox selected={confirmPin.length === 3}>{confirmPin[3]}</PinBox>
        </Row>
      </ScrollView>

      <Spacer fill />

      <View style={{height: 250}}>
        <PinInputKeyboard pinLength={PIN_LENGTH} onPinChange={pinChange} />
      </View>
    </SafeAreaView>
  )
}

const messages = defineMessages({
  subTitle: {
    id: 'components.catalyst.step3.subTitle',
    defaultMessage: '!!!Enter PIN',
  },
  description: {
    id: 'components.catalyst.step3.description',
    defaultMessage: '!!!Please enter the PIN as you will need it every time you want to access the Catalyst Voting app',
  },
})

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
})

const useStrings = () => {
  const intl = useIntl()

  return {
    subTitle: intl.formatMessage(messages.subTitle),
    description: intl.formatMessage(messages.description),
  }
}
