export interface ILoginResponse {
  data: Data;
}

export interface Data {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface User {
  isDeleted: boolean;
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: string;
  isVerified: boolean;
  auths: Auth[];
  createdAt: string;
  updatedAt: string;
  phone: string;
  bookings: string[];
}

export interface Auth {
  provider: string;
  providerId: string;
  _id: string;
}
