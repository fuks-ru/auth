import { useContext } from 'react';

import {
  ILoginTypeContext,
  LoginTypeContext,
} from 'frontend/entities/loginType/model/LoginTypeContext';

/**
 * Хук, получающий контекст, хранящий тип авторизации.
 */
export const useLoginType = (): ILoginTypeContext =>
  useContext(LoginTypeContext);
