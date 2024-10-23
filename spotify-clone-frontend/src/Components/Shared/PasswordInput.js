//import { Icon } from "@iconify/react";

const PasswordInput = ({ label, placeholder, className, value, setValue }) => {
  return (
    <div className={`textInputDiv flex flex-col space-y-1 w-full ${className}`}>
      <label htmlFor={label} className="font-medium">
        {label}
      </label>
      <input
        type="password"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="p-2 border border-gray-300 border-solid rounded-md placeholder-gray-400 bg-transparent text-white hover:border-white"
        id={label}
      ></input>
    </div>
  );
};

export default PasswordInput;
