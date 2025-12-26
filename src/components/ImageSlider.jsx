import React from 'react';
import './ImageSlider.css';

const ImageSlider = ({ images: customImages }) => {
    // Expecting images in public/images/slider/
    // We duplicate the array to create a seamless loop
    const defaultImages = [
        '/images/slider/slide-1.jpg',
        '/images/slider/slide-2.jpg',
        '/images/slider/slide-3.jpg',
        '/images/slider/slide-4.jpg',
    ];

    const images = customImages || defaultImages;

    // Double the images for seamless loop
    const sliderImages = [...images, ...images];

    return (
        <section className="image-slider-section">
            <div className="slider-container">
                <div className="slider-track">
                    {sliderImages.map((img, index) => (
                        <div className="slider-item" key={index}>
                            <img src={img} alt={`Slide ${index + 1}`} loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImageSlider;
