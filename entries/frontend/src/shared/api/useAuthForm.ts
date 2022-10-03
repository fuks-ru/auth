import { TMethods, TApiArgs, TApiBody } from '@fuks-ru/auth-backend';
import { SystemError, ValidationError, RedirectError } from '@fuks-ru/common';
import { Form, FormInstance, message } from 'antd';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useExecuteRecaptcha } from 'frontend/shared/lib';
import { getApiMethod, TStatus } from 'frontend/shared/api/initAuthApi';

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

          await message.error(error.message);

          setStatus('failed');

          return;
        }

        if (error instanceof RedirectError) {
          window.location.assign(error.data.location);

          return;
        }

        if (error instanceof SystemError) {
          await message.error(error.message);

          setStatus('failed');

          return;
        }

        await message.error(t('unknownError'));

        setStatus('failed');
      }
    },
    [name, executeRecaptcha, form, t],
  );

  return [form, onFinish, status];
};
