import { createContext } from 'react';
import { FrontendSettingsResponse } from '@fuks-ru/auth-client/rtk';

/**
 * Контекст, хранящий конфиги фронтенда.
 */
export const SettingsContext = createContext<FrontendSettingsResponse | null>(
  null,
);
