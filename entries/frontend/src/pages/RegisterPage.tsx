import { FC } from 'react';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

import { Head } from 'frontend/shared/ui';
import { LoginGoogle } from 'frontend/features/LoginGoogle';
import { Register } from 'frontend/features/Register';

interface IProps {
  onFinishEmail: (email: string) => void;
  onSuccess: () => void;
}

const RegisterPage: FC<IProps> = ({ onFinishEmail, onSuccess }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head title={t('registration')} />
      <Space direction='vertical'>
        <Register onFinishEmail={onFinishEmail} onSuccess={onSuccess} />
        <LoginGoogle />
      </Space>
    </>
  );
};

/**
 * Страница регистрации.
 */
export default RegisterPage;
