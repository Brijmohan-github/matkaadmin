const InputField = ({
  name,
  placeholder,
  value,
  onChange,
  isRequired = true,
  type = "text",
  meaning = "",
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        required={isRequired}
      />

      <label
        htmlFor={name}
        className="absolute left-4 top-2 text-gray-500 transition-all pointer-events-none"
      >
        {placeholder}
      </label>
      {meaning && (
        <div className="text-xs text-red-500 absolute left-4 top-full">
          {meaning}
        </div>
      )}
    </div>
  );
};

export default InputField;
