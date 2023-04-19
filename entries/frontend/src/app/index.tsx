import { createRoot } from 'react-dom/client';
import { initApi } from '@fuks-ru/auth-client';

import { App } from 'frontend/app/App';
import { backendUrl, routes } from 'frontend/shared/config';
import { navigate } from 'frontend/shared/lib/navigate';

const container = document.querySelector('#app');

if (!container) {
  throw new Error('container is not defined');
}

initApi({
  reducerPath: 'authApi',
  baseUrl: backendUrl,
  prepareHeaders: (headers) => {
    headers.set('i18next', navigator.language);

    return headers;
  },
  onRedirect: ({ location }) => {
    window.location.assign(location);
  },
  onForbidden: () => {
    navigate(routes.login);
  },
  onUnauthorized: () => {
    navigate(routes.login);
  },
  onAlreadyAuth: () => {
    navigate(routes.loginSuccess);
  },
});

const root = createRoot(container);

root.render(<App />);
