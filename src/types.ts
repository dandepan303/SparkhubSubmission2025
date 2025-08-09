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
  offerings?: Offering[]; // optional relation mirror
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

export interface Offering {
  id: string;
  description: string;
  cost: number;
  quantity: number | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  owner?: User;
}

// API ENDPOINTs

export type DefaultAPIRet = {
  status: 'success' | 'error';
  message: string;
};

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

export type DeveloperDeleteArgs = {
  deleteAuth?: boolean;
  deleteUserDb?: boolean;
  targetUserId?: string;
};

export type OfferingGetRet = {
  status: 'success' | 'error';
  message: string;
  offerings?: Offering[];
};

export type OfferingPostArgs = {
  offeringId?: string;
  description: string;
  cost: number;
  quantity: number | null;
};

export type OfferingDeleteArgs = {
  offeringId: string;
};