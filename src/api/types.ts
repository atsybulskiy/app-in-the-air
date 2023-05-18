export interface IUser {
  id: string;
  email: string;
  name: string;
  isActivated: boolean;
  role: string;
  photo: string;
  created_at: string;
  updated_at: string;
}

export interface IGenericResponse {
  status: string;
  message: string;
}

export interface RegisterInput {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
