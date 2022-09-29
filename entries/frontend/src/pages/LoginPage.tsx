import { Space } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Head } from 'frontend/shared/ui/Head';
import { LoginGoogle } from 'frontend/features/LoginGoogle';
import { LoginEmailPassword } from 'frontend/features/LoginEmailPassword';
import { Layout } from 'frontend/widgets/Layout';

const LoginPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Space direction='vertical'>
        <Head title={t('login')} />
        <LoginEmailPassword />
        <LoginGoogle />
      </Space>
    </Layout>
  );
};

/**
 * Страница авторизации.
 */
export default LoginPage;
