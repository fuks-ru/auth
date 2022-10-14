import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Head } from 'frontend/shared/ui';
import { ChangePasswordEmail } from 'frontend/features/ChangePasswordEmail';
import { ChangePasswordPhone } from 'frontend/features/ChangePasswordPhone';

interface IProps {
  data: { type: 'email' | 'phone'; value: string };
}

const ChangePasswordPage: FC<IProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head title={t('changePassword')} />
      {data.type === 'phone' ? (
        <ChangePasswordPhone phone={data.value} />
      ) : (
        <ChangePasswordEmail email={data.value} />
      )}
    </>
  );
};

/**
 * Страница смены пароля.
 */
export default ChangePasswordPage;
