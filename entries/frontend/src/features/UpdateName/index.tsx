import { FC } from 'react';
import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { Schemas } from '@fuks-ru/auth-client';
import { UserOutlined } from '@ant-design/icons';
import { css } from '@linaria/core';

import { useAuthForm } from 'frontend/shared/api';

interface IProps {
  user: Schemas.UserVerifyResponse;
}

/**
 * Обновляет фамилию и имя.
 */
export const UpdateName: FC<IProps> = ({ user }) => {
  const [form, onFinish, status] = useAuthForm('userUpdateName');
  const { t } = useTranslation();

  return (
    <Form form={form} onFinish={onFinish} initialValues={user}>
      <Form.Item name='firstName'>
        <Input
          prefix={<UserOutlined className={opacityIcon} />}
          placeholder={t('firstName')}
        />
      </Form.Item>
      <Form.Item name='lastName'>
        <Input
          prefix={<UserOutlined className={opacityIcon} />}
          placeholder={t('lastName')}
        />
      </Form.Item>
      <Form.Item noStyle={true}>
        <Button
          type='primary'
          htmlType='submit'
          className='login-form-button'
          disabled={status === 'pending'}
        >
          {t('save')}
        </Button>
      </Form.Item>
    </Form>
  );
};

const opacityIcon = css`
  opacity: 0.3;
`;
