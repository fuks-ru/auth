import { FC, useState } from 'react';
import { Card, Segmented, Space } from 'antd';
import { useTranslation } from 'react-i18next';

import { Head } from 'frontend/shared/ui';
import { LoginGoogle } from 'frontend/features/LoginGoogle';
import { EmailRegister } from 'frontend/features/EmailRegister';
import { PhoneRegister } from 'frontend/features/PhoneRegister';

interface IProps {
  onFinishEmail: (email: string) => void;
  onFinishPhone: (phone: string) => void;
  onSuccess: () => void;
}

type TRegisterType = 'phone' | 'email';

const RegisterPage: FC<IProps> = ({
  onFinishEmail,
  onFinishPhone,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const [type, setType] = useState<TRegisterType>('phone');

  return (
    <>
      <Head title={t('registration')} />
      <Space direction='vertical'>
        <Card title={t('registration')}>
          <Space direction='vertical' size={16}>
            <Segmented
              value={type}
              onChange={(newType) => setType(newType as TRegisterType)}
              options={[
                { label: t('byPhone'), value: 'phone' },
                { label: t('byEmail'), value: 'email' },
              ]}
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
      </Space>
    </>
  );
};

/**
 * Страница регистрации.
 */
export default RegisterPage;
