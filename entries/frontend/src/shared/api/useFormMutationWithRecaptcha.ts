/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UseMutation,
  UseMutationStateOptions,
  UseMutationStateResult,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { BaseQueryFn, MutationDefinition } from '@reduxjs/toolkit/query';
import { IErrorResponse } from '@fuks-ru/common';
import { MutationResultSelectorResult } from '@reduxjs/toolkit/dist/query/core/buildSelectors';
import { FormInstance } from 'antd';
import { QueryArgFrom } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { useCallback } from 'react';
import { useFormMutation } from '@fuks-ru/common-frontend';
import { MutationActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';

import { useExecuteRecaptcha } from 'frontend/shared/lib';

export const useFormMutationWithRecaptcha = <
  Result,
  D extends MutationDefinition<
    any,
    BaseQueryFn<any, any, IErrorResponse>,
    any,
    Result
  >,
  BodyKey extends keyof QueryArgFrom<D>,
  R extends MutationResultSelectorResult<D>,
>(
  hook: UseMutation<D>,
  options: UseMutationStateOptions<D, R> & {
    bodyKey: BodyKey;
  },
): readonly [
  (body: QueryArgFrom<D>[BodyKey]) => MutationActionCreatorResult<D>,
  UseMutationStateResult<D, R> & {
    form: FormInstance<QueryArgFrom<D>[BodyKey]>;
  },
] => {
  const executeRecaptcha = useExecuteRecaptcha();
  const [trigger, data] = useFormMutation<Result, D, BodyKey, R>(hook, options);

  const wrappedTrigger = useCallback(
    async (body: QueryArgFrom<D>[BodyKey]) => {
      const recaptcha = await executeRecaptcha();

      return trigger(body, { recaptcha } as unknown as Omit<
        QueryArgFrom<D>,
        BodyKey
      >);
    },
    [executeRecaptcha, trigger],
  ) as (body: QueryArgFrom<D>[BodyKey]) => MutationActionCreatorResult<D>;

  return [wrappedTrigger, data];
};

/* eslint-enable */
