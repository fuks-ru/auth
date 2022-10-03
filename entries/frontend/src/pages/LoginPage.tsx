import { Space } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Head } from 'frontend/shared/ui';
import { LoginGoogle } from 'frontend/features/LoginGoogle';
import { LoginEmailPassword } from 'frontend/features/LoginEmailPassword';

const LoginPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Space direction='vertical'>
      <Head title={t('login')} />
      <LoginEmailPassword />
      <LoginGoogle />
    </Space>
  );
};

/**
 * Страница авторизации.
 */
export default LoginPage;
