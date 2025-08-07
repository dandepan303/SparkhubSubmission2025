export type Role = 'admin' | 'user' | 'guest';

export interface User {
  id: string;
  email: string;
  name: string | null;
  ratings?: null;
  createdAt: string;
  updatedAt: string;
}

// API ENDPOINTS
export type SignInArgs = {
  email: string;
  password: string;
};

export type SignInRet = {
  status: 'success' | 'error';
  message: string;
  redirectUrl?: string;
};

export type SignUpArgs = {
  email: string;
  password: string;
  name: string;
};

export type SignUpRet = {
  status: 'success' | 'error';
  message: string;
  redirectUrl?: string;
};

export type CreateUserArgs = {
  userId: string;
  email: string;
  name: string;
};

export type CreateUserRet = {
  status: string;
  message: string;
};