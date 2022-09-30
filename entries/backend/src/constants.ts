const prodDomainUrl = '/';
const devDomainUrl = 'localhost';

/**
 * Находимся ли мы в dev режиме.
 */
export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Базовый url для всех сервисов.
 */
export const domainUrl = isDevelopment ? devDomainUrl : prodDomainUrl;

const scheme = isDevelopment ? 'http' : 'https';

/**
 * Базовый домен со схемой.
 */
export const domainUrlWithScheme = `${scheme}://${domainUrl}`;

/**
 * Порты всех сервисов.
 */
export const ports = {
  AUTH_FRONTEND_PORT: 3_002,
  AUTH_BACKEND_PORT: 3_003,
};

/**
 * Маршруты ко всем сервисам.
 */
export const devUrls = {
  AUTH_BACKEND_URL: `http://${devDomainUrl}:${ports.AUTH_BACKEND_PORT}`,

  AUTH_FRONTEND_URL: `http://${devDomainUrl}:${ports.AUTH_FRONTEND_PORT}`,
};

/**
 * Префикс API-запросов.
 */
export const API_PREFIX = '/api';
