import india from "@/assets/dest-india.jpg";
import bhutan from "@/assets/dest-bhutan.jpg";
import nepal from "@/assets/dest-nepal.jpg";
import srilanka from "@/assets/dest-srilanka.jpg";
import vietnam from "@/assets/dest-vietnam.jpg";

export type Destination = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  description: string;
  highlights: string[];
  suited: string;
};

export const destinations: Destination[] = [
  {
    slug: "bhutan",
    name: "Bhutan",
    tagline: "The Last Shangri-La",
    image: bhutan,
    description:
      "A kingdom that measures its wealth in happiness. We design quiet itineraries through cliffside monasteries, fortress dzongs, and the slow hush of pine-scented valleys.",
    highlights: [
      "Private blessings at hidden monasteries",
      "Cliffside lodges with single-table dining",
      "Walks through sacred valleys with local guides",
    ],
    suited: "Travelers seeking stillness, sacred landscapes, and slow luxury.",
  },
  {
    slug: "sri-lanka",
    name: "Sri Lanka",
    tagline: "Island Heritage",
    image: srilanka,
    description:
      "Tea-clad highlands, colonial planters' bungalows, and wild southern coasts — an island compact enough to feel intimate, layered enough to feel infinite.",
    highlights: [
      "Heritage bungalow stays in the hill country",
      "Private safari at first light in Yala",
      "Curated Galle Fort food and craft walks",
    ],
    suited: "Couples and discerning travelers drawn to landscape and heritage.",
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    tagline: "Culinary Soul",
    image: vietnam,
    description:
      "From the lantern-lit lanes of Hoi An to the smoke and salt of Hanoi's old quarter, Vietnam is a country best understood through its kitchens and its people.",
    highlights: [
      "Private kitchen-table sessions with local chefs",
      "Junk cruise through limestone karst seascapes",
      "Tailor's appointments and craft ateliers",
    ],
    suited: "Food-led travelers and curious culture seekers.",
  },
  {
    slug: "india",
    name: "India",
    tagline: "Infinite Wonder",
    image: india,
    description:
      "Palatial heritage, market alleys spiced with cardamom and rose, and stillness in places few travelers think to look. We design India as a deeply personal narrative.",
    highlights: [
      "Private dining at royal residences",
      "Heritage hotels selected for character, not flash",
      "Old-city walks with historians and home cooks",
    ],
    suited: "Returning travelers who want India beyond the headlines.",
  },
  {
    slug: "nepal",
    name: "Nepal",
    tagline: "Mountain Sanctum",
    image: nepal,
    description:
      "Mountain air, monastery bells, and small lodges set against the snow line. A journey for travelers who measure luxury in quiet, altitude, and arrival.",
    highlights: [
      "Boutique mountain lodges with full-board service",
      "Private heritage walks through Kathmandu Valley",
      "Restorative retreats in the foothills",
    ],
    suited: "Travelers drawn to mountains, monasteries, and meaningful retreat.",
  },
];
