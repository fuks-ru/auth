import { FC, useEffect } from 'react';
import { Button, Form } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { PhoneOutlined } from '@ant-design/icons';
import { css } from '@linaria/core';
import { useTranslation } from 'react-i18next';
import { useSendPhoneConfirmCodeForRegisteredMutation } from '@fuks-ru/auth-client';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { useFormMutation } from '@fuks-ru/common-frontend';

import { getValueFromMaskedInput } from 'frontend/shared/lib';

interface IProps {
  onFinishPhone: (phone: string) => void;
  onSuccess: () => void;
  initialValue: string | undefined;
}

/**
 * Отправляет код подтверждения на телефон.
 */
export const SendPhoneConfirmCode: FC<IProps> = ({
  onFinishPhone,
  onSuccess,
  initialValue,
}) => {
  const { t } = useTranslation();
  const [onFinish, { status, form }] = useFormMutation(
    useSendPhoneConfirmCodeForRegisteredMutation,
  );

  useEffect(() => {
    if (status === QueryStatus.fulfilled) {
      onSuccess();
    }
  }, [status, onSuccess]);

  return (
    <Form
      form={form}
      initialValues={{ phone: initialValue }}
      onFinish={async (body) => {
        onFinishPhone(body.phone);

        await onFinish(body);
      }}
    >
      <Form.Item name='phone' getValueFromEvent={getValueFromMaskedInput}>
        <MaskedInput
          placeholder={t('phone')}
          mask='+{7} (000) 000-00-00'
          prefix={<PhoneOutlined className={opacityIcon} />}
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
