import { styled } from '@linaria/react';
import { Button, Card, Form, Space, Typography } from 'antd';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuthApi, useAuthForm } from 'frontend/shared/api';
import { useRedirectFrom } from 'frontend/entities/redirectFrom';
import { useDifferenceInterval } from 'frontend/shared/lib';

interface IProps {
  email: string;
}

/**
 * Компонент для повторной отправки кода подтверждения.
 */
export const ResendConfirmEmail: FC<IProps> = ({ email }) => {
  const [form, onFinish, status] = useAuthForm('registerResendConfirm');
  const { t } = useTranslation();
  const redirectFrom = useRedirectFrom();

  const { secondsToNextSend, isRunning } = useDifferenceInterval({ status });

  return (
    <Form
      form={form}
      initialValues={{ redirectFrom, email }}
      onFinish={onFinish}
    >
      <Form.Item>
        <Typography.Text>{t('confirmEmailSent')}</Typography.Text>
      </Form.Item>
      <Form.Item noStyle={true}>
        <Button
          disabled={isRunning || status === 'pending'}
          htmlType='submit'
        >
          {isRunning ? t('resendAfter', { secondsToNextSend }) : t('resend')}
        </Button>
      </Form.Item>
    </Form>
  );
};
