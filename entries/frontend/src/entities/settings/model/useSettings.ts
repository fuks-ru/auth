import { useContext } from 'react';
import { FrontendSettingsGetApiResponse } from '@fuks-ru/auth-client/rtk';

import { SettingsContext } from 'frontend/entities/settings/model/SettingsContext';

/**
 * Хук, получающий контекст, хранящий конфиги фронтенда.
 */
export const useSettings = (): FrontendSettingsGetApiResponse | null =>
  useContext(SettingsContext);
