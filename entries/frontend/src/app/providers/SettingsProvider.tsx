import { FC, ReactNode } from 'react';
import { useFrontendSettingsGetQuery } from '@fuks-ru/auth-client';

import { SettingsContext } from 'frontend/entities/settings';

interface IProps {
  children: ReactNode;
}

/**
 * Провайдер, предоставляющий контекст для получения настроек.
 */
export const SettingsProvider: FC<IProps> = ({ children }) => {
  const { data } = useFrontendSettingsGetQuery();

  return (
    <SettingsContext.Provider value={data || null}>
      {children}
    </SettingsContext.Provider>
  );
};
