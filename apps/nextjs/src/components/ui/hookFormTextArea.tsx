import React from "react";
import {
  type FieldErrorsImpl,
  type UseFormRegisterReturn,
} from "react-hook-form";

import { getErrorMessage } from "~/utils/react-hook-form-errors";
import { Label } from "./label";
import { Textarea } from "./textarea";

type HookFormInputProps = {
  label?: string;
  register?: UseFormRegisterReturn;
  errors?: Partial<FieldErrorsImpl>;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

const HookFormTextArea = React.forwardRef<
  HTMLTextAreaElement,
  HookFormInputProps
>(({ label, register, errors, className, ...props }, ref) => {
  const error = register?.name && getErrorMessage(errors, register.name);
  return (
    <>
      <Label htmlFor={register?.name} className="text-brand-700">
        {label}
      </Label>
      <Textarea
        ref={ref}
        className={`border-brand-700  ${className}`}
        type="text"
        {...props}
        {...register}
      />
      {error && <span className="mt-2 block text-red-500">{error}</span>}
    </>
  );
});
HookFormTextArea.displayName = "HookFormTextArea";
export default HookFormTextArea;
