// @flow

import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useDispatch, useSelector} from 'react-redux'

import {changeAndSaveLanguage, changeLanguage} from '../../actions/language'
import {languageSelector} from '../../selectors'
import LanguagePicker from '../Common/LanguagePicker'
import styles from './styles/ChangeLanguageScreen.style'

const LanguagePickerScreen = () => {
  const navigation = useNavigation()
  const languageCode = useSelector(languageSelector)
  const dispatch = useDispatch()
  const handleContinue = async (_event) => {
    await dispatch(changeAndSaveLanguage(languageCode))

    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <LanguagePicker
        {...{navigation, languageCode, handleContinue}}
        changeLanguage={(languageCode) => dispatch(changeLanguage(languageCode))}
      />
    </SafeAreaView>
  )
}

export default LanguagePickerScreen
