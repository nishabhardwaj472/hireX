const DrawerSkeletonLoader = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="skeleton h-3.5 w-1/2 mb-6" />
      <div className="skeleton h-3 w-full" />
      <div className="skeleton h-3 w-[92%]" />
      <div className="skeleton h-3 w-[85%]" />
      <div className="skeleton h-3 w-[75%]" />
      <div className="h-px bg-white/[0.06] my-6" />
      <div className="skeleton h-3 w-full" />
      <div className="skeleton h-3 w-[88%]" />
      <div className="skeleton h-3 w-[70%]" />
      <div className="skeleton h-3 w-[95%]" />
      <div className="skeleton h-3 w-[60%]" />
      <div className="h-px bg-white/[0.06] my-6" />
      <div className="skeleton h-28 w-full rounded-xl" />
    </div>
  );
};

export default DrawerSkeletonLoader;
