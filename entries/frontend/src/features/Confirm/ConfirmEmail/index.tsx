import { Button, Card, Form, Input, Space } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@linaria/react';
import {
  useConfirmUserByEmailMutation,
  useConfirmEmailMutation,
} from '@fuks-ru/auth-client/rtk';

import {
  ResendConfirmEmail,
  TConfirmEmailMethods,
} from 'frontend/features/Confirm/ConfirmEmail/ui/ResendConfirmEmail';
import { useNavigateToSuccess } from 'frontend/shared/lib';
import { useFormMutationWithRecaptcha } from 'frontend/shared/api/useFormMutationWithRecaptcha';

interface IProps {
  email: string;
  method: TConfirmEmailMethods;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useForm = (method: TConfirmEmailMethods) => {
  const confirmUser = useFormMutationWithRecaptcha(
    useConfirmUserByEmailMutation,
    { bodyKey: 'confirmEmailRequest' },
  );
  const confirmEmail = useFormMutationWithRecaptcha(useConfirmEmailMutation, {
    bodyKey: 'confirmEmailRequest',
  });

  return method === 'confirmUser' ? confirmUser : confirmEmail;
};

/**
 * Страница для отправки данных для активации пользователя по коду
 * подтверждения.
 */
export const ConfirmEmail: FC<IProps> = ({ email, method }) => {
  const [onFinish, { form, status }] = useForm(method);
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
