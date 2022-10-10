import { Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { FC, useEffect } from 'react';

import { Head } from 'frontend/shared/ui';
import { useAuthApi } from 'frontend/shared/api';
import { Logout } from 'frontend/features/Logout';

const LoginSuccessPage: FC = () => {
  const { t } = useTranslation();
  const [getCurrentUser, user] = useAuthApi('authVerify');

  useEffect(() => {
    void getCurrentUser(null);
  }, [getCurrentUser]);

  return (
    <>
      <Head title={t('login')} />
      <Card title={t('login')}>
        <>
          <Typography.Paragraph>{t('loginSuccess')}</Typography.Paragraph>
          {user && <Logout user={user} />}
        </>
      </Card>
    </>
  );
};

/**
 * Страница завершения входа.
 */
export default LoginSuccessPage;
