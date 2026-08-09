import type { Booking, Farm, LandslideReport } from "@/lib/types";

/**
 * ponytail: static fixtures stand in for the API. Swap these readers for
 * fetch() calls when a backend exists — the page components already treat
 * them as a data layer, not as literals.
 */
const img = (seed: string, w = 900, h = 600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const FARMS: Farm[] = [
  {
    slug: "apple-blossom-retreat",
    name: "Apple Blossom Retreat",
    location: "Ramgarh, Uttarakhand",
    state: "Uttarakhand",
    district: "Nainital",
    subDistrict: "Ramgarh",
    category: "Organic Farm",
    pricePerNight: 4500,
    safety: "safe",
    host: "Rohit Bisht",
    summary:
      "A working apple orchard on the Kumaon ridge. Guests join the morning harvest, learn grafting from the family that has farmed this slope for four generations, and sleep in a restored stone cottage facing the Nanda Devi range.",
    images: [img("apple-orchard"), img("apple-detail", 600, 600), img("apple-room", 600, 600)],
    amenities: [
      "Organic Farm",
      "Rural Connect Wi-Fi",
      "Safety Monitoring",
      "Local Cuisine",
      "Guided Walks",
      "Escrow Protection",
    ],
    cancellationPolicy:
      "Full refund if cancelled 48 hours prior to check-in. Safety-related cancellations are always 100% refundable.",
    emergencyContact:
      "On-site caretaker available 24/7. Closest medical facility: 9km in Bhowali.",
    regionalGuidelines:
      "Stick to marked orchard paths. Do not feed the resident livestock. Respect the harvest schedule during October.",
  },
  {
    slug: "spice-route-eco-stay",
    name: "Spice Route Eco-Stay",
    location: "Wayanad, Kerala",
    state: "Kerala",
    district: "Wayanad",
    subDistrict: "Meppadi",
    category: "Spice Garden",
    pricePerNight: 3800,
    safety: "moderate",
    host: "Anna Mathew",
    summary:
      "Cardamom, pepper and vanilla grow together under the canopy here. The stay sits above the valley floor with a monsoon-season soil-stability sensor on the access road, reported live to the Safety Matrix.",
    images: [img("spice-garden"), img("spice-detail", 600, 600), img("spice-room", 600, 600)],
    amenities: [
      "Spice Plantation Tour",
      "Rural Connect Wi-Fi",
      "Safety Monitoring",
      "Local Cuisine",
      "Guided Walks",
      "Escrow Protection",
    ],
    cancellationPolicy:
      "Full refund if cancelled 48 hours prior to check-in. Safety-related cancellations are always 100% refundable.",
    emergencyContact:
      "Host reachable 24/7. Closest medical facility: 6km in Meppadi Town.",
    regionalGuidelines:
      "Leeches are common during monsoon — wear covered footwear. The access road may close on red-alert days.",
  },
  {
    slug: "amber-harvest-farm",
    name: "Amber Harvest Farm",
    location: "Amer, Rajasthan",
    state: "Rajasthan",
    district: "Jaipur",
    subDistrict: "Amer",
    category: "Floral Fields",
    pricePerNight: 5200,
    safety: "safe",
    host: "Vikram Singh",
    summary:
      "Marigold and rose fields below the Amer ridge, harvested before sunrise for the Jaipur flower market. Guests ride out with the pickers and return for a millet breakfast cooked over a clay stove.",
    images: [img("marigold-field"), img("marigold-detail", 600, 600), img("amber-room", 600, 600)],
    amenities: [
      "Sunrise Harvest",
      "Rural Connect Wi-Fi",
      "Safety Monitoring",
      "Local Cuisine",
      "Heritage Walks",
      "Escrow Protection",
    ],
    cancellationPolicy:
      "Full refund if cancelled 48 hours prior to check-in. Safety-related cancellations are always 100% refundable.",
    emergencyContact:
      "On-site manager available 24/7. Closest medical facility: 4km in Amer.",
    regionalGuidelines:
      "Summer field work stops by 10 AM — plan visits early. Carry water on all walks.",
  },
  {
    slug: "mist-valley-paddy",
    name: "Mist Valley Paddy",
    location: "Ziro, Arunachal",
    state: "Arunachal Pradesh",
    district: "Lower Subansiri",
    subDistrict: "Ziro",
    category: "Paddy Fields",
    pricePerNight: 4100,
    safety: "safe",
    host: "Tage Yampi",
    summary:
      "The Apatani valley's rice-and-fish terraces, farmed without a single plough. Stay in a bamboo longhouse and learn the irrigation system that has run on gravity alone for centuries.",
    images: [img("paddy-terrace"), img("paddy-detail", 600, 600), img("paddy-room", 600, 600)],
    amenities: [
      "Terrace Farming",
      "Rural Connect Wi-Fi",
      "Safety Monitoring",
      "Local Cuisine",
      "Guided Walks",
      "Escrow Protection",
    ],
    cancellationPolicy:
      "Full refund if cancelled 48 hours prior to check-in. Safety-related cancellations are always 100% refundable.",
    emergencyContact:
      "Host reachable 24/7. Closest medical facility: 3km in Hapoli.",
    regionalGuidelines:
      "Inner Line Permit required for non-residents. Do not walk on terrace bunds during transplanting season.",
  },
  {
    slug: "green-valley-retreat",
    name: "Green Valley Retreat",
    location: "Chamoli, Uttarakhand",
    state: "Uttarakhand",
    district: "Chamoli",
    subDistrict: "Joshimath",
    category: "Tea & Cardamom",
    pricePerNight: 4500,
    safety: "safe",
    host: "John Doe",
    summary:
      "Experience the serenity of the Himalayas at Green Valley Retreat. Nestled within an active 50-acre cardamom and tea plantation, this retreat offers a unique blend of agricultural education and luxury living. Our farm utilizes real-time monitoring to ensure guest safety during monsoon seasons, providing peace of mind alongside breathtaking views.",
    images: [img("green-valley"), img("tea-picking", 600, 600), img("valley-room", 600, 600)],
    amenities: [
      "Organic Farm",
      "Rural Connect Wi-Fi",
      "Safety Monitoring",
      "Local Cuisine",
      "Guided Walks",
      "Escrow Protection",
    ],
    cancellationPolicy:
      "Full refund if cancelled 48 hours prior to check-in. Safety-related cancellations are always 100% refundable.",
    emergencyContact:
      "On-site caretaker available 24/7. Closest medical facility: 12km in Chamoli Town Center.",
    regionalGuidelines:
      "Please stick to marked trails. Leeches may be present during monsoons. Respect local wildlife and farming schedules.",
  },
  {
    slug: "sunrise-valley-organic-retreat",
    name: "Sunrise Valley Organic Retreat",
    location: "Wayanad, Kerala",
    state: "Kerala",
    district: "Wayanad",
    subDistrict: "Kalpetta",
    category: "Organic Farm",
    pricePerNight: 3667,
    safety: "safe",
    host: "Meera Nair",
    summary:
      "Rows of turmeric and ginger run down to a stream that feeds the whole valley. The retreat runs entirely on solar and composts every kilogram of kitchen waste back into the beds guests eat from.",
    images: [img("sunrise-valley"), img("turmeric-detail", 600, 600), img("sunrise-room", 600, 600)],
    amenities: [
      "Organic Farm",
      "Rural Connect Wi-Fi",
      "Safety Monitoring",
      "Local Cuisine",
      "Guided Walks",
      "Escrow Protection",
    ],
    cancellationPolicy:
      "Full refund if cancelled 48 hours prior to check-in. Safety-related cancellations are always 100% refundable.",
    emergencyContact:
      "Host reachable 24/7. Closest medical facility: 5km in Kalpetta.",
    regionalGuidelines:
      "Stream crossings flood quickly after rain. Follow the host's route advice during monsoon.",
  },
];

export const getFarm = (slug: string) => FARMS.find((f) => f.slug === slug);

export interface FarmQuery {
  state?: string;
  district?: string;
  subDistrict?: string;
}

export function searchFarms({ state, district, subDistrict }: FarmQuery) {
  return FARMS.filter(
    (f) =>
      (!state || f.state === state) &&
      (!district || f.district === district) &&
      (!subDistrict || f.subDistrict === subDistrict),
  );
}

export const BOOKINGS: Booking[] = [
  {
    id: "AGS-48213",
    farmSlug: "green-valley-retreat",
    farmName: "Green Valley Retreat",
    location: "Chamoli, Uttarakhand",
    image: img("green-valley", 400, 300),
    checkIn: "2026-09-15",
    checkOut: "2026-09-18",
    guests: 2,
    total: 13950,
    status: "upcoming",
  },
  {
    id: "AGS-47990",
    farmSlug: "spice-route-eco-stay",
    farmName: "Spice Route Eco-Stay",
    location: "Wayanad, Kerala",
    image: img("spice-garden", 400, 300),
    checkIn: "2026-06-02",
    checkOut: "2026-06-05",
    guests: 4,
    total: 11850,
    status: "completed",
  },
  {
    id: "AGS-47612",
    farmSlug: "amber-harvest-farm",
    farmName: "Amber Harvest Farm",
    location: "Amer, Rajasthan",
    image: img("marigold-field", 400, 300),
    checkIn: "2026-03-11",
    checkOut: "2026-03-13",
    guests: 2,
    total: 10850,
    status: "cancelled",
  },
];

export const LIVE_REPORTS: LandslideReport[] = [
  {
    id: "WG-LS-0098",
    location: "Bamnoli Ghat Road, Western Ghats",
    lat: 17.49,
    lng: 73.15,
    severity: "Critical",
    reportedAt: "2026-08-08 10:30",
    status: "Immediate action required",
  },
  {
    id: "UK-LS-0451",
    location: "NH-7 near Joshimath, Chamoli",
    lat: 30.55,
    lng: 79.56,
    severity: "High",
    reportedAt: "2026-08-07 18:05",
    status: "Road partially blocked",
  },
  {
    id: "KL-LS-0212",
    location: "Meppadi Ghat, Wayanad",
    lat: 11.55,
    lng: 76.13,
    severity: "Medium",
    reportedAt: "2026-08-06 07:42",
    status: "Under observation",
  },
  {
    id: "HP-LS-0077",
    location: "Kinnaur Valley Approach Road",
    lat: 31.58,
    lng: 78.27,
    severity: "Low",
    reportedAt: "2026-08-04 14:20",
    status: "Cleared, monitoring continues",
  },
];
