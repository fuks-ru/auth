import { Button, Form, Input, Typography } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { css } from '@linaria/core';
import { Trans, useTranslation } from 'react-i18next';

import { useAuthForm } from 'frontend/shared/api';
import { Link } from 'frontend/shared/ui';
import { routes } from 'frontend/shared/config';
import { useNavigateToSuccess } from 'frontend/shared/lib';

/**
 * Форма входа.
 */
export const LoginEmailPassword: FC = () => {
  const [form, onFinish, status] = useAuthForm('loginEmail');
  const { t } = useTranslation();

  useNavigateToSuccess(status);

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name='email'>
        <Input
          prefix={<MailOutlined className={opacityIcon} />}
          placeholder={t('email')}
        />
      </Form.Item>
      <Form.Item name='password'>
        <Input
          prefix={<LockOutlined className={opacityIcon} />}
          type='password'
          placeholder={t('password')}
        />
      </Form.Item>
      <Form.Item>
        <Trans t={t} i18nKey='loginOrRegister'>
          <Button
            type='primary'
            htmlType='submit'
            disabled={status === 'pending'}
          >
            Login
          </Button>
          or
          <Link route={routes.registration}>registration</Link>
        </Trans>
      </Form.Item>
      <Form.Item noStyle={true}>
        <Typography.Text>
          <Link route={routes.changePassword}>{t('forgotPassword')}</Link>
        </Typography.Text>
      </Form.Item>
    </Form>
  );
};

const opacityIcon = css`
  opacity: 0.3;
`;
