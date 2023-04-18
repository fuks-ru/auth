import { Button, Form, Typography } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Input from 'antd/lib/input/Input';
import { useSendForgotPasswordCodePhoneMutation } from '@fuks-ru/auth-client';

import { useDifferenceInterval } from 'frontend/shared/lib';
import { useFormMutation } from '@fuks-ru/common-frontend';

interface IProps {
  phone: string;
}

/**
 * Компонент для повторной отправки сообщения для смены пароля.
 */
export const ResendForgotPassword: FC<IProps> = ({ phone }) => {
  const [onFinish, { form, status }] = useFormMutation(
    useSendForgotPasswordCodePhoneMutation,
  );
  const { t } = useTranslation();

  const { secondsToNextSend, isRunning } = useDifferenceInterval({ status });

  return (
    <Form form={form} initialValues={{ phone }} onFinish={onFinish}>
      <Form.Item hidden={true} name='phone'>
        <Input />
      </Form.Item>
      <Form.Item>
        <Typography.Text>
          {t('changePasswordPhoneSent', { phone })}
        </Typography.Text>
      </Form.Item>
      <Form.Item noStyle={true}>
        <Button htmlType='submit' disabled={isRunning || status === 'pending'}>
          {isRunning ? t('resendAfter', { secondsToNextSend }) : t('resend')}
        </Button>
      </Form.Item>
    </Form>
  );
};
