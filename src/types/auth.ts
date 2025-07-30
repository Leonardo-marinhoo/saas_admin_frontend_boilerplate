export interface UserRole {
  id: number;
  name: string;
  description: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  tenant_id: number;
  role_id: number;
  role: UserRole;
  email_verified_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  role_type: string;
  token: string;
}

export interface SubscriptionError {
  message: string;
  redirect_url: string;
  requires_subscription: boolean;
  error_code: string;
}
