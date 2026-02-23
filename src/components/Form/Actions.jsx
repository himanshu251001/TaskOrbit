const Actions = () => {
    return (
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-base-200">
            <button type="button" className="btn btn-ghost w-full sm:w-auto">
                Cancel
            </button>
            <button type="submit" className="btn btn-primary w-full sm:w-auto">
                Create Project
            </button>
        </div>
    );
}

export default Actions;
