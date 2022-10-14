import { FC, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { css } from '@linaria/core';
import { Trans, useTranslation } from 'react-i18next';

import { useAuthForm } from 'frontend/shared/api';
import { Link } from 'frontend/shared/ui';
import { routes } from 'frontend/shared/config';

interface IProps {
  onFinishEmail: (email: string) => void;
  onSuccess: () => void;
}

/**
 * Форма восстановления пароля.
 */
export const SendPasswordEmailChange: FC<IProps> = ({
  onFinishEmail,
  onSuccess,
}) => {
  const [form, onFinish, status] = useAuthForm('forgotPasswordSendEmail');
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
