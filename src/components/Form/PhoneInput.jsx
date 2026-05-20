import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const CustomInput = React.forwardRef(({ className, ...props }, ref) => (
  <input
    {...props}
    ref={ref}
    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200
      border-base-300
      text-sm text-base-content bg-base-100 placeholder:text-base-content/40
      disabled:bg-base-200/50 disabled:cursor-not-allowed disabled:text-base-content/50
      focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
      ${className}`}
  />
));

const PhoneInputField = ({
  label = "",
  name = "",
  required = false,
  disabled = false,
  placeholder = "",
}) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-base-content/80" htmlFor={name}>
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      <div className={`phone-input-wrapper ${errors[name] ? "border-error-theme" : ""}`}>
        <Controller
          name={name}
          control={control}
          rules={{
            required: required ? `${label} is required` : false,
            validate: (value) =>
              !value || isValidPhoneNumber(value) || "Please enter a valid international phone number"
          }}
          render={({ field: { onChange, value } }) => (
            <PhoneInput
              id={name}
              international
              defaultCountry="US"
              value={value}
              onChange={onChange}
              disabled={disabled}
              placeholder={placeholder}
              inputComponent={CustomInput}
              className="flex items-center gap-2"
            />
          )}
        />
      </div>

      {errors[name] && (
        <span className="text-error text-xs mt-0.5">{errors[name].message}</span>
      )}

      <style jsx global>{`
        .PhoneInputCountry {
          display: flex;
          align-items: center;
          padding: 0 0.75rem;
          background: var(--color-base-200);
          border: 1px solid var(--color-base-300);
          border-radius: 0.5rem;
          height: 3rem;
          transition: all 0.2s;
        }
        .PhoneInputCountry:has(select:focus) {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary), transparent 80%);
        }
        .PhoneInputCountrySelectArrow {
          display: ${disabled ? "none" : "block"};
          margin-left: 0.5rem;
          opacity: 0.5;
        }
        .PhoneInputInput {
          flex: 1;
        }
        .PhoneInputCountrySelect[disabled] {
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default PhoneInputField;
