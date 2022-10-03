import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';

import { Head } from 'frontend/shared/ui';
import { Layout } from 'frontend/widgets/Layout';

const LoginSuccessPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Head title={t('login')} />
      <Card title={t('login')}>{t('loginSuccess')}</Card>
    </Layout>
  );
};

/**
 *
 */
export default LoginSuccessPage;
