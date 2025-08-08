// DATABASE

export type Role = 'admin' | 'user' | 'guest';
export type RatingType = 'HIRER' | 'WORKER';
export type JobStatus = 'SEARCHING' | 'IN_PROGRESS' | 'COMPLETED';

export interface User {
  id: string;
  email: string;
  name: string;
  contactInfo: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Rating {
  id: string;
  value: number;
  text: string | null;
  type: RatingType;
  fromId: string;
  toId: string;
  jobId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  appliedAt: Date;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  status: JobStatus;
  hirerId: string;
  workerId: string | null;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
}

export interface Inventory {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Offering {
  id: string;
  description: string;
  cost: number;
  quantity: number | null;
  inventoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

// API ENDPOINTs

export interface CreateRatingRequest {
  value: number;
  text?: string;
  type: RatingType;
  toId: string;
  jobId?: string;
}

// API ENDPOINTS
export type EmailSignUpArgs = {
  email: string;
  password: string;
  name: string;
};

export type EmailSignUpRet = {
  status: 'success' | 'error';
  message: string;
  redirectUrl?: string;
};

export type GoogleSignUpArgs = {
  userId: string;
  email: string;
  name: string;
};

export type GoogleSignUpRet = {
  status: string;
  message: string;
};

export type DeveloperDeleteArgs = {
  deleteAuth?: boolean;
  deleteUserDb?: boolean;
  targetUserId?: string;
};

export type DeveloperDeleteRet = {
  status: 'success' | 'error';
  message: string;
};
