import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Head } from 'frontend/shared/ui';
import { Layout } from 'frontend/widgets/Layout';
import { SendPasswordChange } from 'frontend/features/SendPasswordChange';

const ForgotPasswordPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Head title={t('passwordRecovery')} />
      <SendPasswordChange />
    </Layout>
  );
};

/**
 * Страница восстановления пароля.
 */
export default ForgotPasswordPage;
