import { Button, Card, Form, Input, Space } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { FC, useEffect } from 'react';
import { css } from '@linaria/core';
import { useTranslation } from 'react-i18next';
import { styled } from '@linaria/react';
import { useChangePasswordEmailMutation } from '@fuks-ru/auth-client';
import { QueryStatus } from '@reduxjs/toolkit/query';

import { useNavigate } from 'frontend/shared/lib';
import { routes } from 'frontend/shared/config';
import { ResendForgotPassword } from 'frontend/features/ChangePassword/ChangePasswordEmail/ui/ResendForgotPassword';
import { useFormMutationWithRecaptcha } from 'frontend/shared/api/useFormMutationWithRecaptcha';

interface IProps {
  email: string;
}

/**
 * Форма смены пароля.
 */
export const ChangePasswordEmail: FC<IProps> = ({ email }) => {
  const [onFinish, { form, status }] = useFormMutationWithRecaptcha(
    useChangePasswordEmailMutation,
    { bodyKey: 'changePasswordRequest' },
  );
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === QueryStatus.fulfilled) {
      navigate(routes.login);
    }
  }, [status, navigate]);

  return (
    <SCard title={t('changePassword')}>
      <Space direction='vertical' size={32}>
        <ResendForgotPassword email={email} />

        <Form form={form} initialValues={{ email }} onFinish={onFinish}>
          <Form.Item name='email' hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item name='forgotPasswordCode'>
            <Input placeholder={t('code')} />
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
    </SCard>
  );
};

const SCard = styled(Card)`
  max-width: 400px;
`;

const opacityIcon = css`
  opacity: 0.3;
`;
