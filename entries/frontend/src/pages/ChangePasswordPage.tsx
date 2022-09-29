import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Head } from 'frontend/shared/ui/Head';
import { Layout } from 'frontend/widgets/Layout';
import { ChangePassword } from 'frontend/features/ChangePassword';

const ChangePasswordPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Head title={t('changePassword')} />
      <ChangePassword />
    </Layout>
  );
};

/**
 * Страница смены пароля.
 */
export default ChangePasswordPage;
