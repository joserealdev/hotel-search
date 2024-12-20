"use client";
import { BoardBasisFilter, StarsFilter } from "@/components/Filter";
import HotelList from "@/components/HotelList";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Home() {
  return (
    <div className="mx-6 my-4 grid grid-cols-1 sm:grid-cols-10 gap-4">
      <section className="col-span-1 sm:col-span-4 lg:col-span-2 flex flex-col gap-2">
        <StarsFilter />
        <BoardBasisFilter />
      </section>
      <main className="col-span-1 sm:col-span-6 lg:col-span-5 flex flex-col gap-4 max-w-5xl mx-auto">
        <HotelList />
      </main>
      <section className="col-span-1 sm:col-span-10 lg:col-span-3 w-full h-96 rounded-lg overflow-hidden">
        <LeafletMap />
      </section>
    </div>
  );
}
