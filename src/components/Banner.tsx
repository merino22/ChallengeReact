import React from "react";

interface BannerProps {
    content?: string;
    className?: string
}

const Banner: React.FC<BannerProps> = ({content = '', className = ''}) => {
    return (
        <div className={className} style={{padding: '1rem'}}>
            <img className="banner" alt="Pichincha" content={content} src="https://www.pichincha.com/content/published/api/v1.1/assets/CONT7950B3A6841A44C9A0B87D33A017CDAF/native?cb=_cache_ad42&channelToken=712a6518832146c488cdf196228d8c00"/>
        </div>
    );
};

export default Banner;