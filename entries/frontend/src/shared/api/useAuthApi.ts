import {
  TMethods,
  TApiArgs,
  TApiBody,
  TApiResponse,
} from '@fuks-ru/auth-client';
import {
  ForbiddenError,
  RedirectError,
  SystemError,
  UnauthorizedError,
  ValidationError,
  AlreadyAuthError,
} from '@fuks-ru/common';
import { message } from 'antd';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getApiMethod, TStatus } from 'frontend/shared/api/initAuthApi';
import { useNavigate } from 'frontend/shared/lib';
import { routes } from 'frontend/shared/config';

/**
 * Получает метод, объект ответа и статус запроса из authApi.
 */
export const useAuthApi = <
  ApiName extends TMethods,
  Body extends TApiBody<ApiName>,
>(
  name: ApiName,
): [
  (body: Body, args?: TApiArgs<ApiName>) => Promise<void>,
  TApiResponse<ApiName> | undefined,
  TStatus,
] => {
  const [responseBody, setResponseBody] = useState<TApiResponse<ApiName>>();
  const [status, setStatus] = useState<TStatus>('none');
  const { t } = useTranslation();
  const navigate = useNavigate();

  const method = useCallback(
    async (body: Body, args?: TApiArgs<ApiName>) => {
      setStatus('pending');

      try {
        const apiMethod = getApiMethod(name);

        const apiResponse = await apiMethod(args || null, body);

        setResponseBody(apiResponse.data);

        setStatus('success');

        return;
      } catch (error) {
        if (error instanceof ValidationError || error instanceof SystemError) {
          void message.error(error.message);

          setStatus('failed');

          return;
        }

        if (error instanceof AlreadyAuthError) {
          navigate(routes.loginSuccess);

          return;
        }

        if (
          error instanceof ForbiddenError ||
          error instanceof UnauthorizedError
        ) {
          navigate(routes.login);

          return;
        }

        if (error instanceof RedirectError) {
          window.location.assign(error.data.location);

          return;
        }

        void message.error(t('unknownError'));

        setStatus('failed');
      }
    },
    [name, navigate, t],
  );

  return [method, responseBody, status];
};
