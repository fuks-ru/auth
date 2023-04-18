import { createRoot } from 'react-dom/client';
import { initApi, loginApi } from '@fuks-ru/auth-client';

// import { App } from 'frontend/app/App';
import { backendUrl } from 'frontend/shared/config';

const container = document.querySelector('#app');

if (!container) {
  throw new Error('container is not defined');
}

const FakeApp = () => <div>App is not ready yet</div>;

initApi({
  baseUrl: backendUrl,
});

const root = createRoot(container);

root.render(<FakeApp />);
