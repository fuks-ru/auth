import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ConfirmEmail } from 'frontend/features/Confirm/ConfirmEmail';
import { Head } from 'frontend/shared/ui';
import { ConfirmPhone } from 'frontend/features/Confirm/ConfirmPhone';
import { TConfirmPhoneMethods } from 'frontend/features/Confirm/ConfirmPhone/ui/ResendConfirmPhone';
import { TConfirmEmailMethods } from 'frontend/features/Confirm/ConfirmEmail/ui/ResendConfirmEmail';

/**
 * Данные для страницы подтверждения.
 */
export type TConfirmPageData =
  | {
      type: 'email';
      value: string;
      method: TConfirmEmailMethods;
    }
  | {
      type: 'phone';
      value: string;
      method: TConfirmPhoneMethods;
    };

interface IProps {
  data: TConfirmPageData;
}

const ConfirmPage: FC<IProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head title={t('confirmation')} />
      {data.type === 'email' ? (
        <ConfirmEmail email={data.value} method={data.method} />
      ) : (
        <ConfirmPhone phone={data.value} method={data.method} />
      )}
    </>
  );
};

/**
 * Страница для отправки данных для активации пользователя по коду
 * подтверждения.
 */
export default ConfirmPage;
