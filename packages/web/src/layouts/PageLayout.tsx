import type { ReactNode } from "react";
import Navbar from "../components/Navbar";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg mx-auto container px-4 py-4 pb-[34vh]">{children}</div>
    </>
  );
};

export default PageLayout;
