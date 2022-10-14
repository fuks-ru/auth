import { Button, Form, Typography } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Input from 'antd/lib/input/Input';

import { useAuthForm } from 'frontend/shared/api';
import { useDifferenceInterval } from 'frontend/shared/lib';

interface IProps {
  email: string;
}

/**
 * Компонент для повторной отправки сообщения для смены пароля.
 */
export const ResendForgotPassword: FC<IProps> = ({ email }) => {
  const [form, onFinish, status] = useAuthForm('forgotPasswordSendEmail');
  const { t } = useTranslation();

  const { secondsToNextSend, isRunning } = useDifferenceInterval({ status });

  return (
    <Form form={form} initialValues={{ email }} onFinish={onFinish}>
      <Form.Item hidden={true} name='email'>
        <Input />
      </Form.Item>
      <Form.Item>
        <Typography.Text>
          {t('changePasswordEmailSent', { email })}
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
