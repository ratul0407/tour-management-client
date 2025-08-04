import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface IProps {
  children: ReactNode;
}
export const CommonLayout = ({ children }: IProps) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
