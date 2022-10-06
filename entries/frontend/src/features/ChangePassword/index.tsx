import { Button, Card, Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { FC, useEffect } from 'react';
import { css } from '@linaria/core';
import { useTranslation } from 'react-i18next';

import { useAuthForm } from 'frontend/shared/api';
import { useForgotPasswordCode } from 'frontend/features/ChangePassword/model/useForgotPasswordCode';
import { useNavigate } from 'frontend/shared/lib';
import { routes } from 'frontend/shared/config';

/**
 * Форма смены пароля.
 */
export const ChangePassword: FC = () => {
  const [form, onFinish, status] = useAuthForm('forgotPasswordChange');
  const { t } = useTranslation();
  const navigate = useNavigate();

  const forgotPasswordCode = useForgotPasswordCode();

  useEffect(() => {
    if (status === 'success') {
      navigate(routes.login);
    }
  }, [status, navigate]);

  return (
    <Card title={t('changePassword')}>
      <Form
        form={form}
        initialValues={{ forgotPasswordCode }}
        onFinish={onFinish}
      >
        <Form.Item name='forgotPasswordCode' hidden={true}>
          <Input />
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
          <Button
            type='primary'
            htmlType='submit'
            disabled={status === 'pending'}
          >
            {t('send')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

const opacityIcon = css`
  opacity: 0.3;
`;
