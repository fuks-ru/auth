import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';

import { Head } from 'frontend/shared/ui';

const LoginSuccessPage: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head title={t('login')} />
      <Card title={t('login')}>{t('loginSuccess')}</Card>
    </>
  );
};

/**
 * Страница завершения входа.
 */
export default LoginSuccessPage;
