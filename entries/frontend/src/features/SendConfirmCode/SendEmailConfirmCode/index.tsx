import { FC, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { css } from '@linaria/core';
import { useTranslation } from 'react-i18next';
import { useSendEmailConfirmCodeForRegisteredMutation } from '@fuks-ru/auth-client/rtk';
import { QueryStatus } from '@reduxjs/toolkit/query';

import { useFormMutationWithRecaptcha } from 'frontend/shared/api/useFormMutationWithRecaptcha';

interface IProps {
  onFinishEmail: (email: string) => void;
  onSuccess: () => void;
  initialValue: string | undefined;
}

/**
 * Отправляет код подтверждения на email.
 */
export const SendEmailConfirmCode: FC<IProps> = ({
  onFinishEmail,
  initialValue,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const [onFinish, { form, status }] = useFormMutationWithRecaptcha(
    useSendEmailConfirmCodeForRegisteredMutation,
    { bodyKey: 'sendConfirmEmailRequest' },
  );

  useEffect(() => {
    if (status === QueryStatus.fulfilled) {
      onSuccess();
    }
  }, [status, onSuccess]);

  return (
    <Form
      form={form}
      initialValues={{ email: initialValue }}
      onFinish={async (body) => {
        onFinishEmail(body.email);

        await onFinish(body);
      }}
    >
      <Form.Item name='email'>
        <Input
          placeholder={t('email')}
          prefix={<MailOutlined className={opacityIcon} />}
          readOnly={!!initialValue}
          disabled={!!initialValue}
        />
      </Form.Item>
      {!initialValue && (
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            disabled={status === 'pending'}
          >
            {t('confirm')}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

const opacityIcon = css`
  opacity: 0.3;
`;
