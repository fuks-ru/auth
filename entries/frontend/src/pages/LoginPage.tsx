import { Card, Segmented, Space } from 'antd';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Head } from 'frontend/shared/ui';
import { LoginGoogle } from 'frontend/features/LoginGoogle';
import { LoginEmailPassword } from 'frontend/features/LoginEmailPassword';
import { useCheckAlreadyAuth } from 'frontend/shared/lib';
import { LoginPhonePassword } from 'frontend/features/LoginPhonePassword';
import { LoginTelegram } from 'frontend/features/LoginTelegram';

type TLoginType = 'phone' | 'email';

const LoginPage: FC = () => {
  const { t } = useTranslation();
  const [type, setType] = useState<TLoginType>('phone');

  useCheckAlreadyAuth();

  return (
    <Space direction='vertical'>
      <Head title={t('login')} />
      <Card title={t('login')}>
        <Space direction='vertical' size={16}>
          <Segmented
            value={type}
            onChange={(newType) => setType(newType as TLoginType)}
            options={[
              { label: t('byPhone'), value: 'phone' },
              { label: t('byEmail'), value: 'email' },
            ]}
          />
          {type === 'email' ? <LoginEmailPassword /> : <LoginPhonePassword />}
        </Space>
      </Card>
      <LoginGoogle />
      <LoginTelegram />
    </Space>
  );
};

/**
 * Страница авторизации.
 */
export default LoginPage;
