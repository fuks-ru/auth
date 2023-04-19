import { Button, Form, Input, Typography } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useSendEmailConfirmCodeForUnregisteredMutation,
  useSendEmailConfirmCodeForRegisteredMutation,
} from '@fuks-ru/auth-client';

import { useDifferenceInterval } from 'frontend/shared/lib';
import { useFormMutationWithRecaptcha } from 'frontend/shared/api/useFormMutationWithRecaptcha';

/**
 * Методы для подтверждения email.
 */
export type TConfirmEmailMethods = 'confirmUser' | 'confirmContact';

interface IProps {
  email: string;
  method: TConfirmEmailMethods;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useForm = (method: TConfirmEmailMethods) => {
  const confirmUnregistered = useFormMutationWithRecaptcha(
    useSendEmailConfirmCodeForUnregisteredMutation,
    { bodyKey: 'sendConfirmEmailRequest' },
  );
  const confirmRegistered = useFormMutationWithRecaptcha(
    useSendEmailConfirmCodeForRegisteredMutation,
    { bodyKey: 'sendConfirmEmailRequest' },
  );

  return method === 'confirmUser' ? confirmUnregistered : confirmRegistered;
};

/**
 * Компонент для повторной отправки кода подтверждения.
 */
export const ResendConfirmEmail: FC<IProps> = ({ email, method }) => {
  const [onFinish, { form, status }] = useForm(method);
  const { t } = useTranslation();

  const { secondsToNextSend, isRunning } = useDifferenceInterval({ status });

  return (
    <Form form={form} initialValues={{ email }} onFinish={onFinish}>
      <Form.Item hidden={true} name='email'>
        <Input />
      </Form.Item>
      <Form.Item>
        <Typography.Text>{t('confirmEmailSent', { email })}</Typography.Text>
      </Form.Item>
      <Form.Item noStyle={true}>
        <Button disabled={isRunning || status === 'pending'} htmlType='submit'>
          {isRunning ? t('resendAfter', { secondsToNextSend }) : t('resend')}
        </Button>
      </Form.Item>
    </Form>
  );
};
