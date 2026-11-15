import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { differenceInCalendarDays, format, isToday, isYesterday } from "date-fns";

const PAGE_SIZE = 8;
const inr = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
const initials = (name = "") =>
  name.split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";
const dayLabel = (d) => (isToday(d) ? "Today" : isYesterday(d) ? "Yesterday" : format(d, "EEE, d MMM"));
const csvCell = (v) => {
  const s = String(v ?? "");
  return `"${(/^[=+\-@]/.test(s) ? `'${s}` : s).replace(/"/g, '""')}"`;
};

const SORTS = {
  new: (a, b) => b.date - a.date || (b.order ?? 0) - (a.order ?? 0),
  old: (a, b) => a.date - b.date || (a.order ?? 0) - (b.order ?? 0),
  hi: (a, b) => b.amount - a.amount,
  lo: (a, b) => a.amount - b.amount,
  az: (a, b) => a.name.localeCompare(b.name),
};
const MONEY_SORTS = [["new", "Newest"], ["old", "Oldest"], ["hi", "Amount: high to low"], ["lo", "Amount: low to high"], ["az", "Name A–Z"]];
const PLAIN_SORTS = [["az", "Name A–Z"], ["new", "Newest first"]];
const TONES = { Paid: "success", Confirmed: "success", Active: "success", Refunded: "error", Owner: "primary" };

const Status = ({ value }) => (
  <span className={`badge badge-outline whitespace-nowrap ${TONES[value] ? `badge-${TONES[value]}` : ""}`}>{value}</span>
);
const Avatar = ({ name, size = "h-9 w-9" }) => (
  <span className={`grid ${size} shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary`}>
    {initials(name)}
  </span>
);

/**
 * rows: { id, name, sub, meta, status, date: Date, amount?, order?, extra?: [label, value][], to?, toLabel? }
 */
const Ledger = ({ rows, noun, headers, money = false, tabs = false, toolbar = null }) => {
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState("all");
  const [sort, setSort] = useState(money ? "new" : "az");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = rows.filter((r) => !q || [r.name, r.sub, r.meta, r.id].some((v) => String(v ?? "").toLowerCase().includes(q)));
    if (tabs && period === "today") list = list.filter((r) => isToday(r.date));
    if (tabs && period === "week") list = list.filter((r) => differenceInCalendarDays(new Date(), r.date) < 7);
    return [...list].sort(SORTS[sort]);
  }, [rows, query, period, sort, tabs]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages - 1);
  const visible = filtered.slice(current * PAGE_SIZE, (current + 1) * PAGE_SIZE);
  const total = filtered.reduce((sum, r) => sum + (r.amount || 0), 0);
  const grouped = money && (sort === "new" || sort === "old");
  const stats = money
    ? [[`Total ${noun}s`, filtered.length], ["Revenue", inr(total)], ["Average", inr(filtered.length ? Math.round(total / filtered.length) : 0)]]
    : [["Total", filtered.length]];

  const change = (setter) => (value) => {
    setter(value);
    setPage(0);
  };

  const exportCsv = () => {
    const head = ["ID", "Name", "Details", "Info", "Status", "Amount", "Date"];
    const body = filtered.map((r) => [r.id, r.name, r.sub, r.meta, r.status, r.amount ?? "", r.date ? format(r.date, "yyyy-MM-dd") : ""]);
    const csv = [head, ...body].map((line) => line.map(csvCell).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `${noun}s-${format(new Date(), "yyyy-MM-dd")}.csv` });
    a.click();
    URL.revokeObjectURL(url);
  };

  const cols = "md:grid md:grid-cols-[minmax(0,2.4fr)_minmax(0,1.3fr)_120px_110px_20px] md:items-center md:gap-3";
  let lastDay = "";

  return (
    <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
      <div className="grid border-b border-base-300" style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}>
        {stats.map(([label, value]) => (
          <div key={label} className="border-r border-base-300 p-3 last:border-r-0 md:px-5 md:py-4">
            <p className="text-xs opacity-60">{label}</p>
            <p className="font-display text-2xl font-bold tabular-nums md:text-3xl">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2.5 border-b border-base-300 p-3 md:p-4">
        {tabs && (
          <div className="join w-full md:w-auto" role="group" aria-label="Period">
            {[["all", "All"], ["today", "Today"], ["week", "7 days"]].map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={period === value}
                onClick={() => change(setPeriod)(value)}
                className={`btn btn-sm join-item flex-1 ${period === value ? "btn-primary text-white" : ""}`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
        <label className="flex min-w-[160px] flex-1 items-center gap-2 rounded-xl bg-base-200 px-3 opacity-90 focus-within:ring-2 focus-within:ring-primary/30">
          <Search size={16} className="opacity-60" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => change(setQuery)(e.target.value)}
            placeholder={`Search ${noun}s`}
            aria-label={`Search ${noun}s`}
            className="h-10 w-full min-w-0 bg-transparent outline-none [&::-webkit-search-cancel-button]:hidden"
          />
        </label>
        {toolbar}
        <select
          value={sort}
          onChange={(e) => change(setSort)(e.target.value)}
          aria-label="Sort"
          className="select select-bordered select-sm"
        >
          {(money ? MONEY_SORTS : PLAIN_SORTS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button type="button" onClick={exportCsv} disabled={!filtered.length} className="btn btn-sm gap-1.5">
          <Download size={15} /> Export
        </button>
      </div>

      <div className={`hidden bg-base-200 px-4 py-2.5 text-xs font-bold uppercase tracking-wider opacity-70 ${cols}`}>
        <span>{headers[0]}</span>
        <span>{headers[1]}</span>
        <span>Status</span>
        <span className="text-right">{money ? "Amount" : ""}</span>
        <span />
      </div>

      {visible.length === 0 ? (
        <div className="p-10 text-center opacity-70">
          No {noun}s match your filters.
          <div>
            <button
              className="btn btn-sm mt-3"
              onClick={() => {
                setQuery("");
                setPeriod("all");
                setPage(0);
              }}
            >
              Clear filters
            </button>
          </div>
        </div>
      ) : (
        visible.map((row) => {
          const day = grouped ? row.date.toDateString() : "";
          const header =
            grouped && day !== lastDay
              ? (lastDay = day, visible.filter((r) => r.date.toDateString() === day))
              : null;
          return (
            <div key={row.id}>
              {header && (
                <div className="flex justify-between border-y border-base-300 bg-base-200/60 px-4 py-2 text-sm">
                  <b>{dayLabel(row.date)}</b>
                  <span className="opacity-70">
                    {header.length} {noun}
                    {header.length === 1 ? "" : "s"} · {inr(header.reduce((s, r) => s + (r.amount || 0), 0))}
                  </span>
                </div>
              )}
              <button
                type="button"
                onClick={() => setSelected(row)}
                className={`w-full border-b border-base-300 px-4 py-3 text-left transition hover:bg-base-200 ${cols}`}
              >
                <div className="flex items-center justify-between gap-3 md:contents">
                  <div className="flex min-w-0 items-center gap-3 md:order-1">
                    <Avatar name={row.name} />
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{row.name}</p>
                      <p className="truncate text-sm opacity-70">{row.sub}</p>
                    </div>
                  </div>
                  {money && (
                    <span className="font-display text-xl font-bold tabular-nums md:order-4 md:text-right">{inr(row.amount)}</span>
                  )}
                </div>
                <div className="mt-1.5 flex items-center justify-between gap-3 md:contents">
                  <span className="truncate text-sm opacity-70 md:order-2">{row.meta}</span>
                  <span className="md:order-3">
                    <Status value={row.status} />
                  </span>
                </div>
                <ChevronRight size={16} className="hidden opacity-50 md:order-5 md:block" aria-hidden="true" />
              </button>
            </div>
          );
        })
      )}

      <div className="flex items-center justify-between p-3 md:px-4">
        <span className="text-sm opacity-70">
          {filtered.length ? `${current * PAGE_SIZE + 1}–${current * PAGE_SIZE + visible.length} of ${filtered.length}` : "0 results"}
        </span>
        <div className="join">
          <button className="btn btn-sm join-item" disabled={current === 0} onClick={() => setPage(current - 1)} aria-label="Previous page">
            <ChevronLeft size={16} />
          </button>
          <button className="btn btn-sm join-item" disabled={current >= pages - 1} onClick={() => setPage(current + 1)} aria-label="Next page">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {selected && (
        <div className="modal modal-open modal-bottom sm:modal-middle" role="dialog" aria-modal="true" aria-label={`${noun} details`}>
          <div className="modal-box">
            <div className="mb-3 flex items-center gap-3">
              <Avatar name={selected.name} size="h-11 w-11" />
              <div className="min-w-0">
                <h3 className="truncate">{selected.name}</h3>
                <p className="truncate text-sm opacity-70">{selected.sub}</p>
              </div>
            </div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
              {[
                ["Reference", <code key="r" className="text-xs">{selected.id}</code>],
                ...(selected.date && selected.date.getTime() > 0 ? [["Date", dayLabel(selected.date)]] : []),
                ...(money ? [["Amount", <b key="a">{inr(selected.amount)}</b>]] : []),
                ["Details", selected.meta],
                ...(selected.extra ?? []),
                ["Status", <Status key="s" value={selected.status} />],
              ].map(([label, value]) => (
                <div key={label} className="contents">
                  <dt className="opacity-60">{label}</dt>
                  <dd className="min-w-0 break-words text-right">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelected(null)}>
                Close
              </button>
              {selected.to && (
                <Link to={selected.to} className="btn btn-primary text-white">
                  {selected.toLabel ?? "Open"}
                </Link>
              )}
            </div>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={() => setSelected(null)} />
        </div>
      )}
    </div>
  );
};

export default Ledger;
