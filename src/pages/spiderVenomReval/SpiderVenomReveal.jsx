import React, {useEffect, useRef, useState} from "react";

import marvel from '@/assets/images/marvel.avif'
import venom from '@/assets/images/venom.webp'
import spiderman from '@/assets/images/spiderman.webp'
import spider from '@/assets/images/spider.png'

export default function SpiderVenomReveal() {
    const spiderRef = useRef(null);
    const [cursor, setCursor] = useState({x: 0, y: 0});
    const [frontImage, setFrontImage] = useState(spiderman);
    const hiddenImage = frontImage === spiderman ? venom : spiderman;

    useEffect(() => {
        if (!spiderRef.current) return

        let isDown = false;

        const intervalId = setInterval(() => {
            if (isDown)
                spiderRef.current.style.transform = `translateY(0)`;
            else
                spiderRef.current.style.transform = `translateY(400px)`;

            isDown = !isDown;
        }, 5000)

        return () => clearInterval(intervalId);
    }, [])

    const handleMove = (e) => {
        setCursor({x: e.clientX, y: e.clientY});
    };

    const handleTouchMove = (e) => {
        const touch = e.touches[0];

        setCursor({
            x: touch.clientX,
            y: touch.clientY
        });
    };

    const switchBg = () => {
        setFrontImage(prev =>
            prev === spiderman ? venom : spiderman
        );
    }

    return (
        <div
            onMouseMove={handleMove}
            onTouchMove={handleTouchMove}
            className="relative h-screen w-full flex flex-col gap-20 p-5"
        >
            {/*Spider-Man (top layer)*/}
            <img
                src={spiderman}
                className={`absolute inset-0 z-[-1] w-full h-full object-cover transition-opacity duration-1000 ${
                    frontImage === spiderman ? "opacity-100" : "opacity-0"
                }`}
            />

            {/* Venom (revealed image) */}
            <img
                src={venom}
                className={`absolute inset-0 z-[-1] w-full h-full object-cover transition-opacity duration-1000 ${
                    frontImage === spiderman ? "opacity-0" : "opacity-100"
                }`}
            />

            <img
                src={hiddenImage}
                className="absolute inset-0 z-[-1] w-full h-full object-cover"
                style={{
                    clipPath: `circle(180px at ${cursor.x}px ${cursor.y}px)`
                }}
            />

            <div className="w-full flex justify-between">
                <img src={marvel} alt="marvel" className='w-35'/>
                <div name='switch-img-btn' className="flex gap-2">
                    <img src={spider} alt="spider" className='transition duration-2500 h-15' ref={spiderRef}/>

                    <div
                        className="text-black flex justify-center items-center p-1 md:p-3 rounded-full shadow-lg border border-gray-200/20 backdrop-blur-sm bg-white/20 cursor-pointer">
                        <button
                            className='cursor-pointer'
                            onClick={switchBg}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className={`hover:text-[#E62429] w-5 h-5`} aria-hidden="true">
                                <path d="m18 14 4 4-4 4"></path>
                                <path d="m18 2 4 4-4 4"></path>
                                <path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22"></path>
                                <path d="M2 6h1.972a4 4 0 0 1 3.6 2.2"></path>
                                <path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-sm">
                <div
                    className={`flex flex-col text-[#E62429] transition duration-500 drop-shadow-2xl font-primary uppercase`}>
                    <h1 className='text-4xl lg:text-8xl'>
                        The
                    </h1>
                    <h1 className='text-5xl lg:text-9xl'>
                        Rivalry
                    </h1>
                </div>
                <p className={`text-lg font-secondary text-gray-500 border-4 border-transparent border-l-[#E62429] pl-4 mt-4`}>
                    Spider-Man and Venom is one of the most iconic in comic book history, characterized by intense
                    battles, complex character dynamics
                </p>
            </div>
        </div>
    );
}