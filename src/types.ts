export type Role = 'admin' | 'user' | 'guest';
export type RatingType = 'HIRER' | 'WORKER';

export interface User {
  id: string;
  email: string;
  name: string | null;
  ratings?: null;
  createdAt: string;
  updatedAt: string;
}

export interface Rating {
  id: string;
  value: number;
  text?: string | null;
  type: RatingType;
  fromId: string;
  toId: string;
  jobId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRatingRequest {
  value: number;
  text?: string;
  type: RatingType;
  toId: string;
  jobId?: string;
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
