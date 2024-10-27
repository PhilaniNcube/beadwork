import { ScrollArea } from "@/components/ui/scroll-area";
import type { ReactNode } from "react";

const layout = ({children}:{children:ReactNode}) => {
  return (
    <ScrollArea className="h-[calc(100vh-120px)]">
      {children}
    </ScrollArea>
  );
};
export default layout;
