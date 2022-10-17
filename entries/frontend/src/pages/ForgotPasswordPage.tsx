import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Segmented, Space } from 'antd';

import { Head } from 'frontend/shared/ui';
import { SendForgotPasswordCodeEmail } from 'frontend/features/SendForgotPasswordCode/SendForgotPasswordCodeEmail';
import { useLoginType } from 'frontend/entities/loginType';
import { SendForgotPasswordCodePhone } from 'frontend/features/SendForgotPasswordCode/SendForgotPasswordCodePhone';
import { TLoginType } from 'frontend/entities/loginType/model/LoginTypeContext';

interface IProps {
  onFinishEmail: (email: string) => void;
  onFinishPhone: (phone: string) => void;
  onSuccess: () => void;
}

const ForgotPasswordPage: FC<IProps> = ({
  onFinishEmail,
  onFinishPhone,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const { type, changeType, types } = useLoginType();

  return (
    <>
      <Head title={t('passwordRecovery')} />

      <Card title={t('passwordRecovery')}>
        <Space direction='vertical' size={16}>
          <Segmented
            value={type}
            onChange={(newType) => changeType(newType as TLoginType)}
            options={types}
          />
          {type === 'phone' ? (
            <SendForgotPasswordCodePhone
              onFinishPhone={onFinishPhone}
              onSuccess={onSuccess}
            />
          ) : (
            <SendForgotPasswordCodeEmail
              onFinishEmail={onFinishEmail}
              onSuccess={onSuccess}
            />
          )}
        </Space>
      </Card>
    </>
  );
};

/**
 * Страница восстановления пароля.
 */
export default ForgotPasswordPage;
