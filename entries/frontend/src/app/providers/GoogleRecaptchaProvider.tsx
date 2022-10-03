import { ComponentProps, FC, ReactNode, useMemo } from 'react';
import { GoogleReCaptchaProvider as GoogleReCaptchaProviderBase } from 'react-google-recaptcha-v3';
import { useTranslation } from 'react-i18next';

import { useTheme } from 'frontend/entities/theme';

interface IProps {
  children: ReactNode;
}

const badgeId = 'google-recaptcha';

/**
 * Провайдер для Google Recaptcha 3.
 */
export const GoogleRecaptchaProvider: FC<IProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();

  const container = useMemo<
    ComponentProps<typeof GoogleReCaptchaProviderBase>['container']
  >(
    () => ({
      element: badgeId,
      parameters: {
        theme,
        badge: 'bottomright',
      },
    }),
    [theme],
  );

  return (
    <GoogleReCaptchaProviderBase
      reCaptchaKey={process.env.GOOGLE_RECAPTCHA_CLIENT_KEY as string}
      language={i18n.language}
      container={container}
    >
      {children}
      <div id={badgeId} />
    </GoogleReCaptchaProviderBase>
  );
};
