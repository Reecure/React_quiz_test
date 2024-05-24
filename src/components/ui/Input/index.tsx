import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'onChange' | 'className'
>;

type VariantTypes = 'clear' | 'primary';

const variantClasses: Record<VariantTypes, string> = {
  clear: '',
  primary: 'bg-gray-600 w-full px-2 py-1 outline-none rounded-md',
};

interface Props extends HTMLInputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  variant: VariantTypes;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { onChange, variant, name, className, ...otherProps } = props;

  return (
    <input
      ref={ref}
      name={name}
      onChange={onChange}
      className={`${variantClasses[variant]} ${className}`}
      {...otherProps}
    />
  );
});

export default Input;
