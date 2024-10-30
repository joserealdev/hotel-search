import FilterSidebar from "@/modules/FilterSidebar";
import HotelList from "@/modules/HotelList";
import Map from "@/modules/Map";

export default function Home() {
  return (
    <div className="container mx-auto mt-2 grid grid-cols-10 gap-4 h-screen">
      <div className="hidden md:col-span-4 md:block lg:col-span-2 lg:block">
        <FilterSidebar />
      </div>
      <div className="col-span-10 md:col-span-6 lg:col-span-5">
        <HotelList />
      </div>
      <div className="col-span-10 md:col-span-10 lg:col-span-3">
        <Map />
      </div>
    </div>
  );
}
