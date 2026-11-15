const Chip = ({ active, onClick, children, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`btn btn-sm shrink-0 rounded-full ${
      active ? "btn-primary text-white" : "btn-outline border-base-300 font-medium"
    } ${className}`}
  >
    {children}
  </button>
);

export default Chip;
