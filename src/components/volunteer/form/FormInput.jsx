import React from "react";

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  options,
  ...props
}) => {
  const inputProps = {
    name,
    type,
    value,
    onChange,
    className:
      "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500",
    ...props,
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      {type === "select" ? (
        <select {...inputProps}>
          <option value="">{`اختر ${label}`}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea {...inputProps} />
      ) : (
        <input {...inputProps} />
      )}
    </div>
  );
};

export default FormInput;
