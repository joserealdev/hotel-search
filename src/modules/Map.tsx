"use client";

import HotelMap from "@/components/Map";
import { useAppSelector } from "@core/store/hooks";

const MapModule = () => {
  const hotels = useAppSelector((state) => state.global.hotels);
  return (
    <section>
      <HotelMap hotels={hotels} />
    </section>
  );
};

export default MapModule;
