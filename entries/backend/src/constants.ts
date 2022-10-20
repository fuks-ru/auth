/**
 * Находимся ли мы в dev режиме.
 */
export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Хедер для внутреннего токена.
 */
export const internalRequestTokenHeader = 'X-INTERNAL-TOKEN';
