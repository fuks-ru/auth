import { FC, ReactNode, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LoginTypeContext } from 'frontend/entities/loginType';
import {
  ILoginTypeContext,
  TLoginType,
} from 'frontend/entities/loginType/model/LoginTypeContext';

interface IProps {
  children: ReactNode;
}

/**
 * Провайдер, предоставляющий контекст для получения типа авторизации.
 */
export const LoginTypeProvider: FC<IProps> = ({ children }) => {
  const { t } = useTranslation();
  const [type, setType] = useState<TLoginType>('email');

  const data = useMemo<ILoginTypeContext>(
    () => ({
      type,
      changeType: setType,
      types: [
        { label: t('byPhone'), value: 'phone' },
        { label: t('byEmail'), value: 'email' },
      ],
    }),
    [t, type],
  );

  return (
    <LoginTypeContext.Provider value={data}>
      {children}
    </LoginTypeContext.Provider>
  );
};
