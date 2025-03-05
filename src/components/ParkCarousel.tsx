import React from 'react';
import { Navigation, MapPin } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import type { Park } from '../types';

interface ParkCarouselProps {
  parks: Park[];
  onNavigate: (park: Park) => void;
}

export const ParkCarousel: React.FC<ParkCarouselProps> = ({ parks, onNavigate }) => {
  return (
    <div className="w-full mt-8">
      <h2 className="text-2xl font-bold text-primary mb-4">Nearby Parks</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 }
        }}
      >
        {parks.map((park) => (
          <SwiperSlide key={park.id}>
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src={park.image}
                alt={park.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                <h3 className="text-white font-semibold">{park.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-white text-sm">{park.distance.toFixed(1)} km away</p>
                  <button
                    onClick={() => onNavigate(park)}
                    className="bg-secondary text-white p-2 rounded-full hover:bg-primary transition-colors"
                  >
                    <Navigation className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};