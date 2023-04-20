import { FC, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { css } from '@linaria/core';
import { Trans, useTranslation } from 'react-i18next';
import { useSendForgotPasswordCodeEmailMutation } from '@fuks-ru/auth-client/rtk';
import { QueryStatus } from '@reduxjs/toolkit/query';

import { Link } from 'frontend/shared/ui';
import { routes } from 'frontend/shared/config';
import { useFormMutationWithRecaptcha } from 'frontend/shared/api/useFormMutationWithRecaptcha';

interface IProps {
  onFinishEmail: (email: string) => void;
  onSuccess: () => void;
}

/**
 * Форма восстановления пароля.
 */
export const SendForgotPasswordCodeEmail: FC<IProps> = ({
  onFinishEmail,
  onSuccess,
}) => {
  const [onFinish, { status, form }] = useFormMutationWithRecaptcha(
    useSendForgotPasswordCodeEmailMutation,
    { bodyKey: 'sendForgotPasswordCodeEmailRequest' },
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

        onFinishEmail(body.email);
      }}
    >
      <Form.Item name='email'>
        <Input
          prefix={<UserOutlined className={opacityIcon} />}
          placeholder={t('email')}
        />
      </Form.Item>
      <Form.Item noStyle={true}>
        <Trans t={t} i18nKey='sendOrLogin'>
          <Button
            type='primary'
            htmlType='submit'
            disabled={status === 'pending'}
          >
            Send
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
