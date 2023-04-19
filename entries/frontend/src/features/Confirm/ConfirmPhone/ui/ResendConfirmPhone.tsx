import { Button, Form, Input, Typography } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useSendPhoneConfirmCodeForUnregisteredMutation,
  useSendPhoneConfirmCodeForRegisteredMutation,
} from '@fuks-ru/auth-client';

import { useFormMutationWithRecaptcha } from 'frontend/shared/api/useFormMutationWithRecaptcha';
import { useDifferenceInterval } from 'frontend/shared/lib';

/**
 * Методы для подтверждения телефона.
 */
export type TConfirmPhoneMethods = 'confirmUser' | 'confirmContact';

interface IProps {
  phone: string;
  method: TConfirmPhoneMethods;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useForm = (method: TConfirmPhoneMethods) => {
  const confirmUnregistered = useFormMutationWithRecaptcha(
    useSendPhoneConfirmCodeForUnregisteredMutation,
    { bodyKey: 'sendConfirmPhoneRequest' },
  );
  const confirmRegistered = useFormMutationWithRecaptcha(
    useSendPhoneConfirmCodeForRegisteredMutation,
    { bodyKey: 'sendConfirmPhoneRequest' },
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
