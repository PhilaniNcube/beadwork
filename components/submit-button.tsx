"use client";

import { useFormStatus } from "react-dom";
import type { ComponentProps } from "react";
import { Button } from "./ui/button";
import { CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
  className?: string;
};

export function SubmitButton({ children, className  }: Props) {
  const { pending, action } = useFormStatus();



  return (
    <Button  type="submit" aria-disabled={pending} disabled={pending} className={cn("rounded-sm", className)}>
      {pending ? <CircleDashed className="animate-spin"  /> : children}
    </Button>
  );
}
