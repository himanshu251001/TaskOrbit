/**
 * DateDivider — renders a date badge divider between message groups.
 */
const DateDivider = ({ date }) => {
  return (
    <div className="flex items-center justify-center my-6">
      <span
        className="px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide"
      >
        {date}
      </span>
    </div>
  );
};

export default DateDivider;
