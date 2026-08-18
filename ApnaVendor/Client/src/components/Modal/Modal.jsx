const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "primary",
}) => {
  if (!isOpen) {
    return null;
  }

  const confirmStyles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",

    danger:
      "bg-red-600 text-white hover:bg-red-700",

    secondary:
      "bg-gray-600 text-white hover:bg-gray-700",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-md rounded-lg bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2
            id="modal-title"
            className="text-lg font-semibold text-gray-800"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl leading-none"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 text-sm text-gray-600">
          {children}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              confirmStyles[confirmVariant]
            }`}
          >
            {confirmText}
          </button>

        </div>
      </div>
    </div>
  );
};

export default Modal;