import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import journalImg from "../../../assets/carousel/journel.jpg";
import moodImg from "../../../assets/carousel/wallpaperflare.com_wallpaper.jpg";
import quotesImg from "../../../assets/carousel/qoutes.jpg";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Welcome to Your Journal",
    desc: "Reflect. Write. Heal. This is your safe space.",
    img: journalImg,
  },
  {
    id: 2,
    title: "Track Your Mood",
    desc: "Visualize your emotional trends and take control of your wellness.",
    img: moodImg,
  },
  {
    id: 3,
    title: "Daily Inspiration",
    desc: "Find wisdom and peace with your daily quotes.",
    img: quotesImg,
  },
];

export const HomeCarousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src={slide.img}
        alt={slide.title}
        className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 z-0"
      />

      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/80 z-10" />

      {/* Text Content */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center px-4 z-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-md">
          {slide.title}
        </h2>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-sm">
          {slide.desc}
        </p>
        <Link to="/journal">
          <button className="mt-8 px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition cursor-pointer text-sm sm:text-base">
            Go to journal
          </button>
        </Link>
      </div>

      {/* Controls */}
      <div className="absolute inset-y-1/2 left-4 sm:left-6 md:left-8 z-30 transform -translate-y-1/2">
        <button
          onClick={prevSlide}
          className="p-3 bg-white/20 hover:bg-white/30 dark:bg-white/10 rounded-full transition"
        >
          <ChevronLeft className="text-white" size={28} />
        </button>
      </div>
      <div className="absolute inset-y-1/2 right-4 sm:right-6 md:right-8 z-30 transform -translate-y-1/2">
        <button
          onClick={nextSlide}
          className="p-3 bg-white/20 hover:bg-white/30 dark:bg-white/10 rounded-full transition"
        >
          <ChevronRight className="text-white" size={28} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
