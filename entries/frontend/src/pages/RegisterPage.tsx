import { FC } from 'react';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

import { Head } from 'frontend/shared/ui/Head';
import { LoginGoogle } from 'frontend/features/LoginGoogle';
import { Register } from 'frontend/features/Register';
import { Layout } from 'frontend/widgets/Layout';

const RegisterPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Head title={t('registration')} />
      <Space direction='vertical'>
        <Register />
        <LoginGoogle />
      </Space>
    </Layout>
  );
};

/**
 * Страница регистрации.
 */
export default RegisterPage;
