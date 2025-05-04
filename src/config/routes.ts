export const ROUTES = {
    HOME: '/',
    AUTH: {
      LOGIN: '/auth/login',
      SIGNUP: '/auth/signup',
      FORGOT_PASSWORD: '/auth/forgot-password',
      SELLER: {
        LOGIN: '/auth/seller/login',
        SIGNUP: '/auth/seller/signup',
        FORGOT_PASSWORD: '/auth/seller/forgot-password'
      }
    }
  } as const;