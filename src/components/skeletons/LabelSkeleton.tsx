// SearchBarSkeleton.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const LabelSkeleton: React.FC = () => {

    return (
        <div style={{'paddingLeft': '0.3rem'}}>
        <Skeleton width={100} height={30} style={{float: 'left'}}/>
        </div>
    );
};

export default LabelSkeleton;
