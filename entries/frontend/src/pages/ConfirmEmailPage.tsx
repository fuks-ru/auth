import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ConfirmEmail } from 'frontend/features/ConfirmEmail';
import { Head } from 'frontend/shared/ui';

interface IProps {
  email: string;
}

const ConfirmEmailPage: FC<IProps> = ({ email }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head title={t('emailConfirmation')} />
      <ConfirmEmail email={email} />
    </>
  );
};

/**
 * Страница для отправки данных для активации пользователя по коду
 * подтверждения.
 */
export default ConfirmEmailPage;
