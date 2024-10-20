import React from "react";

const MyInput = ({
  label,
  name,
  type = "text",
  className = "",
  icon = null,
  placeholder = "",
  required = true,
  ...rest
}) => {
  return (
    <div className="relative space-y-2">
      <label className="font-medium" htmlFor={name}>
        {label}
        {label && required && "*"}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={`${className} ${
          rest.readOnly && "pointer-events-none bg-neutral-300 !text-black"
        } w-full transitional rounded px-3 py-3 bg-white outline-none border border-neutral2-700 focus:border-neutral2-400`}
        required={required}
        {...rest}
      />
      {icon}
    </div>
  );
};

export default MyInput;
