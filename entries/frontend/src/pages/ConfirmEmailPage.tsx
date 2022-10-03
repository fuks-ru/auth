import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ConfirmEmail } from 'frontend/features/ConfirmEmail';
import { Head } from 'frontend/shared/ui';
import { Layout } from 'frontend/widgets/Layout';

interface IProps {
  email: string;
}

const ConfirmEmailPage: FC<IProps> = ({ email }) => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Head title={t('emailConfirmation')} />
      <ConfirmEmail email={email} />
    </Layout>
  );
};

/**
 * Страница для отправки данных для активации пользователя по коду
 * подтверждения.
 */
export default ConfirmEmailPage;
