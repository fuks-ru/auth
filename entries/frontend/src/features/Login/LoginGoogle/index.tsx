import { message } from 'antd';
import { FC, useCallback } from 'react';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { css } from '@linaria/core';
import { useTranslation } from 'react-i18next';
import { useLoginGoogleMutation } from '@fuks-ru/auth-client/rtk';

import { useTheme } from 'frontend/entities/theme';
import { useNavigateToSuccess } from 'frontend/shared/lib';

/**
 * Страница авторизации.
 */
export const LoginGoogle: FC = () => {
  const [send, { status }] = useLoginGoogleMutation();
  const { t } = useTranslation();
  const { theme } = useTheme();

  useNavigateToSuccess(status);

  const handleGoogleResponse = useCallback(
    (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if (!('tokenId' in response)) {
        void message.error(t('googleApiResponseError'));

        return;
      }

      void send({
        accessToken: response.tokenId,
      });
    },
    [send, t],
  );

  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_AUTH_CLIENT_ID as string}
      buttonText={t('loginWithGoogle')}
      onSuccess={handleGoogleResponse}
      onFailure={handleGoogleResponse}
      cookiePolicy='single_host_origin'
      className={googleLogin}
      theme={theme}
    />
  );
};

const googleLogin = css`
  width: 100%;
  font-family: inherit;
  display: flex;
  justify-content: center;
  border: 1px solid var(--border-color) !important;
  box-shadow: none !important;

  > div {
    display: flex;
    align-items: center;
  }

  > span {
    padding-right: 16px;
  }
`;
