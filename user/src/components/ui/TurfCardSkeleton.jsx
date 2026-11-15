const TurfCardSkeleton = () => (
  <div className="flex animate-pulse overflow-hidden rounded-[20px] border border-base-300 bg-base-100 sm:flex-col">
    <div className="h-28 w-[104px] bg-base-300 sm:aspect-video sm:h-auto sm:w-full" />
    <div className="flex-1 space-y-3 p-4">
      <div className="h-6 w-3/4 rounded bg-base-300" />
      <div className="h-4 w-1/2 rounded bg-base-300" />
      <div className="h-8 w-1/3 rounded bg-base-300" />
    </div>
  </div>
);

export default TurfCardSkeleton;
