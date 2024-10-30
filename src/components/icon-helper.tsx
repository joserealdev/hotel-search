import {
  IconAirConditioning,
  IconAnchor,
  IconBarbell,
  IconBeach,
  IconBed,
  IconBike,
  IconBuildingCommunity,
  IconBus,
  IconCampfire,
  IconChefHat,
  IconClock24,
  IconCoffee,
  IconDeviceGamepad2,
  IconDeviceTv,
  IconEye,
  IconGlass,
  IconGolf,
  IconHeartHandshake,
  IconHelicopter,
  IconHome,
  IconHorse,
  IconInfinity,
  IconLeaf,
  IconMassage,
  IconMicrophone,
  IconMoodKid,
  IconMountain,
  IconParking,
  IconPaw,
  IconPlant2,
  IconPool,
  IconShoppingBag,
  IconSnowboarding,
  IconSun,
  IconSunset,
  IconSwimming,
  IconToolsKitchen2,
  IconUser,
  IconWifi,
  IconYoga,
} from "@tabler/icons-react";
import React from "react";

interface Feature {
  name: string;
  icon: React.ReactNode;
}

export const getFeatureIcon = (feature: string): Feature => {
  switch (feature.toLowerCase()) {
    case "wifi":
    case "free wi-fi":
      return { name: feature, icon: <IconWifi className="w-4 h-4" /> };
    case "tv":
      return { name: feature, icon: <IconDeviceTv className="w-4 h-4" /> };
    case "air conditioner":
      return {
        name: feature,
        icon: <IconAirConditioning className="w-4 h-4" />,
      };
    case "breakfast":
      return { name: feature, icon: <IconCoffee className="w-4 h-4" /> };
    case "pool":
    case "outdoor pool":
    case "heated pools":
      return { name: feature, icon: <IconPool className="w-4 h-4" /> };
    case "infinity pool":
      return { name: feature, icon: <IconInfinity className="w-4 h-4" /> };
    case "free parking":
    case "valet parking":
      return { name: feature, icon: <IconParking className="w-4 h-4" /> };
    case "pet friendly":
    case "pet-friendly":
      return { name: feature, icon: <IconPaw className="w-4 h-4" /> };
    case "kids club":
    case "kids' club":
    case "kid-friendly":
      return { name: feature, icon: <IconMoodKid className="w-4 h-4" /> };
    case "gym":
      return { name: feature, icon: <IconBarbell className="w-4 h-4" /> };
    case "spa":
    case "spa center":
      return { name: feature, icon: <IconMassage className="w-4 h-4" /> };
    case "yoga classes":
      return { name: feature, icon: <IconYoga className="w-4 h-4" /> };
    case "wellness retreats":
      return {
        name: feature,
        icon: <IconHeartHandshake className="w-4 h-4" />,
      };
    case "room service":
      return { name: feature, icon: <IconBed className="w-4 h-4" /> };
    case "kitchenette":
      return { name: feature, icon: <IconToolsKitchen2 className="w-4 h-4" /> };
    case "balcony":
      return { name: feature, icon: <IconSun className="w-4 h-4" /> };
    case "fireplace":
      return { name: feature, icon: <IconCampfire className="w-4 h-4" /> };

    // Views and locations
    case "ocean view":
    case "beachfront":
    case "private beach":
      return { name: feature, icon: <IconBeach className="w-4 h-4" /> };
    case "mountain view":
    case "hiking trails":
      return { name: feature, icon: <IconMountain className="w-4 h-4" /> };
    case "panoramic views":
      return { name: feature, icon: <IconEye className="w-4 h-4" /> };
    case "sunset views":
      return { name: feature, icon: <IconSunset className="w-4 h-4" /> };
    case "bar/lounge":
    case "beach bar":
      return { name: feature, icon: <IconGlass className="w-4 h-4" /> };
    case "game room":
      return {
        name: feature,
        icon: <IconDeviceGamepad2 className="w-4 h-4" />,
      };
    case "golf course":
      return { name: feature, icon: <IconGolf className="w-4 h-4" /> };
    case "live music":
    case "nightly entertainment":
      return { name: feature, icon: <IconMicrophone className="w-4 h-4" /> };
    case "bicycle rental":
    case "bike rentals":
      return { name: feature, icon: <IconBike className="w-4 h-4" /> };
    case "24 hour front desk":
      return { name: feature, icon: <IconClock24 className="w-4 h-4" /> };
    case "airport shuttle":
      return { name: feature, icon: <IconBus className="w-4 h-4" /> };
    case "helipad":
      return { name: feature, icon: <IconHelicopter className="w-4 h-4" /> };
    case "water sports":
      return { name: feature, icon: <IconSwimming className="w-4 h-4" /> };
    case "on-site marina":
      return { name: feature, icon: <IconAnchor className="w-4 h-4" /> };
    case "diving center":
      return { name: feature, icon: <IconAnchor className="w-4 h-4" /> };
    case "surf school":
      return { name: feature, icon: <IconSnowboarding className="w-4 h-4" /> };
    case "conference facilities":
      return {
        name: feature,
        icon: <IconBuildingCommunity className="w-4 h-4" />,
      };
    case "botanical gardens":
    case "organic gardens":
      return { name: feature, icon: <IconPlant2 className="w-4 h-4" /> };
    case "eco-friendly":
      return { name: feature, icon: <IconLeaf className="w-4 h-4" /> };
    case "nearby shopping":
      return { name: feature, icon: <IconShoppingBag className="w-4 h-4" /> };
    case "gourmet dining":
    case "seafood restaurant":
      return { name: feature, icon: <IconChefHat className="w-4 h-4" /> };
    case "concierge service":
      return { name: feature, icon: <IconUser className="w-4 h-4" /> };
    case "private villas":
      return { name: feature, icon: <IconHome className="w-4 h-4" /> };
    case "equestrian center":
      return { name: feature, icon: <IconHorse className="w-4 h-4" /> };
    case "wine tastings":
      return { name: feature, icon: <IconGlass className="w-4 h-4" /> };

    default:
      return { name: feature, icon: null };
  }
};
