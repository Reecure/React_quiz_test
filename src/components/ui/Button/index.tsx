import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

type VariantTypes = 'clear' | 'green';

const variantClasses: Record<VariantTypes, string> = {
  clear: '',
  green: 'rounded-md bg-green-700 w-24 h-10',
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  onClick?: () => void;
  variant: VariantTypes;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { children, onClick, variant, className, ...otherProps } = props;

  return (
    <button
      ref={ref}
      onClick={onClick}
      {...otherProps}
      type="button"
      className={`${variantClasses[variant]} ${className} `}
    >
      {children}
    </button>
  );
});

export default Button;
