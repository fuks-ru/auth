import { Button, Card, Form, Input, Space } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@linaria/react';

import { useAuthForm } from 'frontend/shared/api';
import { useNavigateToSuccess } from 'frontend/shared/lib';
import { ResendConfirmPhone } from 'frontend/features/ConfirmPhone/ui/ResendConfirmPhone';

interface IProps {
  phone: string;
}

/**
 * Страница для отправки данных для активации пользователя по коду
 * подтверждения.
 */
export const ConfirmPhone: FC<IProps> = ({ phone }) => {
  const [form, onFinish, status] = useAuthForm('confirmationPhoneConfirm');
  const { t } = useTranslation();

  useNavigateToSuccess(status);

  return (
    <SCard title={t('confirmation')}>
      <Space direction='vertical' size={32}>
        <ResendConfirmPhone phone={phone} />

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
              {t('register')}
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
