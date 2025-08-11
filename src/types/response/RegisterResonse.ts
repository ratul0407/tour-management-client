export interface IRegisterResponse {
  data: Data;
}

export interface Data {
  user: User;
}

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
  isDeleted: boolean;
  isActive: string;
  isVerified: boolean;
  auths: Auth[];
  bookings: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Auth {
  provider: string;
  providerId: string;
  _id: string;
}
