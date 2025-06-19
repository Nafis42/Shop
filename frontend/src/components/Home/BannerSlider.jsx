import React, { useState, useEffect } from 'react';

const BannerSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // Add your banner image URLs here
    const banners = [
        'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop', // Example URL for Men's Fashion
        'https://res.cloudinary.com/duesidg7z/image/upload/v1749795270/Screenshot_2025-06-13_114258_rzeuml.png', // Example URL for Women's Fashion
        'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop', // Example URL for Electronics
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="relative w-full h-[400px] overflow-hidden">
            {/* Slides */}
            <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {banners.map((banner, index) => (
                    <div 
                        key={index}
                        className="min-w-full h-full"
                    >
                        <img 
                            src={banner}
                            alt={`Banner ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            currentSlide === index ? 'bg-white' : 'bg-white/50'
                        }`}
                    />
                ))}
            </div>

            {/* Previous/Next Buttons */}
            <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors duration-300"
            >
                ←
            </button>
            <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors duration-300"
            >
                →
            </button>
        </div>
    );
};

export default BannerSlider; 