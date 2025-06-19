import React from 'react';
import BannerSlider from '../components/Home/BannerSlider';
import CategoryProducts from '../components/Home/CategoryProducts';

const HomePage = () => {
    // Define the categories you want to show on the homepage
    const featuredCategories = [
        { id: '67e9228f59b5098b00af0e21', name: "Men's Wear" },
        { id: 'womens-wear-id', name: "Women's Wear" },
        { id: 'electronics-id', name: "Electronics" },
        // Add more categories as needed
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner Slider */}
            <BannerSlider />

            {/* Featured Categories */}
            <div className="container mx-auto px-4 py-8">
                {featuredCategories.map((category) => (
                    <CategoryProducts
                        key={category.id}
                        categoryId={category.id}
                        categoryName={category.name}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage; 