import  { useState } from "react";
import clsx from "clsx";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  type?: "text" | "password";
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearable?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm rounded-md",
  md: "px-3 py-2 text-base rounded-lg",
  lg: "px-4 py-3 text-lg rounded-xl",
};

const variantClasses = {
  filled: "bg-gray-100 dark:bg-gray-800 border border-transparent focus:ring-2 focus:ring-blue-500",
  outlined: "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500",
  ghost: "bg-transparent border-b-2 border-gray-400 dark:border-gray-600 focus:border-blue-500 rounded-none",
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  helperText,
  errorMessage,
  type = "text",
  disabled,
  invalid,
  loading,
  value,
  onChange,
  clearable,
  variant = "outlined",
  size = "md",
}) => {
  const [internalValue, setInternalValue] = useState(value ?? "");
  const [showPassword, setShowPassword] = useState(false);
  const isControlled = value !== undefined;

  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isControlled) onChange?.(e);
    else setInternalValue(e.target.value);
  };

  const handleClear = () => {
    if (isControlled) {
      onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    } else {
      setInternalValue("");
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
      {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</label>}

      {/* Input wrapper */}
      <div className="relative flex items-center">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            "w-full focus:outline-none transition duration-200 shadow-sm",
            sizeClasses[size],
            variantClasses[variant],
            invalid && "border-red-500 text-red-600 placeholder-red-400 focus:ring-red-500",
            disabled && "opacity-50 cursor-not-allowed",
            loading && "animate-pulse bg-gray-200 dark:bg-gray-700"
          )}
        />

        {/* Clear button */}
        {clearable && currentValue && !disabled && (
          <button
            type="button"
            className="absolute right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={handleClear}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}

        {/* Password toggle */}
        {type === "password" && !disabled && (
          <button
            type="button"
            className="absolute right-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        )}
      </div>

      {/* Messages */}
      {!invalid && helperText && <span className="text-xs text-gray-500 dark:text-gray-400">{helperText}</span>}
      {invalid && errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
    </div>
  );
};