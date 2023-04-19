import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { css } from '@linaria/core';
import { Button, Form, Input } from 'antd';
import { FC, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { MaskedInput } from 'antd-mask-input';
import { useRegisterPhoneMutation } from '@fuks-ru/auth-client';
import { QueryStatus } from '@reduxjs/toolkit/query';

import { Link } from 'frontend/shared/ui';
import { routes } from 'frontend/shared/config';
import { getValueFromMaskedInput } from 'frontend/shared/lib';
import { useFormMutationWithRecaptcha } from 'frontend/shared/api/useFormMutationWithRecaptcha';

interface IProps {
  onFinishPhone: (phone: string) => void;
  onSuccess: () => void;
}

/**
 * Форма регистрации.
 */
export const PhoneRegister: FC<IProps> = ({ onFinishPhone, onSuccess }) => {
  const [onFinish, { form, status }] = useFormMutationWithRecaptcha(
    useRegisterPhoneMutation,
    { bodyKey: 'phoneRegisterRequest' },
  );
  const { t } = useTranslation();

  useEffect(() => {
    if (status === QueryStatus.fulfilled) {
      onSuccess();
    }
  }, [onSuccess, status]);

  return (
    <Form
      form={form}
      onFinish={async (body) => {
        await onFinish(body);

        onFinishPhone(body.phone);
      }}
    >
      <Form.Item name='phone' getValueFromEvent={getValueFromMaskedInput}>
        <MaskedInput
          mask='+{7} (000) 000-00-00'
          placeholder={t('phone')}
          prefix={<PhoneOutlined className={opacityIcon} />}
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
