/**
 * Порт webpack.config.
 */
export const WEBPACK_PORT = 3_002;

/**
 * Находимся ли мы в dev режиме.
 */
export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Адрес для запросов на бэк.
 */
export const backendUrl = isDevelopment ? 'http://localhost:3003' : '';

console.log(backendUrl)
