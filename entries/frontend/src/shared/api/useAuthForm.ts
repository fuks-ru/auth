import { TMethods, TApiArgs, TApiBody } from '@fuks-ru/auth-client';
import {
  SystemError,
  ValidationError,
  RedirectError,
  ForbiddenError,
  UnauthorizedError,
  AlreadyAuthError,
} from '@fuks-ru/common';
import { Form, FormInstance, message } from 'antd';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useExecuteRecaptcha, useNavigate } from 'frontend/shared/lib';
import { getApiMethod, TStatus } from 'frontend/shared/api/initAuthApi';
import { routes } from 'frontend/shared/config';

/**
 * Обертка над api-client сервиса авторизации, предоставляющая инстанс
 * antd-формы и callback onFinish.
 */
export const useAuthForm = <
  ApiName extends TMethods,
  Body extends TApiBody<ApiName>,
>(
  name: ApiName,
): [
  FormInstance<Body>,
  (body: Body, args?: TApiArgs<ApiName>) => Promise<void>,
  TStatus,
] => {
  const [form] = Form.useForm<Body>();

  const [status, setStatus] = useState<TStatus>('none');
  const executeRecaptcha = useExecuteRecaptcha();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onFinish = useCallback(
    async (body: Body, args?: TApiArgs<ApiName>) => {
      setStatus('pending');

      try {
        const apiMethod = getApiMethod(name);
        const token = await executeRecaptcha();

        await apiMethod(args || null, body, {
          headers: {
            recaptcha: token,
          },
        });

        setStatus('success');
      } catch (error) {
        form.setFields(
          Object.keys(body as Record<string, unknown>).map((name) => ({
            name,
            errors: undefined,
          })),
        );

        if (error instanceof ValidationError) {
          const { data } = error;

          form.setFields(
            Object.entries(data).map(([name, errors]) => ({ name, errors })),
          );

          void message.error(error.message);

          setStatus('failed');

          return;
        }

        if (error instanceof AlreadyAuthError) {
          navigate(routes.loginSuccess);

          return;
        }

        if (error instanceof RedirectError) {
          window.location.assign(error.data.location);

          return;
        }

        if (
          error instanceof ForbiddenError ||
          error instanceof UnauthorizedError
        ) {
          navigate(routes.login);

          return;
        }

        if (error instanceof SystemError) {
          void message.error(error.message);

          setStatus('failed');

          return;
        }

        void message.error(t('unknownError'));

        setStatus('failed');
      }
    },
    [name, executeRecaptcha, form, t, navigate],
  );

  return [form, onFinish, status];
};
