import { Button, Card, Form, Input, Space } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@linaria/react';
import {
  useConfirmUserByPhoneMutation,
  useConfirmPhoneMutation,
} from '@fuks-ru/auth-client';

import { useNavigateToSuccess } from 'frontend/shared/lib';
import {
  ResendConfirmPhone,
  TConfirmPhoneMethods,
} from 'frontend/features/Confirm/ConfirmPhone/ui/ResendConfirmPhone';
import { useFormMutationWithRecaptcha } from 'frontend/shared/api/useFormMutationWithRecaptcha';

interface IProps {
  phone: string;
  method: TConfirmPhoneMethods;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useForm = (method: TConfirmPhoneMethods) => {
  const confirmUser = useFormMutationWithRecaptcha(
    useConfirmUserByPhoneMutation,
    { bodyKey: 'confirmPhoneRequest' },
  );
  const confirmPhone = useFormMutationWithRecaptcha(useConfirmPhoneMutation, {
    bodyKey: 'confirmPhoneRequest',
  });

  return method === 'confirmUser' ? confirmUser : confirmPhone;
};

/**
 * Страница для отправки данных для активации пользователя по коду
 * подтверждения.
 */
export const ConfirmPhone: FC<IProps> = ({ phone, method }) => {
  const [onFinish, { form, status }] = useForm(method);
  const { t } = useTranslation();

  useNavigateToSuccess(status);

  return (
    <SCard title={t('confirmation')}>
      <Space direction='vertical' size={32}>
        <ResendConfirmPhone phone={phone} method={method} />

        <Form initialValues={{ phone }} form={form} onFinish={onFinish}>
          <Form.Item hidden={true} name='phone'>
            <Input />
          </Form.Item>
          <Form.Item name='confirmCode'>
            <Input placeholder={t('code')} />
          </Form.Item>
          <Form.Item noStyle={true}>
            <Button
              type='primary'
              htmlType='submit'
              disabled={status === 'pending'}
            >
              {t('confirm')}
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
