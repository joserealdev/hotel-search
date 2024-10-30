"use client";

import {
  BoardBasisFilter,
  PopularFiters,
  StarsFilter,
} from "@/components/Filter";

const FilterSidebar = () => {
  return (
    <section
      className="flex flex-col gap-2"
      style={{ flexDirection: "column" }}
    >
      <PopularFiters />
      <StarsFilter />
      <BoardBasisFilter />
    </section>
  );
};

export default FilterSidebar;
