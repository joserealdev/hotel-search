import { hotelFilter, useAppSelector } from "@core/store/hooks";
import { IconStar } from "@tabler/icons-react";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Hotel {
  name: string;
  finalPrice: number;
  originalPrice: number;
  star: number;
  features: string[];
  image: string;
  coordinates: Coordinates;
}

interface HotelMapProps {
  hotels: Hotel[];
  onMarkerClick?: (hotel: Hotel) => void;
}

const createHotelIcon = () => {
  return L.divIcon({
    html: `<div class="text-[var(--primary)]">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none">
        <path d="M3 21h18m-3-6v6m-7-6v6m-2-9v9m-5-9v9m19-9h-18l9-9z"/>
      </svg>
    </div>`,
    className: "custom-hotel-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });
};

const MapBounds: React.FC<{ hotels: Hotel[] }> = ({ hotels }) => {
  const map = useMap();

  useEffect(() => {
    if (hotels.length === 0) return;

    const bounds = L.latLngBounds(
      hotels.map((hotel) => [
        hotel.coordinates.latitude,
        hotel.coordinates.longitude,
      ])
    );
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [hotels, map]);

  return null;
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(rating)].map((_, index) => (
        <IconStar
          key={index}
          className="w-4 h-4 text-yellow-400 fill-yellow-400"
        />
      ))}
    </div>
  );
};

const HotelPopup: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
  const discount =
    ((hotel.originalPrice - hotel.finalPrice) / hotel.originalPrice) * 100;

  return (
    <div className="min-w-[200px] max-w-[300px]">
      <picture>
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-32 object-cover rounded-t-lg mb-2"
        />
      </picture>
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{hotel.name}</h3>
        <StarRating rating={hotel.star} />
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-blue-600">
            ${hotel.finalPrice}
          </span>
          {hotel.originalPrice > hotel.finalPrice && (
            <>
              <span className="text-sm line-through text-gray-500">
                ${hotel.originalPrice}
              </span>
              <span className="text-sm text-green-600 font-semibold">
                {discount.toFixed(0)}% OFF
              </span>
            </>
          )}
        </div>
        {hotel.features.length > 0 && (
          <div className="text-sm text-gray-600">
            <div className="flex flex-wrap gap-1">
              {hotel.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-2 py-0.5 rounded-full text-xs"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const HotelMap: React.FC = () => {
  const hotels = useAppSelector(hotelFilter());
  const hotelIcon = useMemo(() => createHotelIcon(), []);

  const center: LatLngExpression = useMemo(() => {
    if (hotels.length === 0) return [0, 0];
    const lat =
      hotels.reduce((sum, hotel) => sum + hotel.coordinates.latitude, 0) /
      hotels.length;
    const lng =
      hotels.reduce((sum, hotel) => sum + hotel.coordinates.longitude, 0) /
      hotels.length;
    return [lat, lng];
  }, [hotels]);

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="w-full h-96"
      style={{ background: "#f8fafc" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hotels.map((hotel, index) => (
        <Marker
          key={index}
          position={[hotel.coordinates.latitude, hotel.coordinates.longitude]}
          icon={hotelIcon}
        >
          <Popup>
            <HotelPopup hotel={hotel} />
          </Popup>
        </Marker>
      ))}
      <MapBounds hotels={hotels} />
    </MapContainer>
  );
};

export default HotelMap;
