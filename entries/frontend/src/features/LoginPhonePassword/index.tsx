import { Button, Form, Input, Typography } from 'antd';
import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { FC, SyntheticEvent } from 'react';
import { css } from '@linaria/core';
import { Trans, useTranslation } from 'react-i18next';
import { MaskedInput } from 'antd-mask-input';

import { useAuthForm } from 'frontend/shared/api';
import { Link } from 'frontend/shared/ui';
import { routes } from 'frontend/shared/config';
import { useNavigateToSuccess } from 'frontend/shared/lib';

/**
 * Форма входа.
 */
export const LoginPhonePassword: FC = () => {
  const [form, onFinish, status] = useAuthForm('loginPhone');
  const { t } = useTranslation();

  useNavigateToSuccess(status);

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        name='phone'
        getValueFromEvent={(
          e: SyntheticEvent & { maskedValue: string; unmaskedValue: string },
        ) => e.unmaskedValue}
      >
        <MaskedInput
          mask='+{7} (000) 000-00-00'
          placeholder={t('phone')}
          prefix={<PhoneOutlined className={opacityIcon} />}
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
          <Link route={routes.forgotPassword}>{t('forgotPassword')}</Link>
        </Typography.Text>
      </Form.Item>
    </Form>
  );
};

const opacityIcon = css`
  opacity: 0.3;
`;
