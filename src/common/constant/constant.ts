import { env } from '../config/env';

export const ADMIN = 'admin';
export const USER = 'user';
export const PRODUCT_OWNER = 'product_owner';
export const TECHNICAL_REVIEWER = 'technical_reviewer';
export const BUSINESS_REVIEWER = 'business_reviewer';
export const LEGAL_REVIEWER = 'legal_reviewer';
export const PRODUCT_MANAGER = 'product_manager';
export const BUSINESS_OWNER = 'business_owner';
export const APPROVER = 'approver';

export const PII_ENCRYPTION_KEY = env.PII_ENCRYPTION_KEY;
export const SWAGGER_USER = env.SWAGGER_USER;
export const SWAGGER_PASSWORD = env.SWAGGER_PASSWORD;

export const JWT_ACCESS_TOKEN = 'x-access-token';
