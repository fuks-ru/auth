import { useLocation, useNavigate as useNavigateBase } from 'react-router-dom';
import { useCallback } from 'react';

/**
 * Возвращает функцию для перехода на страницу. Умеет сохранять query-параметры.
 */
export const useNavigate = (): ((
  pathname: string,
  saveQuery?: boolean,
) => void) => {
  const navigate = useNavigateBase();
  const { search } = useLocation();

  return useCallback(
    (pathname: string, saveQuery = true) => {
      navigate({ pathname, search: saveQuery ? search : undefined });
    },
    [navigate, search],
  );
};
