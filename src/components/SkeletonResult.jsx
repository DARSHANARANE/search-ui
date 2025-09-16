import React from "react";

const SkeletonResult = () => (
  <div className="flex items-center gap-3 p-2 rounded-md animate-pulse">
    <div className="bg-gray-300 rounded-full" style={{width: 28, height: 28}} />
    <div className="flex-1">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

export default SkeletonResult;
