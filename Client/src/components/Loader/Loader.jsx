const Loader = ({
  size = "medium",
  text = "",
  className = "",
}) => {
  const sizes = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-4",
    large: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <div
        className={`
          ${sizes[size]}
          rounded-full
          border-gray-200
          border-t-blue-600
          animate-spin
        `}
      />

      {text && (
        <p className="text-sm text-gray-600">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;