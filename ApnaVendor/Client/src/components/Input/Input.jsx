const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  error = "",
  className = "",
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          w-full
          px-4
          py-2.5
          rounded-md
          border
          bg-white
          text-gray-800
          text-sm
          placeholder-gray-400
          outline-none
          transition-colors
          
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          }

          disabled:bg-gray-100
          disabled:cursor-not-allowed
        `}
        {...props}
      />

      {error && (
        <p className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;