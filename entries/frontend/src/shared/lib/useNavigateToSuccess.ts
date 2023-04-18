import { useEffect } from 'react';
import { QueryStatus } from '@reduxjs/toolkit/query';

import { routes } from 'frontend/shared/config';
import { useRedirectFrom } from 'frontend/entities/redirectFrom';
import { useNavigate } from 'frontend/shared/lib/useNavigate';

/**
 * Перенаправляет на страницу завершения входа.
 */
export const useNavigateToSuccess = (status: QueryStatus): void => {
  const navigate = useNavigate();
  const redirectFrom = useRedirectFrom();

  useEffect(() => {
    if (status === QueryStatus.fulfilled && redirectFrom) {
      window.location.assign(redirectFrom);

      return;
    }

    if (status === QueryStatus.fulfilled) {
      navigate(routes.loginSuccess);
    }
  }, [navigate, redirectFrom, status]);
};
