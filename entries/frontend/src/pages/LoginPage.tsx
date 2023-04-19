import { Card, Segmented, Space } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthCheckNotQuery } from '@fuks-ru/auth-client';

import { Head } from 'frontend/shared/ui';
import { LoginGoogle } from 'frontend/features/Login/LoginGoogle';
import { LoginEmailPassword } from 'frontend/features/Login/LoginEmailPassword';
import { LoginPhonePassword } from 'frontend/features/Login/LoginPhonePassword';
import { LoginTelegram } from 'frontend/features/Login/LoginTelegram';
import { useLoginType } from 'frontend/entities/loginType';
import { TLoginType } from 'frontend/entities/loginType/model/LoginTypeContext';

const LoginPage: FC = () => {
  const { t } = useTranslation();
  const { type, changeType, types } = useLoginType();

  useAuthCheckNotQuery();

  return (
    <Space direction='vertical'>
      <Head title={t('login')} />
      <Card title={t('login')}>
        <Space direction='vertical' size={16}>
          <Segmented
            value={type}
            onChange={(newType) => changeType(newType as TLoginType)}
            options={types}
          />
          {type === 'email' ? <LoginEmailPassword /> : <LoginPhonePassword />}
        </Space>
      </Card>
      <LoginGoogle />
      <LoginTelegram method='loginTelegram' />
    </Space>
  );
};

/**
 * Страница авторизации.
 */
export default LoginPage;
