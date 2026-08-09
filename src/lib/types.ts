export type SafetyStatus = "safe" | "moderate" | "high";

export interface Farm {
  slug: string;
  name: string;
  location: string;
  state: string;
  district: string;
  subDistrict: string;
  category: string;
  pricePerNight: number;
  safety: SafetyStatus;
  host: string;
  summary: string;
  images: string[];
  amenities: string[];
  cancellationPolicy: string;
  emergencyContact: string;
  regionalGuidelines: string;
}

export interface Booking {
  id: string;
  farmSlug: string;
  farmName: string;
  location: string;
  image: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
  status: "upcoming" | "completed" | "cancelled";
}

export interface LandslideReport {
  id: string;
  location: string;
  lat: number;
  lng: number;
  severity: "Low" | "Medium" | "High" | "Critical";
  reportedAt: string;
  status: string;
}
