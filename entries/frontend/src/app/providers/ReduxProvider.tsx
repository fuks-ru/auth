import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import { emptyApi } from '@fuks-ru/auth-client';

const rootReducer = combineReducers({
  [emptyApi.reducerPath]: emptyApi.reducer,
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
export const setupStore = (preloadedState?: PreloadedState<IRootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      // eslint-disable-next-line unicorn/prefer-spread
      getDefaultMiddleware().concat(emptyApi.middleware),
    preloadedState,
  });

export type IRootState = ReturnType<typeof rootReducer>;
export type IAppStore = ReturnType<typeof setupStore>;
export type IDispatch = IAppStore['dispatch'];

interface IProps {
  children: ReactNode;
  preloadedState?: PreloadedState<IRootState>;
  store?: IAppStore;
}

export const ReduxProvider: FC<IProps> = ({
  children,
  preloadedState,
  store = setupStore(preloadedState),
}) => <Provider store={store}>{children}</Provider>;
