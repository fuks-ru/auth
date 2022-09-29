import process from 'node:process';
import { isDevelopment } from '@fuks-ru/auth-constants';

/**
 * Переменные окружение, прокидываемые при сборке в приложение.
 */
export const env = {
  NODE_ENV: process.env.NODE_ENV,
  GOOGLE_AUTH_CLIENT_ID: isDevelopment
    ? '14083046227-pseubj6r7te7mtl1t831jsgnaak1cn47.apps.googleusercontent.com'
    : process.env.GOOGLE_AUTH_CLIENT_ID,
  GOOGLE_RECAPTCHA_CLIENT_KEY: isDevelopment
    ? '6Lel8ZcgAAAAAC25K_C-zciG8AM8kmVvm8f1_P09'
    : process.env.GOOGLE_RECAPTCHA_CLIENT_KEY,
};
