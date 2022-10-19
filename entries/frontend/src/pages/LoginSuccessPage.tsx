import { Button, Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import Icon from '@ant-design/icons';
import { styled } from '@linaria/react';

import { Head } from 'frontend/shared/ui';
import { useAuthApi } from 'frontend/shared/api';
import { Logout } from 'frontend/features/Logout';
import { SendEmailConfirmCode } from 'frontend/features/SendConfirmCode/SendEmailConfirmCode';
import { SendPhoneConfirmCode } from 'frontend/features/SendConfirmCode/SendPhoneConfirmCode';
import { UpdateName } from 'frontend/features/UpdateName';
import { TelegramIcon } from 'frontend/shared/ui/TelegramIcon';
import { LoginTelegram } from 'frontend/features/Login/LoginTelegram';

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
  const [isLinkTelegram, setIsLinkTelegram] = useState(false);

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

              {!isLinkTelegram && (
                <STelegramLinkWrapper>
                  <Button
                    icon={<Icon component={TelegramIcon} />}
                    onClick={() => setIsLinkTelegram(true)}
                    disabled={!!user.telegramId}
                    block={true}
                  >
                    {!user.telegramId ? t('linkTelegram') : t('telegramLinked')}
                  </Button>
                </STelegramLinkWrapper>
              )}

              {isLinkTelegram && (
                <STelegramLinkWrapper>
                  <LoginTelegram
                    method='linkTelegram'
                    onSuccess={() => setIsLinkTelegram(false)}
                  />
                </STelegramLinkWrapper>
              )}

              <UpdateName user={user} />

              <Logout />
            </>
          )}
        </>
      </Card>
    </>
  );
};

const STelegramLinkWrapper = styled.div`
  margin-bottom: 24px;
`;

/**
 * Страница завершения входа.
 */
export default LoginSuccessPage;
