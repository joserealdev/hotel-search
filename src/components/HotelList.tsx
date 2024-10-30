import { Hotel } from "@/types/hotel";
import { hotelFilter, useAppSelector } from "@core/store/hooks";
import { IconHelp, IconStar, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import { getFeatureIcon } from "../core/helpers/icons";

const calculateDiscount = (original: number, final: number): number => {
  return Math.round(((original - final) / original) * 100);
};

const HotelCard = ({ hotel }: { hotel: Hotel }) => {
  const discount = calculateDiscount(hotel.originalPrice, hotel.finalPrice);

  return (
    <div className="bg-[var(--box-bg)] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:max-w-[50%] md:w-64">
          <Image
            src={hotel.image}
            alt={hotel.name}
            width={300}
            height={200}
            className="w-full max-h-[200px] md:max-h-full md:h-full object-cover"
          />
          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              -{discount}%
            </div>
          )}
        </div>
        <div className="flex-1 p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-4">
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

          <button className="mt-4 w-full md:w-auto bg-[var(--primary)] ring-[var(--secondary)] hover:ring-1 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

const HotelList = () => {
  const hotels = useAppSelector(hotelFilter());

  if (hotels.length === 0) return <NoResults />;

  return hotels.map((hotel, index) => <HotelCard key={index} hotel={hotel} />);
};

const NoResults = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <div className="bg-white shadow-md rounded-lg p-8 text-center">
      <IconHelp className="w-12 h-12 text-gray-500 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">No results found</h2>
      <p className="text-gray-500 mb-6">
        Try removing some of your search filters or criteria to see more
        results.
      </p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
        Try a new search
      </button>
    </div>
  </div>
);

export default HotelList;
