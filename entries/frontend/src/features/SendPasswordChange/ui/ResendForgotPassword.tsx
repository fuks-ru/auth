import { styled } from '@linaria/react';
import { Button, Card, Form, Input, Typography } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuthForm } from 'frontend/shared/api';
import { useRedirectFrom } from 'frontend/entities/redirectFrom';
import { useDifferenceInterval } from 'frontend/shared/lib';

interface IProps {
  email: string;
}

/**
 * Компонент для повторной отправки сообщения для смены пароля.
 */
export const ResendForgotPassword: FC<IProps> = ({ email }) => {
  const [form, onFinish, status] = useAuthForm('forgotPasswordSend');
  const { t } = useTranslation();
  const redirectFrom = useRedirectFrom();

  const { secondsToNextSend, isRunning } = useDifferenceInterval({ status });

  return (
    <SCard title={t('passwordRecovery')}>
      <Form
        form={form}
        initialValues={{ email, redirectFrom }}
        onFinish={onFinish}
      >
        <Form.Item hidden={true} name='email'>
          <Input />
        </Form.Item>
        <Form.Item hidden={true} name='redirectFrom'>
          <Input />
        </Form.Item>
        <Form.Item>
          <Typography.Text>{t('changePasswordEmailSent')}</Typography.Text>
        </Form.Item>
        <Form.Item noStyle={true}>
          <Button
            htmlType='submit'
            disabled={isRunning || status === 'pending'}
          >
            {isRunning ? t('resendAfter', { secondsToNextSend }) : t('resend')}
          </Button>
        </Form.Item>
      </Form>
    </SCard>
  );
};

const SCard = styled(Card)`
  max-width: 400px;
`;
