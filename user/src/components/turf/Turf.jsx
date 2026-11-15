import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import TurfCard from "./TurfCard.jsx";
import TurfFilters from "./TurfFilters.jsx";
import TurfCardSkeleton from "../ui/TurfCardSkeleton.jsx";
import SearchTurf from "../search/SearchTurf.jsx";
import Chip from "../common/Chip.jsx";
import Footer from "../layout/Footer";
import useTurfData from "../../hooks/useTurfData.jsx";
import { isOpenNow } from "../../utils/dateUtils.jsx";

const STEP = 100;
const SORTERS = {
  rating: (a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0),
  low: (a, b) => a.pricePerHour - b.pricePerHour,
  high: (a, b) => b.pricePerHour - a.pricePerHour,
};

const matches = (turf, query) =>
  [turf.name, turf.location, ...(turf.sportTypes ?? [])].some((v) => v?.toLowerCase().includes(query));

const Turf = () => {
  const { turfs, loading, error } = useTurfData();
  const [params] = useSearchParams();
  const [term, setTerm] = useState("");
  const [sport, setSport] = useState("All");
  const [maxPrice, setMaxPrice] = useState(null);
  const [minRating, setMinRating] = useState(0);
  const [openOnly, setOpenOnly] = useState(false);
  const [sort, setSort] = useState("rating");
  const [layout, setLayout] = useState("grid");
  const [sheetOpen, setSheetOpen] = useState(false);
  const deferredTerm = useDeferredValue(term);

  const sports = useMemo(() => ["All", ...new Set(turfs.flatMap((t) => t.sportTypes ?? []))], [turfs]);
  const ceiling = useMemo(
    () => Math.max(STEP * 10, Math.ceil(Math.max(0, ...turfs.map((t) => t.pricePerHour)) / STEP) * STEP),
    [turfs]
  );
  const limit = Math.min(maxPrice ?? ceiling, ceiling);
  const sheetCount = Number(limit < ceiling) + Number(minRating > 0);

  const results = useMemo(() => {
    const query = deferredTerm.trim().toLowerCase();
    return turfs
      .filter(
        (t) =>
          (!query || matches(t, query)) &&
          (sport === "All" || t.sportTypes?.includes(sport)) &&
          t.pricePerHour <= limit &&
          (t.averageRating ?? 0) >= minRating &&
          (!openOnly || isOpenNow(t.openTime, t.closeTime))
      )
      .sort(SORTERS[sort]);
  }, [turfs, deferredTerm, sport, limit, minRating, openOnly, sort]);

  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e) => e.key === "Escape" && setSheetOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sheetOpen]);

  const resetSheet = () => {
    setMaxPrice(null);
    setMinRating(0);
  };
  const resetAll = () => {
    resetSheet();
    setSport("All");
    setOpenOnly(false);
    setTerm("");
  };

  const filterProps = {
    sports,
    sport,
    onSport: setSport,
    openOnly,
    onOpenOnly: setOpenOnly,
    limit,
    ceiling,
    onLimit: setMaxPrice,
    minRating,
    onRating: setMinRating,
    step: STEP,
  };
  const countLabel = loading ? "Finding…" : `${results.length} turf${results.length === 1 ? "" : "s"}`;
  const gridClass =
    layout === "list" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3";

  if (error) return <div className="alert alert-error m-4">Could not load turfs: {error}</div>;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-4 lg:py-6">
        <div className="mb-3 flex items-end justify-between gap-3 lg:mb-5">
          <div>
            <h1 className="text-[32px] uppercase lg:text-5xl">Discover turfs</h1>
            <p className="hidden opacity-70 lg:block">{countLabel} · book by the hour</p>
          </div>
          <div className="join hidden lg:flex" role="group" aria-label="Layout">
            {[
              ["grid", LayoutGrid, "Grid view"],
              ["list", List, "List view"],
            ].map(([value, Icon, label]) => (
              <button
                key={value}
                type="button"
                aria-label={label}
                aria-pressed={layout === value}
                onClick={() => setLayout(value)}
                className={`btn btn-sm join-item ${layout === value ? "btn-primary text-white" : ""}`}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        <div className="sticky top-[68px] z-10 -mx-4 bg-base-100 px-4 pb-1 pt-1.5 lg:static lg:mx-0 lg:px-0">
          <SearchTurf value={term} onChange={setTerm} autoFocus={params.has("search")}>
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              aria-label={`Open filters${sheetCount ? `, ${sheetCount} active` : ""}`}
              className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-base-200 lg:hidden"
            >
              <SlidersHorizontal size={18} />
              {sheetCount > 0 && (
                <b className="absolute -right-1.5 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primary text-[11px] text-white">
                  {sheetCount}
                </b>
              )}
            </button>
          </SearchTurf>
          <div
            role="group"
            aria-label="Quick filters"
            className="no-scrollbar -mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1.5 lg:hidden"
          >
            {sports.map((s) => (
              <Chip key={s} active={sport === s} onClick={() => setSport(s)}>
                {s}
              </Chip>
            ))}
            <Chip active={openOnly} onClick={() => setOpenOnly(!openOnly)}>
              <i className="h-2 w-2 rounded-full bg-green-400" /> Open now
            </Chip>
          </div>
        </div>

        <div className="mt-3 grid items-start gap-5 lg:grid-cols-[260px_1fr]">
          <aside className="sticky top-24 hidden rounded-[22px] border border-base-300 bg-base-100 p-5 shadow-sm lg:block">
            <h3 className="mb-3 text-xl">
              Filters{sheetCount + Number(sport !== "All") + Number(openOnly) > 0 ? " · active" : ""}
            </h3>
            <TurfFilters {...filterProps} showQuick />
            <button type="button" onClick={resetAll} className="btn btn-ghost btn-sm mt-5 w-full">
              Reset filters
            </button>
          </aside>

          <section>
            <div className="mb-3 flex items-center gap-2">
              <span className="shrink-0 text-sm opacity-70 lg:hidden">{countLabel}</span>
              <div className="no-scrollbar flex min-w-0 flex-1 gap-2 overflow-x-auto">
                {limit < ceiling && (
                  <Chip active onClick={() => setMaxPrice(null)}>
                    Up to ₹{limit} <X size={12} />
                  </Chip>
                )}
                {minRating > 0 && (
                  <Chip active onClick={() => setMinRating(0)}>
                    Rating {minRating}+ <X size={12} />
                  </Chip>
                )}
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort turfs"
                className="select select-bordered select-sm ml-auto"
              >
                <option value="rating">Top rated</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </div>

            {loading ? (
              <div className={`grid gap-3 sm:gap-5 ${gridClass}`}>
                {Array.from({ length: 4 }, (_, i) => (
                  <TurfCardSkeleton key={i} />
                ))}
              </div>
            ) : results.length ? (
              <div className={`grid gap-3 sm:gap-5 ${gridClass}`}>
                {results.map((turf, i) => (
                  <TurfCard key={turf._id} turf={turf} index={i} list={layout === "list"} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-base-300 p-10 text-center">
                <h3>No turfs match</h3>
                <p className="mb-4 opacity-70">Try removing a filter or searching a different sport.</p>
                <button type="button" onClick={resetAll} className="btn btn-primary text-white">
                  Reset filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {sheetOpen && (
        <div className="modal modal-open modal-bottom" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="modal-box">
            <h3 className="mb-3">Filters</h3>
            <TurfFilters {...filterProps} />
            <div className="mt-6 flex gap-2">
              <button type="button" className="btn flex-1" onClick={resetSheet} disabled={!sheetCount}>
                Reset
              </button>
              <button type="button" className="btn btn-primary flex-[2] text-white" onClick={() => setSheetOpen(false)}>
                Show {results.length} turf{results.length === 1 ? "" : "s"}
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={() => setSheetOpen(false)} />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Turf;
