import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantStyles = {
      primary: 'bg-[#0079bf] text-white hover:bg-[#026aa7] focus:ring-[#0079bf]',
      secondary: 'bg-white text-[#172b4d] border border-[#dfe1e6] hover:bg-[#f4f5f7] focus:ring-[#0079bf]',
      ghost: 'bg-transparent text-[#5e6c84] hover:bg-[#091e420a] hover:text-[#172b4d] focus:ring-[#0079bf]',
      danger: 'bg-[#eb5a46] text-white hover:bg-[#cf513d] focus:ring-[#eb5a46]',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-2',
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return (
      <button
        ref={ref}
        className={combinedClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;