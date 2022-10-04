import { FC } from 'react';
import { Segmented } from 'antd';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
import extractDomain from 'extract-domain';

/**
 * Компонент для смены текущего языка.
 */
export const LocaleSwitch: FC = () => {
  const { i18n } = useTranslation();

  return (
    <Segmented
      options={[
        { label: 'en', value: 'en-US' },
        { label: 'ru', value: 'ru-RU' },
      ]}
      defaultValue={i18n.language}
      onChange={(value) => {
        cookies.set('i18next', value as string, {
          expires: 365,
          path: '/',
          domain: extractDomain(window.location.hostname),
        });

        void i18n.changeLanguage(value as string);
      }}
    />
  );
};
