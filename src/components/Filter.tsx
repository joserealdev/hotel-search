import { Hotel } from "@/types/hotel";
import { getFeatureIcon } from "@core/helpers/icons";
import {
  changeFeatureFilter,
  changeRatingFilter,
} from "@core/store/globalSlice";
import { useAppDispatch, useAppSelector } from "@core/store/hooks";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

interface CollapseProps {
  visible: boolean;
  children: React.ReactNode;
}

const Collapse = ({ visible, children }: CollapseProps) => {
  return visible ? (
    <div className="mt-4 max-h-56 flex flex-col gap-2 overflow-auto">
      {children}
    </div>
  ) : null;
};

interface IconProps {
  name: "ChevronDown" | "Star";
  className?: string;
}

const Icon = ({ name, className }: IconProps) => {
  const icons = {
    ChevronDown: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    ),
    Star: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ),
  };

  return icons[name] || null;
};

interface WrapperProps {
  title: string;
  icon?: React.ReactElement;
  children: React.ReactNode;
}

const FilterWrapper = ({ title, children, icon }: WrapperProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className="bg-[var(--box-bg)] rounded-lg p-4">
      <div
        className="flex justify-between cursor-pointer items-center"
        onClick={() => {
          setIsExpanded((state) => !state);
        }}
      >
        <div className="w-full flex items-center gap-2">
          {title} {icon && icon}
        </div>
        <Icon
          name="ChevronDown"
          className={`transform ${
            isExpanded ? "rotate-180" : ""
          } transition-transform duration-300 w-5`}
        />
      </div>
      <Collapse visible={isExpanded}>{children}</Collapse>
    </div>
  );
};

const StarsFilter = () => {
  const hotels = useAppSelector((store) => store.global.hotels);
  const ratingFilter = useAppSelector((store) => store.global.ratingFilter);
  const dispatch = useAppDispatch();

  return (
    <FilterWrapper
      title="Star rating"
      icon={<Icon name="Star" className="w-5" />}
    >
      {ratingFilter.map(({ feature, isSelected }) => {
        const stars = parseInt(feature, 10);
        return (
          <div key={`${stars}-stars`} className="flex justify-between">
            <Checkbox
              disabled={getNumberOfHotelsWithStars(hotels, stars) < 1}
              checked={isSelected}
              onChange={() => {
                dispatch(changeRatingFilter(stars));
              }}
              label={`${stars}-star hotel`}
            />
            {getNumberOfHotelsWithStars(hotels, stars)}
          </div>
        );
      })}
    </FilterWrapper>
  );
};

const BoardBasisFilter = () => {
  const featureFilters = useAppSelector((store) => store.global.featureFilters);
  const dispatch = useAppDispatch();

  return (
    <FilterWrapper title="Board basis">
      {featureFilters.map(({ feature, isSelected }) => (
        <div key={feature} className="flex gap-2 items-center">
          <Checkbox
            checked={isSelected}
            onChange={() => {
              dispatch(changeFeatureFilter(feature));
            }}
            label={feature}
          />
          {getFeatureIcon(feature).icon}
        </div>
      ))}
    </FilterWrapper>
  );
};

const getNumberOfHotelsWithStars = (hotels: Hotel[], stars: number) =>
  hotels.reduce((prev, curr) => (curr.star === stars ? prev + 1 : prev), 0);

export { BoardBasisFilter, StarsFilter };
