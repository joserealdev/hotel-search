"use client";
import { BoardBasisFilter, StarsFilter } from "@/components/Filter";
import HotelList from "@/components/HotelList";
import HotelMap from "@/components/Map";

export default function Home() {
  return (
    <div className="mx-6 mt-2 grid grid-cols-1 sm:grid-cols-10 gap-4 h-screen">
      <section className="col-span-1 sm:col-span-4 lg:col-span-2 flex flex-col gap-2">
        <StarsFilter />
        <BoardBasisFilter />
      </section>
      <main className="col-span-1 sm:col-span-6 lg:col-span-5 flex flex-col gap-4 max-w-5xl mx-auto px-6">
        <HotelList />
      </main>
      <section className="col-span-1 sm:col-span-10 lg:col-span-3 w-full h-96 rounded-lg overflow-hidden">
        <HotelMap />
      </section>
    </div>
  );
}
