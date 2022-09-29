import { useContext } from 'react';

import {
  IThemeContext,
  ThemeContext,
} from 'frontend/entities/theme/model/ThemeContext';

/**
 * Хук, получающий тему.
 */
export const useTheme = (): IThemeContext => useContext(ThemeContext);
