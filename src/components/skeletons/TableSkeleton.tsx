// TableRowSkeleton.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const TableSkeleton: React.FC = () => {
  return (
    <tr className="table-row-skeleton">
      <td>
        <Skeleton height={30} width={30} circle={true} className='circle'/>
      </td>
      <td>
        <Skeleton height={30} width={100} className='rect'/>
      </td>
      <td>
        <Skeleton height={30} width={100} className='rect'/>
      </td>
      <td>
        <Skeleton height={30} width={100} className='rect'/>
      </td>
      <td>
        <Skeleton height={30} width={100} className='rect'/>
      </td>
      <td>
        <Skeleton height={30} width={30} className='rect'/>
      </td>
    </tr>
  );
};

export default TableSkeleton;
