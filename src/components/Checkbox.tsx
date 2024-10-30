import { IconCheck } from "@tabler/icons-react";

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  [key: string]: any;
}

export const Checkbox = ({
  label,
  checked,
  onChange,
  ...props
}: CheckboxProps) => (
  <label className="inline-flex items-center cursor-pointer group">
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <div
        className={`w-6 h-6 border-2 rounded-md ${
          checked
            ? "bg-[var(--primary)] border-[var(--primary)]"
            : "border-gray-300 group-hover:border-[var(--primary)]"
        } transition-colors duration-200 ease-in-out`}
      >
        {checked && (
          <IconCheck className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>
    </div>
    <span className="ml-3 group-hover:text-[var(--primary)] transition-colors duration-200">
      {label || props.name}
    </span>
  </label>
);
