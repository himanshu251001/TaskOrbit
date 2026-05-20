const FormCard = ({ title, subtitle, children, actions }) => {
  return (
    <div className="bg-base-100 rounded-xl shadow-sm border border-base-200 overflow-hidden">
      {(title || subtitle) && (
        <div className="px-6 py-5 border-b border-base-200 bg-base-100">
          {title && (
            <h2 className="text-2xl font-semibold text-base-content">{title}</h2>
          )}
          {subtitle && (
            <p className="text-sm text-base-content/70 mt-1">{subtitle}</p>
          )}
        </div>
      )}

      <div className="px-6 py-8 flex flex-col gap-8">{children}</div>

      {actions && (
        <div className="px-6 py-4 bg-base-200/50 border-t border-base-200 flex items-center justify-end gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};

export default FormCard;
