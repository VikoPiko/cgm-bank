import { Control, Controller, useFormContext } from "react-hook-form";

interface CustomInputProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  label,
  placeholder,
  type = "text",
}) => {
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col">
          <label className="text-sm font-medium">{label}</label>
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={`border p-2 rounded-md ${
              errors[name] ? "border-red-500" : "border-gray-300"
            }`}
            onChange={(e) => {
              field.onChange(e);
              clearErrors(name); // ✅ Clear error when user types
            }}
          />
          {errors[name] && (
            <span className="text-red-500 text-xs">
              {typeof errors[name]?.message === "string"
                ? errors[name]?.message
                : "Invalid input"}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default CustomInput;
