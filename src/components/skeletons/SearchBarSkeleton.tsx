// SearchBarSkeleton.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SearchBarSkeleton: React.FC = () => {
  return (
    <div className="search-bar-skeleton">
      <Skeleton height={30} width={150} />
    </div>
  );
};

export default SearchBarSkeleton;
