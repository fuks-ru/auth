import { createContext } from 'react';
import { FrontendSettingsResponse } from '@fuks-ru/auth-client';

/**
 * Контекст, хранящий конфиги фронтенда.
 */
export const SettingsContext = createContext<FrontendSettingsResponse | null>(
  null,
);
