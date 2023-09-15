import { useState, useEffect } from "react";
import "../css/Slider.css";

const ImageSlider = ({ images }: { images: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const handleAutoSlide = () => {
    nextSlide();
  };

  useEffect(() => {
    const interval = setInterval(handleAutoSlide, 3000);
    return () => clearInterval(interval);
  }, []);
  const imageStyle = {
    // transform: `translateX(-100%)`,
    transition: "transform 0.5s ease-in-out",
  };

  return (
    <div className=" h-[50vh]  relative">
      <div
        style={imageStyle}
        className="  absolute  left-0 w-full  flex items-center justify-center"
      >
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="max-h-[500px]  w-[100vw] "
        />
      </div>
      <div className=" flex justify-center h-full relative items-center">
        <button className="prev-button" onClick={prevSlide}>
          Previous
        </button>
        <div className=" flex justify-center ">
          <img
            src="/med-logo.png"
            alt="medinfoplus-logo"
            className="rounded-md w-[75px]"
          />
        </div>
        <button className="next-button" onClick={nextSlide}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
