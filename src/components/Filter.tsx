import { Hotel } from "@/types/hotel";
import { getFeatureIcon } from "@core/helpers/icons";
import {
  changeFeatureFilter,
  changeRatingFilter,
} from "@core/store/globalSlice";
import { useAppDispatch, useAppSelector } from "@core/store/hooks";
import { Checkbox } from "./Checkbox";
import Collapse from "./Collapse";

const StarsFilter = () => {
  const hotels = useAppSelector((store) => store.global.hotels);
  const ratingFilter = useAppSelector((store) => store.global.ratingFilter);
  const dispatch = useAppDispatch();

  return (
    <Collapse label="Star rating">
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
    </Collapse>
  );
};

const BoardBasisFilter = () => {
  const featureFilters = useAppSelector((store) => store.global.featureFilters);
  const dispatch = useAppDispatch();

  return (
    <Collapse label="Board basis">
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
    </Collapse>
  );
};

const getNumberOfHotelsWithStars = (hotels: Hotel[], stars: number) =>
  hotels.reduce((prev, curr) => (curr.star === stars ? prev + 1 : prev), 0);

export { BoardBasisFilter, StarsFilter };
