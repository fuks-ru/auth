import { Schemas } from '@fuks-ru/auth-client';
import { Button, Form, Input } from 'antd';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuthForm } from 'frontend/shared/api';
import { useNavigate } from 'frontend/shared/lib';
import { routes } from 'frontend/shared/config';

interface IProps {
  user: Schemas.UserVerifyResponse;
}

/**
 * Осуществляет выход из системы.
 */
export const Logout: FC<IProps> = ({ user }) => {
  const [form, onFinish, status] = useAuthForm('logout');
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (status === 'success') {
      navigate(routes.login);
    }
  }, [navigate, status]);

  return (
    <Form form={form} onFinish={onFinish}>
      {user.email && (
        <Form.Item label={t('email')}>
          <Input value={user.email} readOnly={true} disabled={true} />
        </Form.Item>
      )}
      {user.phone && (
        <Form.Item label={t('phone')}>
          <Input value={user.phone} readOnly={true} disabled={true} />
        </Form.Item>
      )}
      {user.firstName && (
        <Form.Item label={t('firstName')}>
          <Input value={user.firstName} readOnly={true} disabled={true} />
        </Form.Item>
      )}
      {user.lastName && (
        <Form.Item label={t('lastName')}>
          <Input value={user.lastName} readOnly={true} disabled={true} />
        </Form.Item>
      )}
      <Form.Item label={t('role')}>
        <Input value={user.role} readOnly={true} disabled={true} />
      </Form.Item>
      <Form.Item noStyle={true}>
        <Button
          type='primary'
          htmlType='submit'
          disabled={status === 'pending'}
        >
          {t('logout')}
        </Button>
      </Form.Item>
    </Form>
  );
};
