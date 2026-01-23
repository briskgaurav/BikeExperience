"use client"
import React, { useEffect, useState } from 'react'
export default function ScrollBarCustom() {
    const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            const percentage = (currentScroll / scrollHeight) * 100;
            setScrollPercentage(Math.min(percentage, 100));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='h-1/4  fixed z-[999] top-1/2 right-5 -translate-y-1/2 w-[10px] rounded-full bg-gray-400/10 backdrop-blur-xl'>
            <div 
                className="bg-red rounded-full"
                style={{
                    width: '100%',
                    height: `${scrollPercentage}%`
                }}
            ></div>
        </div>
    )
}