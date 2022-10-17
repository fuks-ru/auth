import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { css } from '@linaria/core';
import { Button, Form, Input } from 'antd';
import { FC, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { useAuthForm } from 'frontend/shared/api';
import { Link } from 'frontend/shared/ui';
import { routes } from 'frontend/shared/config';

interface IProps {
  onFinishEmail: (email: string) => void;
  onSuccess: () => void;
}

/**
 * Форма регистрации.
 */
export const EmailRegister: FC<IProps> = ({ onFinishEmail, onSuccess }) => {
  const [form, onFinish, status] = useAuthForm('registerEmail');
  const { t } = useTranslation();

  useEffect(() => {
    if (status === 'success') {
      onSuccess();
    }
  }, [onSuccess, status]);

  return (
    <Form
      form={form}
      onFinish={async (body) => {
        await onFinish(body);

        onFinishEmail(body.email);
      }}
    >
      <Form.Item name='email'>
        <Input
          placeholder={t('email')}
          prefix={<MailOutlined className={opacityIcon} />}
        />
      </Form.Item>
      <Form.Item name='password'>
        <Input
          type='password'
          placeholder={t('password')}
          prefix={<LockOutlined className={opacityIcon} />}
        />
      </Form.Item>
      <Form.Item name='repeatPassword'>
        <Input
          type='password'
          placeholder={t('repeatPassword')}
          prefix={<LockOutlined className={opacityIcon} />}
        />
      </Form.Item>
      <Form.Item noStyle={true}>
        <Trans t={t} i18nKey='registerOrLogin'>
          <Button
            type='primary'
            htmlType='submit'
            disabled={status === 'pending'}
          >
            Register
          </Button>
          or<Link route={routes.login}>login</Link>
        </Trans>
      </Form.Item>
    </Form>
  );
};

const opacityIcon = css`
  opacity: 0.3;
`;
