import {
  Client,
  getApi,
  TMethods,
  TApiArgs,
  TApiBody,
  TApiResponse,
} from '@fuks-ru/auth-backend';
import { errorInterceptor } from '@fuks-ru/common-frontend';
import { AxiosRequestConfig } from 'axios';
import { OperationResponse } from 'openapi-client-axios';

import { backendUrl } from 'frontend/shared/config';

/**
 * Статус завершения запроса.
 */
export type TStatus = 'pending' | 'success' | 'failed' | 'none';

/**
 * Клиент для работы с AuthApi.
 */
// eslint-disable-next-line import/no-mutable-exports
export let authApi: Client;

/**
 * Инициализирует Api.
 */
export const initAuthApi = async (): Promise<void> => {
  authApi = await getApi(backendUrl);

  authApi.interceptors.response.use(undefined, errorInterceptor);
  authApi.defaults.headers.common.i18next = navigator.language;
};

/**
 * Получает конкретный api метод.
 */
export const getApiMethod = <
  ApiName extends TMethods,
  ApiMethod extends (
    args: TApiArgs<ApiName> | null,
    body: TApiBody<ApiName>,
    config?: AxiosRequestConfig,
  ) => OperationResponse<TApiResponse<ApiName>>,
>(
  name: ApiName,
): ApiMethod => authApi[name].bind(authApi) as ApiMethod;
