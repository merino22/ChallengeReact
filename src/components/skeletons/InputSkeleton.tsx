// SearchBarSkeleton.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const InputSkeleton: React.FC = () => {

    const inputStyle: React.CSSProperties = {
        height: '2rem',
        marginInline: '0.3rem'
    }

    return (
        <div className="search-bar-skeleton">
        <Skeleton style={inputStyle}/>
        </div>
    );
};

export default InputSkeleton;
