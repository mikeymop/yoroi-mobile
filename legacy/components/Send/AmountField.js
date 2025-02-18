// @flow

import React from 'react'
import {defineMessages, useIntl} from 'react-intl'

import {TextInput} from '../UiKit'
import {editedFormatter, pastedFormatter} from './amountUtils'

export const messages = defineMessages({
  label: {
    id: 'components.send.amountfield.label',
    defaultMessage: '!!!Amount',
  },
})

type Props = {
  amount: string,
  setAmount: (amount: string) => mixed,
  error: ?string,
  editable?: boolean,
}

const AmountField = ({amount, error, editable, setAmount}: Props) => {
  const intl = useIntl()
  const handleSetAmount = (text) => {
    const shorterStringLength = Math.min(text.length, amount.length)
    const wasPasted =
      Math.abs(amount.length - text.length) > 1 ||
      amount.substring(0, shorterStringLength) !== text.substring(0, shorterStringLength)

    const formatter = wasPasted ? pastedFormatter : editedFormatter

    setAmount(formatter(text))
  }

  return (
    <TextInput
      returnKeyType="done"
      keyboardType="numeric"
      label={intl.formatMessage(messages.label)}
      value={amount}
      onChangeText={handleSetAmount}
      errorText={error || undefined}
      editable={editable != null ? editable : true}
      faded={editable != null ? !editable : false}
    />
  )
}

export default AmountField
