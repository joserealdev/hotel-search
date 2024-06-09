export interface Hotel {
  name: string;
  finalPrice: number;
  originalPrice: number;
  star: number;
  features: string[];
  image: string;
  coordinates: Coordinates;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}
