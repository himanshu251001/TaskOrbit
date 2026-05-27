import { CircleAlert, CircleCheck, CircleX } from "lucide-react";

function Alert({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText = "Yes",
  cancelText = "No",
}) {
  if (!isOpen) return null;

  const alertClass = `alert alert-vertical alert-info max-w-md shadow-lg`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={alertClass}>
        <CircleAlert size={24} color="white"/>
        <span className="text-center font-medium text-white">{message}</span>
        <div className="flex gap-2">
          {onConfirm && (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                onConfirm();
              }}
            >
              {confirmText}
            </button>
          )}
          <button className="btn btn-sm" onClick={onClose}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Alert;
