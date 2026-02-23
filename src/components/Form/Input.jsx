const Input = ({
  label="",
  name="",
  value="",
  onChange,
  type = "text",
  placeholder="",
 
  required = false,
}) => {
  return (
    <div className={`form-control w-full`}>
      <label className="label">
        <span className="label-text font-semibold pb-1">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={(e) => onChange(name, e.target.value)}
        className="input input-bordered w-full"
      />
    </div>
  );
}
export default Input;