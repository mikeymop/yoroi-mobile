// @flow

import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'

import iconGear from '../../assets/img/gear.png'
import {UI_V2} from '../../config/config'
import {defaultNavigationOptions, defaultStackNavigatorOptions} from '../../navigationOptions'
import {TX_HISTORY_ROUTES, WALLET_ROOT_ROUTES} from '../../RoutesList'
import {transactionsInfoSelector, walletMetaSelector} from '../../selectors'
import {COLORS} from '../../styles/config'
import {formatDateToSeconds} from '../../utils/format'
import {mockV2NavigatorOptions} from '../../utils/mocks'
import {Button} from '../UiKit'
import styles from './styles/SettingsButton.style'
import TxDetails from './TxDetails'
import TxHistory from './TxHistory'

type TxHistoryRoutes = {
  'tx-history-list': any,
  'tx-details': any,
}

const Stack = createStackNavigator<any, TxHistoryRoutes, any>()

const TxHistoryNavigator = () => {
  const walletMeta = useSelector(walletMetaSelector)
  const transactionInfos = useSelector(transactionsInfoSelector)

  return (
    <Stack.Navigator screenOptions={{...defaultStackNavigatorOptions}} initialRouteName={TX_HISTORY_ROUTES.MAIN}>
      {UI_V2 ? (
        <Stack.Screen
          name={TX_HISTORY_ROUTES.MAIN}
          component={TxHistory}
          options={mockV2NavigatorOptions(
            {
              title: walletMeta.name,
              headerStyle: {
                backgroundColor: COLORS.BACKGROUND_GRAY,
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: COLORS.ERROR_TEXT_COLOR_DARK,
            },
            ['settings'],
          )}
        />
      ) : (
        <Stack.Screen
          name={TX_HISTORY_ROUTES.MAIN}
          component={TxHistory}
          options={({navigation}) => ({
            title: walletMeta.name,
            headerRight: () => (
              <Button
                style={styles.settingsButton}
                onPress={() => navigation.navigate(WALLET_ROOT_ROUTES.SETTINGS)}
                iconImage={iconGear}
                title=""
                withoutBackground
              />
            ),
            ...defaultNavigationOptions,
          })}
        />
      )}
      <Stack.Screen
        name={TX_HISTORY_ROUTES.TX_DETAIL}
        component={TxDetails}
        options={({route}) => ({
          title: formatDateToSeconds(transactionInfos[route.params?.id].submittedAt),
          ...defaultNavigationOptions,
        })}
      />
    </Stack.Navigator>
  )
}

export default TxHistoryNavigator
