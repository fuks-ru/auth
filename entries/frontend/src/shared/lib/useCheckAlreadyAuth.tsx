import { useEffect } from 'react';

import { useAuthApi } from 'frontend/shared/api';

/**
 * Проверяет, был ли пользователь уже авторизован.
 */
export const useCheckAlreadyAuth = (): void => {
  const [check] = useAuthApi('authCheckNot');

  useEffect(() => {
    void check(null);
  }, [check]);
};
