import { FC, ReactNode, useEffect } from 'react';

import { useAuthApi } from 'frontend/shared/api';
import { SettingsContext } from 'frontend/entities/settings';

interface IProps {
  children: ReactNode;
}

/**
 * Провайдер, предоставляющий контекст для получения настроек.
 */
export const SettingsProvider: FC<IProps> = ({ children }) => {
  const [get, data] = useAuthApi('frontendSettingsGet');

  useEffect(() => {
    void get(null);
  }, [get]);

  return (
    <SettingsContext.Provider value={data || null}>
      {children}
    </SettingsContext.Provider>
  );
};
