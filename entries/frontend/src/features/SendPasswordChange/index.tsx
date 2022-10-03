import { FC, useState } from 'react';
import { Button, Card, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { css } from '@linaria/core';
import { Trans, useTranslation } from 'react-i18next';

import { useAuthForm } from 'frontend/shared/api';
import { useRedirectFrom } from 'frontend/entities/redirectFrom';
import { ResendForgotPassword } from 'frontend/features/SendPasswordChange/ui/ResendForgotPassword';
import { Link } from 'frontend/shared/ui';
import { routes } from 'frontend/shared/config';

/**
 * Форма восстановления пароля.
 */
export const SendPasswordChange: FC = () => {
  const [form, onFinish, status] = useAuthForm('forgotPasswordSend');
  const [email, setEmail] = useState<string>();
  const redirectFrom = useRedirectFrom();
  const { t } = useTranslation();

  if (status === 'success' && email) {
    return <ResendForgotPassword email={email} />;
  }

  return (
    <Card title={t('passwordRecovery')}>
      <Form
        form={form}
        initialValues={{ redirectFrom }}
        onFinish={async (body) => {
          await onFinish(body);

          setEmail(body.email);
        }}
      >
        <Form.Item name='redirectFrom' noStyle={true} />
        <Form.Item name='email'>
          <Input
            prefix={<UserOutlined className={opacityIcon} />}
            placeholder={t('email')}
          />
        </Form.Item>
        <Form.Item noStyle={true}>
          <Trans t={t} i18nKey='sendOrLogin'>
            <Button
              type='primary'
              htmlType='submit'
              disabled={status === 'pending'}
            >
              Send
            </Button>
            or<Link route={routes.login}>login</Link>
          </Trans>
        </Form.Item>
      </Form>
    </Card>
  );
};

const opacityIcon = css`
  opacity: 0.3;
`;
