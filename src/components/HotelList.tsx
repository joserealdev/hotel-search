"use client";

import { Hotel } from "@/types/hotel";
import { useAppSelector } from "@core/store/hooks";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import { getFeatureIcon } from "./icon-helper";

const calculateDiscount = (original: number, final: number): number => {
  return Math.round(((original - final) / original) * 100);
};

const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
  const discount = calculateDiscount(hotel.originalPrice, hotel.finalPrice);

  return (
    <div className="bg-[var(--box-bg)] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex">
        <div className="relative w-48 md:w-64">
          <Image
            src={hotel.image}
            alt={hotel.name}
            width={300}
            height={200}
            className="w-full h-full object-cover"
          />
          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              -{discount}%
            </div>
          )}
        </div>
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold">{hotel.name}</h3>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) =>
                index < hotel.star ? (
                  <IconStarFilled
                    key={index}
                    className="w-5 h-5 text-yellow-400"
                  />
                ) : (
                  <IconStar key={index} className="w-5 h-5 text-gray-300" />
                )
              )}
            </div>
          </div>

          <div className="flex items-baseline mb-4">
            <span className="text-2xl font-bold">${hotel.finalPrice}</span>
            {discount > 0 && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${hotel.originalPrice}
              </span>
            )}
            <span className="ml-2 text-sm text-gray-500">/night</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {hotel.features.map((feature) => {
              const { name, icon } = getFeatureIcon(feature);
              return (
                <div
                  key={name}
                  className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                >
                  {icon}
                  <span>{name}</span>
                </div>
              );
            })}
          </div>

          <button className="mt-4 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

const HotelList: React.FC = () => {
  const hotels = useAppSelector((state) => state.global.hotels);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {hotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} />
      ))}
    </div>
  );
};

export default HotelList;
