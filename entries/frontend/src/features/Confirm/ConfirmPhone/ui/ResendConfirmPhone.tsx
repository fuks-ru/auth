import { Button, Form, Input, Typography } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useSendPhoneConfirmCodeForUnregisteredMutation,
  useSendPhoneConfirmCodeForRegisteredMutation,
} from '@fuks-ru/auth-client';

import { useDifferenceInterval } from 'frontend/shared/lib';
import { useFormMutation } from '@fuks-ru/common-frontend';

/**
 * Методы для подтверждения телефона.
 */
export type TConfirmPhoneMethods = 'confirmUser' | 'confirmContact';

interface IProps {
  phone: string;
  method: TConfirmPhoneMethods;
}

const useForm = (method: TConfirmPhoneMethods) => {
  const confirmUnregistered = useFormMutation(
    useSendPhoneConfirmCodeForUnregisteredMutation,
  );
  const confirmRegistered = useFormMutation(
    useSendPhoneConfirmCodeForRegisteredMutation,
  );

  return method === 'confirmUser' ? confirmUnregistered : confirmRegistered;
};

/**
 * Компонент для повторной отправки кода подтверждения.
 */
export const ResendConfirmPhone: FC<IProps> = ({ phone, method }) => {
  const [onFinish, { form, status }] = useForm(method);
  const { t } = useTranslation();

  const { secondsToNextSend, isRunning } = useDifferenceInterval({ status });

  return (
    <Form form={form} initialValues={{ phone }} onFinish={onFinish}>
      <Form.Item hidden={true} name='phone'>
        <Input />
      </Form.Item>
      <Form.Item>
        <Typography.Text>{t('confirmPhoneSent', { phone })}</Typography.Text>
      </Form.Item>
      <Form.Item noStyle={true}>
        <Button disabled={isRunning || status === 'pending'} htmlType='submit'>
          {isRunning ? t('resendAfter', { secondsToNextSend }) : t('resend')}
        </Button>
      </Form.Item>
    </Form>
  );
};
