import type { ReactNode } from "react";

const Container = ({children}:{children:ReactNode}) => {
  return <div className="container px-4 lg:px-0 py-2">{children}</div>;
};
export default Container;
