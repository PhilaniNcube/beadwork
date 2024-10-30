const ProductDetailSkeleton = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col col-span-1 gap-y-4">
          <div className="w-full rounded aspect-square bg-slate-300 animate-pulse"></div>
          <div className="grid grid-cols-3 gap-3">
            <div className="w-full rounded aspect-square bg-slate-300 animate-pulse"></div>
            <div className="w-full rounded aspect-square bg-slate-300 animate-pulse"></div>
            <div className="w-full rounded aspect-square bg-slate-300 animate-pulse"></div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <div className="w-full h-16 mb-6 rounded bg-slate-300" />
          <div className="flex flex-row gap-x-3">
            <h2 className="text-sm font-medium">Category:</h2>
            <div className="w-16 h-6 rounded bg-slate-300 animate-pulse"></div>
            <div className="w-16 h-6 rounded bg-slate-300 animate-pulse"></div>
          </div>
          <div className="flex flex-row mt-6 gap-x-3">
            <h2 className="text-sm font-medium">Material:</h2>
            <div className="w-16 h-6 rounded bg-slate-300 animate-pulse"></div>
            <div className="w-16 h-6 rounded bg-slate-300 animate-pulse"></div>
          </div>
          <div className="w-full h-8 mb-2 rounded bg-slate-300" />
          <div className="w-full h-8 mb-2 rounded bg-slate-300" />
          <div className="w-full h-8 mb-2 rounded bg-slate-300" />
          <div className="w-full h-8 mb-2 rounded bg-slate-300" />
          <div className="w-full h-8 mb-2 rounded bg-slate-300" />
          <div className="w-1/3 h-16 mb-2 rounded bg-slate-300" />
        </div>
      </div>
    </div>
  );
};
export default ProductDetailSkeleton;
