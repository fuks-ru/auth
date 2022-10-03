import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Head } from 'frontend/shared/ui';
import { SendPasswordChange } from 'frontend/features/SendPasswordChange';

const ForgotPasswordPage: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head title={t('passwordRecovery')} />
      <SendPasswordChange />
    </>
  );
};

/**
 * Страница восстановления пароля.
 */
export default ForgotPasswordPage;
