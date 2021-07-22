// @flow

import React from 'react'
import {View, Image, TouchableOpacity, Linking} from 'react-native'
import Clipboard from '@react-native-community/clipboard'
import {injectIntl, defineMessages, type IntlShape} from 'react-intl'

import copyIcon from '../../../assets/img/icon/copy.png'
import {Text} from '../../UiKit'
import {getNetworkConfigById} from '../../../config/networks'
import {FadeOutView} from '../../Common/FadeOutView'
import styles from './styles/VerifyRestoredWallet.style'

import type {NetworkId} from '../../../config/types'

import type {ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet'

const messages = defineMessages({
  copied: {
    id: 'components.delegationsummary.delegatedStakepoolInfo.copied',
    defaultMessage: '!!!Copied!',
  },
})

const WalletAddress = ({
  intl,
  addressHash,
  networkId,
  style,
}: {
  intl: IntlShape,
  addressHash: string,
  networkId: NetworkId,
  style?: ViewStyleProp,
}) => {
  const [showCopyNotification, setShowCopyNotification] = React.useState(false)

  const onTapAddress = () => {
    const config = getNetworkConfigById(networkId)
    Linking.openURL(config.EXPLORER_URL_FOR_ADDRESS(addressHash))
  }

  const copyHash = () => {
    Clipboard.setString(addressHash)
    setShowCopyNotification(true)
  }

  return (
    <View style={[styles.addressRowStyles, style]}>
      <TouchableOpacity activeOpacity={0.5} onPress={onTapAddress}>
        <Text numberOfLines={1} ellipsizeMode="middle" style={styles.addressHash}>
          {addressHash}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.5} onPress={copyHash} disabled={showCopyNotification}>
        <Image source={copyIcon} style={styles.copyIcon} />
      </TouchableOpacity>

      <FadeOutView visible={showCopyNotification} onEnd={() => setShowCopyNotification(false)}>
        <Text style={styles.notifView}>{intl.formatMessage(messages.copied)}</Text>
      </FadeOutView>
    </View>
  )
}

export default injectIntl(WalletAddress)
