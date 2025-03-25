export const AccountSkeleton = () => {
  return (
    <div className="p-4 border rounded-lg dark:border-stone-700 animate-pulse">
      <div className="h-5 w-32 bg-stone-200 dark:bg-stone-700 rounded mb-3"></div>
      <div className="h-7 w-24 bg-stone-200 dark:bg-stone-700 rounded mb-2"></div>
      <div className="h-4 w-40 bg-stone-200 dark:bg-stone-700 rounded"></div>
    </div>
  );
};
