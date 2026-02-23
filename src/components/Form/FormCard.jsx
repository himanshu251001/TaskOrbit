const FormCard = ({ children }) => {
  return (
    <div className="card bg-base-100 shadow border border-base-200">
      <div className="card-body space-y-6">{children}</div>
    </div>
  );
}

export default FormCard;

