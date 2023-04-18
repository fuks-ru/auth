import { Button, Form, Input, Typography } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useSendEmailConfirmCodeForUnregisteredMutation,
  useSendEmailConfirmCodeForRegisteredMutation,
} from '@fuks-ru/auth-client';

import { useDifferenceInterval } from 'frontend/shared/lib';
import { useFormMutation } from '@fuks-ru/common-frontend';

/**
 * Методы для подтверждения email.
 */
export type TConfirmEmailMethods = 'confirmUser' | 'confirmContact';

interface IProps {
  email: string;
  method: TConfirmEmailMethods;
}

const useForm = (method: TConfirmEmailMethods) => {
  const confirmUnregistered = useFormMutation(
    useSendEmailConfirmCodeForUnregisteredMutation,
  );
  const confirmRegistered = useFormMutation(
    useSendEmailConfirmCodeForRegisteredMutation,
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
