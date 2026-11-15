import { NavLink } from "react-router-dom";

const TABS = [
  ["/admin/owner-requests/new", "New"],
  ["/admin/owner-requests/rejected", "Rejected"],
];

const RequestTabs = () => (
  <div className="join mb-5 w-full max-w-xs" role="group" aria-label="Request status">
    {TABS.map(([to, label]) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) => `btn join-item flex-1 ${isActive ? "btn-primary text-white" : ""}`}
      >
        {label}
      </NavLink>
    ))}
  </div>
);

export default RequestTabs;
