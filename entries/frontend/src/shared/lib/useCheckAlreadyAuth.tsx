import { useEffect } from 'react';
import { useAuthCheckNotQuery } from '@fuks-ru/auth-client';

/**
 * Проверяет, был ли пользователь уже авторизован.
 */
export const useCheckAlreadyAuth = (): void => {
  const { data, error } = useAuthCheckNotQuery();

  useEffect(() => {
    console.log({ data, error });
  }, [data, error]);
};
