import { useContext } from 'react';
import { Schemas } from '@fuks-ru/auth-client';

import { SettingsContext } from 'frontend/entities/settings/model/SettingsContext';

/**
 * Хук, получающий контекст, хранящий конфиги фронтенда.
 */
export const useSettings = (): Schemas.FrontendSettingsResponse | null =>
  useContext(SettingsContext);
