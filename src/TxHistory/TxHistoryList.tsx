import _ from 'lodash'
import React from 'react'
import {useIntl} from 'react-intl'
import {Alert, SectionList, StyleSheet, View} from 'react-native'
import {useSelector} from 'react-redux'

import {Text} from '../../legacy/components/UiKit'
import {actionMessages} from '../../legacy/i18n/global-messages'
import {transactionsInfoSelector} from '../../legacy/selectors'
import {formatDateRelative} from '../../legacy/utils/format'
import features from '../features'
import {TransactionInfo} from '../types/cardano'
import {TxHistoryListItem} from './TxHistoryListItem'
import {TxListActionsBannerForTransactionsTab} from './TxListActionsBanner'

type Props = {
  refreshing: boolean
  onRefresh: () => void
}

export const TxHistoryList = ({refreshing, onRefresh}: Props) => {
  const strings = useStrings()
  const transactionsInfo = useSelector(transactionsInfoSelector)
  const groupedTransactions = getTransactionsByDate(transactionsInfo)

  const handleExport = () => Alert.alert(strings.soon, strings.soon)
  const handleSearch = () => Alert.alert(strings.soon, strings.soon)

  return (
    <View style={styles.listRoot}>
      {(features.txHistory.export || features.txHistory.search) && (
        <TxListActionsBannerForTransactionsTab onExport={handleExport} onSearch={handleSearch} />
      )}
      <SectionList
        renderItem={({item}) => <TxHistoryListItem transaction={item} />}
        renderSectionHeader={({section: {data}}) => <DayHeader ts={data[0].submittedAt} />}
        refreshing={refreshing}
        onRefresh={onRefresh}
        sections={groupedTransactions}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        nestedScrollEnabled={true}
      />
    </View>
  )
}

type DayHeaderProps = {
  ts: unknown
}

const DayHeader = ({ts}: DayHeaderProps) => {
  const intl = useIntl()

  return (
    <View style={styles.dayHeaderRoot}>
      <Text>{formatDateRelative(ts, intl)}</Text>
    </View>
  )
}

const getTransactionsByDate = (transactions: Record<string, TransactionInfo>) =>
  _(transactions)
    .filter((t) => t.submittedAt != null)
    .sortBy((t) => t.submittedAt)
    .reverse()
    .groupBy((t) => t.submittedAt?.substring(0, '2001-01-01'.length))
    .values()
    .map((data) => ({data}))
    .value()

const styles = StyleSheet.create({
  listRoot: {
    flex: 1,
  },
  dayHeaderRoot: {
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 20,
  },
})

const useStrings = () => {
  const intl = useIntl()

  return {
    soon: intl.formatMessage(actionMessages.soon),
  }
}
