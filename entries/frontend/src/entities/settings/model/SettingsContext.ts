import { createContext } from 'react';
import { Schemas } from '@fuks-ru/auth-client';

/**
 * Контекст, хранящий конфиги фронтенда.
 */
export const SettingsContext =
  createContext<Schemas.FrontendSettingsResponse | null>(null);
