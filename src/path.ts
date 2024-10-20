/**
 * 인증이 필요없는 페이지
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * 인증이 필요한 페이지
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * api auth 접두사
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * 로그인 후 이동하는 페이지
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
