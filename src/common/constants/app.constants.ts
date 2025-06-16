export const APP_NAME = 'NestMart Backend';
export const JWT_SECRET_KEY = 'JWT_SECRET'; // from .env
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;

export const ROLES = {
  ADMIN: 'ADMIN',
  SELLER: 'SELLER',
  CUSTOMER: 'CUSTOMER',
} as const;
