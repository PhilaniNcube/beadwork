"use client";
import { ArrowLeft, ArrowRight, ArrowUpLeft, ArrowUpRight, XIcon } from "lucide-react";
import React, { useState } from "react";

interface LightboxProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  images,
  initialIndex = 0,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <button
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={onClose}
      >
        <XIcon />
      </button>
      <button
        className="absolute left-4 text-white text-2xl"
        onClick={handlePrev}
      >
        <ArrowLeft />
      </button>
      <img
        src={images[currentIndex]}
        alt={`Product Image ${currentIndex + 1}`}
        className="max-w-full max-h-full"
      />
      <button
        className="absolute right-4 text-white text-2xl"
        onClick={handleNext}
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default Lightbox;
