import { FC } from 'react';

import { useDynamicStyleSheet } from 'frontend/shared/lib';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import lightTheme from '!css-loader!antd/dist/antd.css';

const LightTheme: FC = () => {
  useDynamicStyleSheet(lightTheme.toString());

  return null;
};

/**
 * Светлая тема.
 */
export default LightTheme;
