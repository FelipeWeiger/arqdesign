import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, helperText, ...props }, ref) => {
    const inputStyles = `
      w-full px-3 py-2
      bg-[#fafbfc]
      border border-[#dfe1e6]
      rounded-[3px]
      text-[#172b4d]
      placeholder:text-[#8993a4]
      focus:bg-white
      focus:border-[#0079bf]
      focus:outline-none
      focus:ring-2
      focus:ring-[#0079bf]/20
      transition-all duration-200
      ${error ? 'border-[#eb5a46] focus:border-[#eb5a46] focus:ring-[#eb5a46]/20' : ''}
      ${className}
    `.trim();

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#172b4d] mb-1.5">
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={inputStyles}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? 'error-message' : helperText ? 'helper-text' : undefined
          }
          {...props}
        />

        {error && (
          <p id="error-message" className="mt-1.5 text-sm text-[#eb5a46] flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id="helper-text" className="mt-1.5 text-sm text-[#5e6c84]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;