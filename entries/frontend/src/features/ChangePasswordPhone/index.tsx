import { Button, Card, Form, Input, Space } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { FC, useEffect } from 'react';
import { css } from '@linaria/core';
import { useTranslation } from 'react-i18next';

import { useAuthForm } from 'frontend/shared/api';
import { useNavigate } from 'frontend/shared/lib';
import { routes } from 'frontend/shared/config';
import { ResendForgotPassword } from 'frontend/features/ChangePasswordPhone/ui/ResendForgotPassword';

interface IProps {
  phone: string;
}

/**
 * Форма смены пароля.
 */
export const ChangePasswordPhone: FC<IProps> = ({ phone }) => {
  const [form, onFinish, status] = useAuthForm('changePasswordEmail');
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'success') {
      navigate(routes.login);
    }
  }, [status, navigate]);

  return (
    <Card title={t('changePassword')}>
      <Space direction='vertical' size={32}>
        <ResendForgotPassword phone={phone} />

        <Form form={form} initialValues={{ phone }} onFinish={onFinish}>
          <Form.Item name='phone' hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item name='forgotPasswordCode'>
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
      </Space>
    </Card>
  );
};

const opacityIcon = css`
  opacity: 0.3;
`;
