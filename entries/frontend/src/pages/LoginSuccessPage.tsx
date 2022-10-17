import { Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { FC, useEffect } from 'react';

import { Head } from 'frontend/shared/ui';
import { useAuthApi } from 'frontend/shared/api';
import { Logout } from 'frontend/features/Logout';
import { SendEmailConfirmCode } from 'frontend/features/SendConfirmCode/SendEmailConfirmCode';
import { SendPhoneConfirmCode } from 'frontend/features/SendConfirmCode/SendPhoneConfirmCode';
import { UpdateName } from 'frontend/features/UpdateName';

interface IProps {
  onFinishEmail: (email: string) => void;
  onFinishPhone: (phone: string) => void;
  onSuccess: () => void;
}

const LoginSuccessPage: FC<IProps> = ({
  onFinishEmail,
  onFinishPhone,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const [getCurrentUser, user] = useAuthApi('authVerify');

  useEffect(() => {
    void getCurrentUser(null);
  }, [getCurrentUser]);

  return (
    <>
      <Head title={t('login')} />
      <Card title={t('login')}>
        <>
          <Typography.Paragraph>
            {t('loginSuccess')}. {t('role')}: <b>{user?.role}</b>
          </Typography.Paragraph>
          {user && (
            <>
              <SendEmailConfirmCode
                onFinishEmail={onFinishEmail}
                onSuccess={onSuccess}
                initialValue={user.email}
              />

              <SendPhoneConfirmCode
                onFinishPhone={onFinishPhone}
                onSuccess={onSuccess}
                initialValue={user.phone}
              />

              <UpdateName user={user} />

              <Logout />
            </>
          )}
        </>
      </Card>
    </>
  );
};

/**
 * Страница завершения входа.
 */
export default LoginSuccessPage;
