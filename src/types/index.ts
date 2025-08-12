import { ComponentType } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type { ISendOTP, IVerifyOTP, IRegister, ILogin } from "./auth.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItems {
  title: string;
  url: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
