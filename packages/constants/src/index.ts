const prodDomainUrl = 'fuks.ru';
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
export const urls = {
  AUTH_BACKEND_URL: isDevelopment
    ? `http://${devDomainUrl}:${ports.AUTH_BACKEND_PORT}`
    : `https://auth.${prodDomainUrl}`,

  AUTH_FRONTEND_URL: isDevelopment
    ? `http://${devDomainUrl}:${ports.AUTH_FRONTEND_PORT}`
    : `https://auth.${prodDomainUrl}`,
};

/**
 * Префикс API-запросов.
 */
export const API_PREFIX = '/api';
