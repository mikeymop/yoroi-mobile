// @flow

import React from 'react'
import {type IntlShape, defineMessages, injectIntl} from 'react-intl'
import {View} from 'react-native'

import {Button, Text} from '../UiKit'
import styles from './styles/PoolDetailScreen.style'

const messages = defineMessages({
  delegate: {
    id: 'components.stakingcenter.confirmDelegation.delegateButtonLabel',
    defaultMessage: '!!!Attention',
  },
  title: {
    id: 'components.stakingcenter.pooldetailscreen.title',
    defaultMessage: '!!!Attention',
  },
})

type Props = {|
  intl: IntlShape,
  onPressDelegate: () => any,
  disabled: ?boolean,
|}

const PoolDetailScreen = ({intl, onPressDelegate, disabled = false}: Props) => {
  const delegateButtonTitle = intl.formatMessage(messages.delegate)
  const title = intl.formatMessage(messages.title)

  return (
    <View style={styles.content}>
      <View style={styles.heading}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.buttons}>
        <Button
          outlineOnLight
          outline
          onPress={onPressDelegate}
          title={delegateButtonTitle}
          style={styles.button}
          disabled={disabled}
        />
      </View>
    </View>
  )
}

export default injectIntl(PoolDetailScreen)
