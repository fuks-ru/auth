import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ConfirmEmail } from 'frontend/features/Confirm/ConfirmEmail';
import { Head } from 'frontend/shared/ui';
import { ConfirmPhone } from 'frontend/features/Confirm/ConfirmPhone';

interface IProps {
  data: { type: 'email' | 'phone'; value: string };
}

const ConfirmPage: FC<IProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head title={t('confirmation')} />
      {data.type === 'email' ? (
        <ConfirmEmail email={data.value} />
      ) : (
        <ConfirmPhone phone={data.value} />
      )}
    </>
  );
};

/**
 * Страница для отправки данных для активации пользователя по коду
 * подтверждения.
 */
export default ConfirmPage;
