import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Head } from 'frontend/shared/ui';
import { ChangePassword } from 'frontend/features/ChangePassword';

const ChangePasswordPage: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head title={t('changePassword')} />
      <ChangePassword />
    </>
  );
};

/**
 * Страница смены пароля.
 */
export default ChangePasswordPage;
