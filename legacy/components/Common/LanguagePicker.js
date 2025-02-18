// @flow

import React from 'react'
import {type IntlShape, defineMessages, injectIntl} from 'react-intl'
import {FlatList, View} from 'react-native'
import Markdown from 'react-native-easy-markdown'

import brazilianFlagIcon from '../../assets/img/flags/brazilian.png'
import chineseFlagIcon from '../../assets/img/flags/chinese.png'
import czechFlagIcon from '../../assets/img/flags/czech.png'
import dutchFlagIcon from '../../assets/img/flags/dutch.png'
import englishFlagIcon from '../../assets/img/flags/english.png'
import frenchFlagIcon from '../../assets/img/flags/french.png'
import germanFlagIcon from '../../assets/img/flags/german.png'
import hungarianFlagIcon from '../../assets/img/flags/hungarian.png'
import indonesianFlagIcon from '../../assets/img/flags/indonesian.png'
import italianFlagIcon from '../../assets/img/flags/italian.png'
import japaneseFlagIcon from '../../assets/img/flags/japanese.png'
import koreanFlagIcon from '../../assets/img/flags/korean.png'
import russianFlagIcon from '../../assets/img/flags/russian.png'
import slovakFlagIcon from '../../assets/img/flags/slovak.png'
import spanishFlagIcon from '../../assets/img/flags/spanish.png'
import {LANGUAGES} from '../../i18n/languages'
import {Button, StatusBar} from '../UiKit'
import LanguageListItem from './LanguageListItem'
import styles from './styles/LanguagePicker.style'

const messages = defineMessages({
  english: {
    id: 'components.common.languagepicker.english',
    defaultMessage: 'English',
  },
  japanese: {
    id: 'components.common.languagepicker.japanese',
    defaultMessage: '日本語',
  },
  korean: {
    id: 'components.common.languagepicker.korean',
    defaultMessage: '한국어',
  },
  russian: {
    id: 'components.common.languagepicker.russian',
    defaultMessage: 'Русский',
  },
  spanish: {
    id: 'components.common.languagepicker.spanish',
    defaultMessage: 'Español',
  },
  chinese: {
    id: 'components.common.languagepicker.chinese',
    defaultMessage: '简体中文',
  },
  indonesian: {
    id: 'components.common.languagepicker.indonesian',
    defaultMessage: 'Bahasa Indonesia',
  },
  brazilian: {
    id: 'components.common.languagepicker.brazilian',
    defaultMessage: 'Português brasileiro',
  },
  german: {
    id: 'components.common.languagepicker.german',
    defaultMessage: 'Deutsch',
  },
  french: {
    id: 'components.common.languagepicker.french',
    defaultMessage: 'Français',
  },
  italian: {
    id: 'components.common.languagepicker.italian',
    defaultMessage: 'Italiano',
  },
  dutch: {
    id: 'components.common.languagepicker.dutch',
    defaultMessage: 'Nederlands',
  },
  czech: {
    id: 'components.common.languagepicker.czech',
    defaultMessage: 'Čeština',
  },
  hungarian: {
    id: 'components.common.languagepicker.hungarian',
    defaultMessage: 'Magyar',
  },
  slovak: {
    id: 'components.common.languagepicker.slovak',
    defaultMessage: 'Slovenčina',
  },
  continueButton: {
    id: 'components.common.languagepicker.continueButton',
    defaultMessage: '!!!Choose language',
  },
  acknowledgement: {
    id: 'components.common.languagepicker.acknowledgement',
    defaultMessage:
      '!!!**The selected language translation is fully provided by the community**. ' +
      'EMURGO is grateful to all those who have contributed',
  },
  contributors: {
    id: 'components.common.languagepicker.contributors',
    defaultMessage: '_',
  },
})

const supportedLanguages = (intl) => {
  return [
    {
      label: intl.formatMessage(messages.english),
      code: LANGUAGES.ENGLISH,
      icon: englishFlagIcon,
    },
    {
      label: intl.formatMessage(messages.japanese),
      code: LANGUAGES.JAPANESE,
      icon: japaneseFlagIcon,
    },
    {
      label: intl.formatMessage(messages.korean),
      code: LANGUAGES.KOREAN,
      icon: koreanFlagIcon,
    },
    {
      label: intl.formatMessage(messages.russian),
      code: LANGUAGES.RUSSIAN,
      icon: russianFlagIcon,
    },
    {
      label: intl.formatMessage(messages.spanish),
      code: LANGUAGES.SPANISH,
      icon: spanishFlagIcon,
    },
    {
      label: intl.formatMessage(messages.chinese),
      code: LANGUAGES.CHINESE_SIMPLIFIED,
      icon: chineseFlagIcon,
    },
    {
      label: intl.formatMessage(messages.indonesian),
      code: LANGUAGES.INDONESIAN,
      icon: indonesianFlagIcon,
    },
    {
      label: intl.formatMessage(messages.brazilian),
      code: LANGUAGES.BRAZILIAN,
      icon: brazilianFlagIcon,
    },
    {
      label: intl.formatMessage(messages.german),
      code: LANGUAGES.GERMAN,
      icon: germanFlagIcon,
    },
    {
      label: intl.formatMessage(messages.french),
      code: LANGUAGES.FRENCH,
      icon: frenchFlagIcon,
    },
    {
      label: intl.formatMessage(messages.italian),
      code: LANGUAGES.ITALIAN,
      icon: italianFlagIcon,
    },
    {
      label: intl.formatMessage(messages.dutch),
      code: LANGUAGES.DUTCH,
      icon: dutchFlagIcon,
    },
    {
      label: intl.formatMessage(messages.czech),
      code: LANGUAGES.CZECH,
      icon: czechFlagIcon,
    },
    {
      label: intl.formatMessage(messages.hungarian),
      code: LANGUAGES.HUNGARIAN,
      icon: hungarianFlagIcon,
    },
    {
      label: intl.formatMessage(messages.slovak),
      code: LANGUAGES.SLOVAK,
      icon: slovakFlagIcon,
    },
    // TODO: Add back when chinese traditional is available
    // {
    //   label: languages.chineseTraditional,
    //   code: LANGUAGES.CHINESE_TRADITIONAL,
    //   icon: chineseFlagIcon,
    // },
  ]
}

type Props = {
  changeLanguage: (string) => any,
  handleContinue: () => mixed,
  languageCode: string,
  intl: IntlShape,
}

export const LanguagePicker = ({changeLanguage, languageCode, handleContinue, intl}: Props) => {
  return (
    <View style={styles.container}>
      <StatusBar type="light" />

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={supportedLanguages(intl)}
        keyExtractor={({code}) => code}
        extraData={languageCode}
        renderItem={({item: {label, code, icon}}) => (
          <LanguageListItem
            label={label}
            iconSource={icon}
            selectLanguage={changeLanguage}
            isSelected={languageCode === code}
            languageCode={code}
          />
        )}
      />

      {languageCode !== 'en-US' && languageCode !== 'ja-JP' && (
        <View style={styles.ackBlock}>
          {intl.formatMessage(messages.contributors) !== '_' ? (
            <Markdown>
              {`${intl.formatMessage(messages.acknowledgement)}: **${intl.formatMessage(messages.contributors)}**`}
            </Markdown>
          ) : (
            <Markdown>{`${intl.formatMessage(messages.acknowledgement)}.`}</Markdown>
          )}
        </View>
      )}

      <Button onPress={handleContinue} title={intl.formatMessage(messages.continueButton)} testID="chooseLangButton" />
    </View>
  )
}

export default injectIntl(LanguagePicker)
