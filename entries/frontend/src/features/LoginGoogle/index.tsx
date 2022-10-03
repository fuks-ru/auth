import { Form, message } from 'antd';
import { FC, useCallback } from 'react';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { css } from '@linaria/core';
import { useTranslation } from 'react-i18next';

import { useAuthForm } from 'frontend/shared/api';
import { useTheme } from 'frontend/entities/theme';
import { useRedirectFrom } from 'frontend/entities/redirectFrom';
import { useNavigateToSuccess } from 'frontend/shared/lib/useNavigateToSuccess';

/**
 * Страница авторизации.
 */
export const LoginGoogle: FC = () => {
  const redirectFrom = useRedirectFrom();
  const [form, onFinish, status] = useAuthForm('loginGoogle');
  const { t } = useTranslation();
  const { theme } = useTheme();

  useNavigateToSuccess(status);

  const handleGoogleResponse = useCallback(
    (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if (!('tokenId' in response)) {
        void message.error(t('googleApiResponseError'));

        return;
      }

      form.setFieldsValue({
        accessToken: response.tokenId,
      });

      form.submit();
    },
    [form, t],
  );

  return (
    <Form form={form} initialValues={{ redirectFrom }} onFinish={onFinish}>
      <Form.Item name='redirectFrom' hidden={true} />
      <Form.Item name='accessToken'>
        <GoogleLogin
          clientId={process.env.GOOGLE_AUTH_CLIENT_ID as string}
          buttonText={t('loginWithGoogle')}
          onSuccess={handleGoogleResponse}
          onFailure={handleGoogleResponse}
          cookiePolicy='single_host_origin'
          className={googleLogin}
          theme={theme}
        />
      </Form.Item>
    </Form>
  );
};

const googleLogin = css`
  width: 100%;
  font-family: inherit;
`;
