import { useContext } from 'react';

import { RedirectFromContext } from 'frontend/entities/redirectFrom/model/RedirectFromContext';

/**
 * Хук, получающий контекст, хранящий url для редиректа.
 */
export const useRedirectFrom = (): string | null =>
  useContext(RedirectFromContext);
