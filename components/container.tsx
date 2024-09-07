import type { ReactNode } from "react";

const Container = ({children}:{children:ReactNode}) => {
  return <div className="container px-4 py-2 lg:px-2">{children}</div>;
};
export default Container;
