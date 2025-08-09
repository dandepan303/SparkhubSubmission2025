// DATABASE

export type Role = 'admin' | 'user' | 'guest';
export type RatingType = 'HIRER' | 'WORKER';
export type JobStatus = 'SEARCHING' | 'IN_PROGRESS' | 'COMPLETED';

export interface User {
  id: string;
  role: string;
  email: string;
  name: string;
  contactInfo: string | null;
  createdAt: Date;
  updatedAt: Date;
  newNotifications: boolean;
  notifications: string[];
  jobsCreated?: Job[];
  jobsWorking?: Job[];
  offerings?: Offering[];
  ratingFrom?: Rating[];
  ratingTo?: Rating[];
}

export interface Rating {
  id: string;
  value: number;
  text: string | null;
  type: RatingType;
  fromId: string;
  toId: string;
  jobId: string;
  createdAt: Date;
  updatedAt: Date;
  from?: User;
  to?: User;
  job?: Job;
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
  payment: number;
  hirer?: User;
  worker?: User;
  ratings?: Rating[];
}

export interface Offering {
  id: string;
  description: string;
  cost: number;
  quantity: number | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
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

export type JobGetRet = {
  status: 'success' | 'error';
  message: string;
  jobs?: Job[];
}

export type JobCreateArgs = {
  title: string;
  description: string;
  location: string;
  payment: number;
};

export type GetJobApplicantsRet = {
  status: 'success' | 'error';
  message: string;
  applicants?: {
    id: string;
    email: string;
    name: string;
    contactInfo: string | null;
    ratingTo: Rating[];
  }[];
};

export type ApplyJobArgs = {
  jobId: string;
};

export type AcceptJobArgs = {
  jobId: string;
  workerId: string;
};

export type RateJobArgs = {
  jobId: string;
  value: number;
  text?: string;
};

export type RateJobRet = {
  status: 'success' | 'error';
  message: string;
  rating?: Rating;
};

export type SpendArgs = {
  offeringId: string;
  quantity?: number;
};

export type CompleteJobArgs = {
  jobId: string;
};