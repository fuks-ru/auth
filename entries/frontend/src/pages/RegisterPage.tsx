import { FC } from 'react';
import { Card, Segmented, Space } from 'antd';
import { useTranslation } from 'react-i18next';

import { Head } from 'frontend/shared/ui';
import { LoginGoogle } from 'frontend/features/Login/LoginGoogle';
import { EmailRegister } from 'frontend/features/Register/EmailRegister';
import { PhoneRegister } from 'frontend/features/Register/PhoneRegister';
import { LoginTelegram } from 'frontend/features/Login/LoginTelegram';
import { useLoginType } from 'frontend/entities/loginType';
import { TLoginType } from 'frontend/entities/loginType/model/LoginTypeContext';

interface IProps {
  onFinishEmail: (email: string) => void;
  onFinishPhone: (phone: string) => void;
  onSuccess: () => void;
}

const RegisterPage: FC<IProps> = ({
  onFinishEmail,
  onFinishPhone,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const { type, changeType, types } = useLoginType();

  return (
    <>
      <Head title={t('registration')} />
      <Space direction='vertical'>
        <Card title={t('registration')}>
          <Space direction='vertical' size={16}>
            <Segmented
              value={type}
              onChange={(newType) => changeType(newType as TLoginType)}
              options={types}
            />
            {type === 'email' ? (
              <EmailRegister
                onFinishEmail={onFinishEmail}
                onSuccess={onSuccess}
              />
            ) : (
              <PhoneRegister
                onFinishPhone={onFinishPhone}
                onSuccess={onSuccess}
              />
            )}
          </Space>
        </Card>
        <LoginGoogle />
        <LoginTelegram />
      </Space>
    </>
  );
};

/**
 * Страница регистрации.
 */
export default RegisterPage;
