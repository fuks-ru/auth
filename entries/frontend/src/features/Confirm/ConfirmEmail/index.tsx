import { Button, Card, Form, Input, Space } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@linaria/react';

import { useAuthForm } from 'frontend/shared/api';
import {
  ResendConfirmEmail,
  TConfirmEmailMethods,
} from 'frontend/features/Confirm/ConfirmEmail/ui/ResendConfirmEmail';
import { useNavigateToSuccess } from 'frontend/shared/lib';

interface IProps {
  email: string;
  method: TConfirmEmailMethods;
}

/**
 * Страница для отправки данных для активации пользователя по коду
 * подтверждения.
 */
export const ConfirmEmail: FC<IProps> = ({ email, method }) => {
  const [form, onFinish, status] = useAuthForm(
    method === 'confirmUser' ? 'confirmUserByEmail' : 'confirmEmail',
  );
  const { t } = useTranslation();

  useNavigateToSuccess(status);

  return (
    <SCard title={t('confirmation')}>
      <Space direction='vertical' size={32}>
        <ResendConfirmEmail email={email} method={method} />

        <Form initialValues={{ email }} form={form} onFinish={onFinish}>
          <Form.Item hidden={true} name='email'>
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
