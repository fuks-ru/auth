import { createRoot } from 'react-dom/client';
import { initApi } from '@fuks-ru/auth-client';

import { App } from 'frontend/app/App';
import { backendUrl } from 'frontend/shared/config';

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
});

const root = createRoot(container);

root.render(<App />);
