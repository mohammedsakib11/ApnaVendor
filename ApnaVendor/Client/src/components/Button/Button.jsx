const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  className = "",
}) => {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",

    secondary:
      "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400",

    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",

    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-5 py-2.5 text-sm",
    large: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-md
        font-medium
        transition-colors
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;