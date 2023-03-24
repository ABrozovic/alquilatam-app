import * as React from "react";

import { cn } from "~/utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "border-brand-700 focus:ring-brand-500 flex h-10 w-full rounded-xl border bg-transparent py-2 px-3 text-sm placeholder:text-center placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
