import React, { type FunctionComponent } from "react";
import {
  type FieldError,
  type FieldErrorsImpl,
  type UseFormRegisterReturn,
} from "react-hook-form";

import { getErrorMessage } from "~/utils/react-hook-form-errors";
import { Input, type InputProps } from "./input";
import { Label } from "./label";

type HookFormInputProps = {
  label?: string;
  register?: UseFormRegisterReturn;
  errors?: Partial<FieldErrorsImpl>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const HookFormImput = React.forwardRef<HTMLInputElement, HookFormInputProps>(
  ({ label, register, errors, className, ...props }, ref) => {
    const error = register?.name && getErrorMessage(errors, register.name);
    return (
      <>
        <Label htmlFor={register?.name} className="text-brand-700">
          {label}
        </Label>
        <Input
          ref={ref}
          className={`placeholder:text-start ${className}`}
          type="text"
          {...props}
          {...register}
        />
        {error && <span className="mt-2 block text-red-500">{error}</span>}
      </>
    );
  },
);
HookFormImput.displayName = "HookFormImput";
export default HookFormImput;
