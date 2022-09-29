import { domainUrlWithScheme } from '@fuks-ru/auth-constants';
import { FC, ReactNode, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { RedirectFromContext } from 'auth-frontend/entities/redirectFrom/model/RedirectFromContext';

interface IProps {
  children: ReactNode;
}

/**
 * Провайдер, предоставляющий контекст для получения query-параметра
 * redirectFrom.
 */
export const RedirectFromProvider: FC<IProps> = ({ children }) => {
  const [searchParams] = useSearchParams();

  const redirectFrom = useMemo(
    () => searchParams.get('redirectFrom') || domainUrlWithScheme,
    [searchParams],
  );

  return (
    <RedirectFromContext.Provider value={redirectFrom}>
      {children}
    </RedirectFromContext.Provider>
  );
};
