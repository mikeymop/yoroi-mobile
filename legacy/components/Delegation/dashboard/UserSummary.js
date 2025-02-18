// @flow

import {BigNumber} from 'bignumber.js'
import React from 'react'
import {type IntlShape, defineMessages, injectIntl} from 'react-intl'
import {View} from 'react-native'

import TotalAdaIcon from '../../../assets/staking/TotalAdaIcon'
import TotalDelegatedIcon from '../../../assets/staking/TotalDelegatedIcon'
import TotalRewardIcon from '../../../assets/staking/TotalRewardIcon'
import globalMessages from '../../../i18n/global-messages'
import {formatAdaWithText} from '../../../utils/format'
import {Button, Text, TitledCard} from '../../UiKit'
import styles from './styles/UserSummary.style'

const messages = defineMessages({
  title: {
    id: 'components.delegationsummary.userSummary.title',
    defaultMessage: '!!!Your Summary',
  },
  rewardsLabel: {
    id: 'components.delegationsummary.userSummary.totalRewards',
    defaultMessage: '!!!Total Rewards',
  },
  delegatedLabel: {
    id: 'components.delegationsummary.userSummary.totalDelegated',
    defaultMessage: '!!!Total Delegated',
  },
  withdrawButtonTitle: {
    id: 'components.delegationsummary.userSummary.withdrawButtonTitle',
    defaultMessage: '!!!Withdraw',
  },
})

const ICON_DIM = 44

type ExternalProps = {|
  +intl: IntlShape,
  +totalAdaSum: ?BigNumber,
  +totalRewards: ?BigNumber,
  +totalDelegated: ?BigNumber,
  +onWithdraw: () => void,
  +disableWithdraw: boolean,
|}

const UserSummary = ({intl, totalAdaSum, totalRewards, totalDelegated, onWithdraw, disableWithdraw}: ExternalProps) => (
  <View style={styles.wrapper}>
    <TitledCard title={intl.formatMessage(messages.title)}>
      <View style={styles.stats}>
        <View style={styles.row}>
          <View style={styles.icon}>
            <TotalAdaIcon width={ICON_DIM} height={ICON_DIM} />
          </View>
          <View style={styles.amountBlock}>
            <Text style={styles.label}>{intl.formatMessage(globalMessages.availableFunds)}:</Text>
            <Text bold style={styles.value}>
              {totalAdaSum != null ? formatAdaWithText(totalAdaSum) : '-'}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.icon}>
            <TotalRewardIcon width={ICON_DIM} height={ICON_DIM} />
          </View>
          <View style={styles.amountBlock}>
            <Text style={styles.label}>{intl.formatMessage(messages.rewardsLabel)}:</Text>
            <Text bold style={styles.value}>
              {totalRewards != null ? formatAdaWithText(totalRewards) : '-'}
            </Text>
          </View>
          <View style={styles.withdrawBlock}>
            <Button
              disabled={disableWithdraw}
              outlineOnLight
              shelleyTheme
              onPress={onWithdraw}
              title={intl.formatMessage(messages.withdrawButtonTitle)}
              style={styles.withdrawButton}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.icon}>
            <TotalDelegatedIcon width={ICON_DIM} height={ICON_DIM} />
          </View>
          <View style={styles.amountBlock}>
            <Text style={styles.label}>{intl.formatMessage(messages.delegatedLabel)}:</Text>
            <Text bold style={styles.value}>
              {totalDelegated != null ? formatAdaWithText(totalDelegated) : '-'}
            </Text>
          </View>
        </View>
      </View>
    </TitledCard>
  </View>
)

export default injectIntl(UserSummary)
