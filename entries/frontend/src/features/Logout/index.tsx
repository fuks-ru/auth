import { Schemas } from '@fuks-ru/auth-client';
import { Button, Form } from 'antd';
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
      <Form.Item>{t('userInfo', user)}</Form.Item>
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
