import { createContext, Dispatch } from 'react';

/**
 * Тип авторизации.
 */
export type TLoginType = 'phone' | 'email';

/**
 * Данные в контексте.
 */
export interface ILoginTypeContext {
  /**
   * Тип авторизации.
   */
  type: TLoginType;
  /**
   * Изменяет текущий тип.
   */
  changeType: Dispatch<TLoginType>;
  /**
   * Список всех типов.
   */
  types: Array<{ value: TLoginType; label: string }>;
}

/**
 * Контекст, хранящий тип авторизации.
 */
export const LoginTypeContext = createContext<ILoginTypeContext>({
  type: 'email',
  types: [],
  changeType: () => {},
});
