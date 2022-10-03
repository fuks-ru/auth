/**
 * Коды системных ошибок.
 */
export enum ErrorCode {
  GOOGLE_AUTH_PAYLOAD_EMPTY = 200,
  GOOGLE_AUTH_EMAIL_NOT_FOUND = 201,
  USER_ALREADY_EXISTS = 400,
  USER_NOT_FOUND = 401,
  CONFIRM_CODE_NOT_EXIST = 500,
  CONFIRM_CODE_TIMEOUT = 501,
  FORGOT_PASSWORD_NOT_EXIST = 600,
  FORGOT_PASSWORD_CODE_TIMEOUT = 601,
}
