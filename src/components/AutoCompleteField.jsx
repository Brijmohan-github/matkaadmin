import { AutoComplete } from "antd";

const AutoCompleteField = ({
  name,
  placeholder,
  options,
  onSelect,
  onSearch,
  value,
  isRequired = true,
}) => {
  return (
    <div className="relative">
      <AutoComplete
        options={options}
        onSelect={onSelect}
        onSearch={onSearch}
        value={value}
        isRequired
        placeholder={placeholder}
        className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        popupClassName="block mt-1 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      />
      <label
        htmlFor={name} 
        className="absolute left-4 top-2 text-gray-500 transition-all pointer-events-none"
      >
        {placeholder}
      </label>
    </div>
  );
};

export default AutoCompleteField;
