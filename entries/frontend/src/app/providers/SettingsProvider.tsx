import { FC, ReactNode, useEffect } from 'react';

import { useAuthApi } from 'frontend/shared/api';
import { SettingsContext } from 'frontend/entities/settings';
import { Preloader } from 'frontend/shared/ui';

interface IProps {
  children: ReactNode;
}

/**
 * Провайдер, предоставляющий контекст для получения настроек.
 */
export const SettingsProvider: FC<IProps> = ({ children }) => {
  const [get, data, status] = useAuthApi('frontendSettingsGet');

  useEffect(() => {
    void get(null);
  }, [get]);

  return (
    <SettingsContext.Provider value={data || null}>
      {status === 'pending' ? <Preloader /> : children}
    </SettingsContext.Provider>
  );
};
