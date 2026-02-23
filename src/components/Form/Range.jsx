const Range =  ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  required = false,
}) => {
  return (
    <div className={`form-control justify-center w-full`}>
      <div>
      <label className="label text-center">
       <span className="label-text font-semibold ">{label}</span>
        {required && <span className="text-error ml-1">*</span>}
        <span className="label-text-alt px-2"><strong>${value}</strong></span>
      </label>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        required={required}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range range-xs w-full"
      />
      </div>
    </div>
  );
}

export default Range;
