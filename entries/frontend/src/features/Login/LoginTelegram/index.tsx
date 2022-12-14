import { FC, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@linaria/react';

import { useAuthApi } from 'frontend/shared/api';
import { useNavigateToSuccess } from 'frontend/shared/lib';
import { useSettings } from 'frontend/entities/settings';

interface ITelegramResponse {
  id: number;
  first_name: string;
  last_name: string;
}

type ITelegramWindow = Window &
  typeof globalThis & {
    onTelegramAuth: (user: ITelegramResponse) => void;
  };

type TTelegramMethod = 'loginTelegram' | 'linkTelegram';

interface IProps {
  method: TTelegramMethod;
  onSuccess?: () => void;
}

/**
 * Осуществляет вход через телеграм.
 */
export const LoginTelegram: FC<IProps> = ({ method, onSuccess }) => {
  const [send, , status] = useAuthApi(method);
  const { i18n } = useTranslation();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const settings = useSettings();

  useNavigateToSuccess(status);

  useEffect(() => {
    if (onSuccess && status === 'success') {
      onSuccess();
    }
  }, [onSuccess, status]);

  const handleTelegramResponse = useCallback(
    (user: ITelegramResponse) => {
      void send(user);
    },
    [send],
  );

  const onUnmount = useCallback(() => {
    if (!settings?.telegramBotName) {
      return;
    }

    const iFrame = document.querySelector(
      `#telegram-login-${settings.telegramBotName}`,
    );

    iFrame?.remove();
  }, [settings]);

  useEffect(() => {
    if (!settings?.telegramBotName) {
      return onUnmount;
    }

    const script = document.createElement('script');

    (window as ITelegramWindow).onTelegramAuth = handleTelegramResponse;

    script.src = 'https://telegram.org/js/telegram-widget.js?21';
    script.async = true;
    script.dataset.telegramLogin = settings.telegramBotName;
    script.dataset.size = 'size';
    script.dataset.onauth = 'onTelegramAuth(user)';
    script.dataset.requestAccess = 'write';
    script.dataset.userpic = 'false';
    script.dataset.radius = '0';
    script.dataset.lang = i18n.language;

    wrapperRef.current?.appendChild(script);

    return onUnmount;
  }, [handleTelegramResponse, i18n.language, onUnmount, settings]);

  return <SWrapper ref={wrapperRef} />;
};

const SWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background: #54a9eb;
  border-radius: 2px;
`;
