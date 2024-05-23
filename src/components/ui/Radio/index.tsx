import { FC, forwardRef, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  htmlFor?: string;
  checked: boolean;
  onChange: () => void;
  value: string | number;
}

const Radio: FC<Props> = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { htmlFor, checked, onChange, value, ...otherProps } = props;

  return (
    <div className="inline-flex items-center">
      <label
        className="relative flex items-center rounded-full cursor-pointer"
        htmlFor={htmlFor}
      >
        <input
          ref={ref}
          type="radio"
          name="quiz-answer"
          value={value}
          checked={checked}
          onChange={onChange}
          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border
          border-blue-gray-200 text-green-500 transition-all
          before:absolute before:top-2/4 before:left-2/4
          before:block before:h-12 before:w-12 before:-translate-y-2/4
          before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500
          before:opacity-0 before:transition-opacity checked:border-green-500"
          {...otherProps}
        />
        {checked && (
          <span className="absolute inset-0 flex items-center justify-center text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <circle cx="8" cy="8" r="8" />
            </svg>
          </span>
        )}
      </label>
    </div>
  );
});

export default Radio;
