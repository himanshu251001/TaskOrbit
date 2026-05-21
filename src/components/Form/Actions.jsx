import { Rocket } from "lucide-react";

const Actions = ({
    cancelLabel = "Cancel",
    submitLabel = "Create Project",
    showIcon = true,
    onCancel,
}) => {
    return (
        <>
            <button
                type="button"
                className="px-6 py-3 text-base-content text-sm font-medium cursor-pointer hover:bg-base-300 rounded-lg transition-colors active:opacity-80"
                onClick={onCancel}
            >
                {cancelLabel}
            </button>
            <button
                type="submit"
                className="px-6 py-2.5 bg-primary text-primary-content text-sm cursor-pointer font-medium rounded-lg shadow-md
                    hover:opacity-90 active:opacity-80 transition-all flex items-center gap-2"
            >
                <span>{submitLabel}</span>
                {showIcon && <Rocket size={16} />}
            </button>
        </>
    );
};

export default Actions;
