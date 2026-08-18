"use client";

import { useEffect, useState } from "react";
import {
  Clock,
  CloudRain,
  CloudSun,
  Droplets,
  Gauge,
  Radio,
  ShieldAlert,
  Sun,
  Thermometer,
} from "lucide-react";
import { cn } from "@/lib/utils";

type StationData = {
  id: string;
  name: string;
  temperature: string;
  humidity: string;
  pressure: string;
  rain: string;
  lightLux: string;
  weather: string;
  systemStatus: "Working" | "Degraded" | "Offline";
  landslideRisk: "Low" | "Moderate" | "High" | "Critical";
};

const STATIONS: Record<string, StationData> = {
  "parashar-mandi": {
    id: "IITM-ACS-01",
    name: "Parashar, Mandi, India",
    temperature: "16.1 °C",
    humidity: "78 %",
    pressure: "1007 Pa",
    rain: "0 mm",
    lightLux: "—",
    weather: "broken clouds",
    systemStatus: "Working",
    landslideRisk: "Low",
  },
  "kamand-mandi": {
    id: "IITM-ACS-02",
    name: "Kamand Campus, Mandi, India",
    temperature: "18.4 °C",
    humidity: "72 %",
    pressure: "1012 Pa",
    rain: "2 mm",
    lightLux: "420 lux",
    weather: "scattered clouds",
    systemStatus: "Working",
    landslideRisk: "Low",
  },
  "joshimath-chamoli": {
    id: "IITM-ACS-03",
    name: "Joshimath, Chamoli, Uttarakhand",
    temperature: "12.8 °C",
    humidity: "86 %",
    pressure: "985 Pa",
    rain: "14 mm",
    lightLux: "180 lux",
    weather: "light rain & fog",
    systemStatus: "Working",
    landslideRisk: "Moderate",
  },
  "meppadi-wayanad": {
    id: "IITM-ACS-04",
    name: "Meppadi, Wayanad, Kerala",
    temperature: "22.5 °C",
    humidity: "92 %",
    pressure: "1004 Pa",
    rain: "28 mm",
    lightLux: "95 lux",
    weather: "heavy monsoon rain",
    systemStatus: "Working",
    landslideRisk: "High",
  },
  "ramgarh-nainital": {
    id: "IITM-ACS-05",
    name: "Ramgarh, Nainital, Uttarakhand",
    temperature: "15.3 °C",
    humidity: "68 %",
    pressure: "1009 Pa",
    rain: "0 mm",
    lightLux: "650 lux",
    weather: "clear sky",
    systemStatus: "Working",
    landslideRisk: "Low",
  },
};

export default function SafetyCheckPage() {
  const [selectedStationKey, setSelectedStationKey] = useState("parashar-mandi");
  const [currentStation, setCurrentStation] = useState(STATIONS["parashar-mandi"]);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDateStr, setCurrentDateStr] = useState("");
  const [formattedTimestamp, setFormattedTimestamp] = useState("");

  // Live ticking clock matching design format (e.g. 09:52:29 & 18-08-26 09:50:51)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Digital Header Clock: HH:MM:SS
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);

      // Header Date: Tuesday, 18 Aug 2026 • IST
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const dayName = days[now.getDay()];
      const dayNum = now.getDate();
      const monthName = months[now.getMonth()];
      const year = now.getFullYear();
      setCurrentDateStr(`${dayName}, ${dayNum} ${monthName} ${year} • IST`);

      // Card Timestamp: YY-MM-DD HH:MM:SS
      const yy = String(year).slice(-2);
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const dd = String(dayNum).padStart(2, "0");
      setFormattedTimestamp(`${yy}-${mm}-${dd} ${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStationKey(e.target.value);
  };

  const handleStationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (STATIONS[selectedStationKey]) {
      setCurrentStation(STATIONS[selectedStationKey]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f6f9] flex flex-col justify-between">
      <div>
        {/* Top Dark Hero Command Center Banner */}
        <section className="relative overflow-hidden bg-[#07131e] text-white border-t-4 border-[#70b300] px-4 py-10 sm:px-6 sm:py-14 lg:px-12">
          {/* Subtle ambient lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(112,179,0,0.15),rgba(255,255,255,0))]" />

          <div className="relative mx-auto max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Title & Live Badge */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#132c1c] border border-[#2d5f38] px-3 py-1 text-xs font-bold tracking-wider text-[#55dd77]">
                <span className="size-2 rounded-full bg-[#55dd77] animate-pulse" />
                LIVE
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
                Landslide Monitoring <br className="hidden sm:inline" />
                <span className="text-[#70b300]">Command Center</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-400 max-w-xl">
                Real-time environmental monitoring & AI-powered landslide risk analysis
              </p>
            </div>

            {/* Top Right Digital Live Clock & Active Stations Pill */}
            <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
              <div className="text-left md:text-right">
                <p className="font-mono text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                  {currentTime || "09:52:29"}
                </p>
                <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                  {currentDateStr || "Tuesday, 18 Aug 2026 • IST"}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl bg-[#0e2233]/90 border border-[#1b3d59] px-4 py-2 text-sm">
                <span className="font-extrabold text-lg text-[#70b300]">5</span>
                <span className="font-medium text-slate-300">Active Stations</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Body */}
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-12 space-y-8">
          {/* Select Location Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleStationSubmit} className="space-y-3">
              <label
                htmlFor="station-select"
                className="block text-xs font-extrabold uppercase tracking-widest text-slate-500"
              >
                SELECT LOCATION
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-full">
                  <select
                    id="station-select"
                    value={selectedStationKey}
                    onChange={handleSelectChange}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-800 focus:border-[#70b300] focus:outline-none focus:ring-2 focus:ring-[#70b300]/20 cursor-pointer shadow-xs"
                  >
                    <option value="parashar-mandi">Parashar, Mandi, India</option>
                    <option value="kamand-mandi">Kamand Campus, Mandi, India</option>
                    <option value="joshimath-chamoli">Joshimath, Chamoli, Uttarakhand</option>
                    <option value="meppadi-wayanad">Meppadi, Wayanad, Kerala</option>
                    <option value="ramgarh-nainital">Ramgarh, Nainital, Uttarakhand</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto shrink-0 rounded-xl bg-[#70b300] hover:bg-[#629d00] transition-colors px-10 py-3.5 text-sm font-bold text-white shadow-sm"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Telemetry Sensor Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: DATE / TIME */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm text-center flex flex-col items-center justify-center">
              <Clock className="size-9 text-[#70b300]" strokeWidth={1.75} />
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                DATE / TIME
              </p>
              <p className="mt-2 text-xl font-extrabold text-slate-900 font-mono tracking-tight">
                {formattedTimestamp || "18-08-26 09:50:51"}
              </p>
            </div>

            {/* Card 2: TEMPERATURE */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm text-center flex flex-col items-center justify-center">
              <Thermometer className="size-9 text-[#70b300]" strokeWidth={1.75} />
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                TEMPERATURE (°C)
              </p>
              <p className="mt-2 text-2xl font-extrabold text-slate-900 tracking-tight">
                {currentStation.temperature}
              </p>
            </div>

            {/* Card 3: HUMIDITY */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm text-center flex flex-col items-center justify-center">
              <Droplets className="size-9 text-[#70b300]" strokeWidth={1.75} />
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                HUMIDITY (%)
              </p>
              <p className="mt-2 text-2xl font-extrabold text-slate-900 tracking-tight">
                {currentStation.humidity}
              </p>
            </div>

            {/* Card 4: PRESSURE */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm text-center flex flex-col items-center justify-center">
              <Gauge className="size-9 text-[#70b300]" strokeWidth={1.75} />
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                PRESSURE (PA)
              </p>
              <p className="mt-2 text-2xl font-extrabold text-slate-900 tracking-tight">
                {currentStation.pressure}
              </p>
            </div>

            {/* Card 5: RAIN (MM) */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm text-center flex flex-col items-center justify-center">
              <CloudRain className="size-9 text-[#70b300]" strokeWidth={1.75} />
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                RAIN (MM)
              </p>
              <p className="mt-2 text-2xl font-extrabold text-slate-900 tracking-tight">
                {currentStation.rain}
              </p>
            </div>

            {/* Card 6: LIGHT (LUX) */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm text-center flex flex-col items-center justify-center">
              <Sun className="size-9 text-[#70b300]" strokeWidth={1.75} />
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                LIGHT (LUX)
              </p>
              <p className="mt-2 text-2xl font-extrabold text-slate-900 tracking-tight">
                {currentStation.lightLux}
              </p>
            </div>

            {/* Card 7: WEATHER */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm text-center flex flex-col items-center justify-center">
              <CloudSun className="size-9 text-[#70b300]" strokeWidth={1.75} />
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                WEATHER
              </p>
              <p className="mt-2 text-xl font-extrabold text-slate-900 tracking-tight">
                {currentStation.weather}
              </p>
            </div>

            {/* Card 8: SYSTEM STATUS */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm text-center flex flex-col items-center justify-center">
              <Radio className="size-9 text-[#70b300]" strokeWidth={1.75} />
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                SYSTEM STATUS
              </p>
              <div className="mt-3">
                <span className="inline-block rounded-full bg-[#eafaf1] text-[#1e824c] border border-[#a3e4d7] px-4 py-1 text-xs font-bold">
                  {currentStation.systemStatus}
                </span>
              </div>
            </div>

            {/* Card 9: LANDSLIDE RISK */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm text-center flex flex-col items-center justify-center sm:col-span-2 lg:col-span-1">
              <ShieldAlert className="size-9 text-[#70b300]" strokeWidth={1.75} />
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                LANDSLIDE RISK
              </p>
              <div className="mt-3">
                <span
                  className={cn(
                    "inline-block rounded-full px-6 py-1 text-xs font-bold border",
                    currentStation.landslideRisk === "Low"
                      ? "bg-[#fef9e7] text-[#b7950b] border-[#f9e79f]"
                      : currentStation.landslideRisk === "Moderate"
                      ? "bg-amber-100 text-amber-900 border-amber-300"
                      : "bg-red-100 text-red-900 border-red-300"
                  )}
                >
                  {currentStation.landslideRisk}
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer bar matching design */}
      <footer className="border-t border-slate-800 bg-[#07131e] py-6 text-center text-xs font-medium text-slate-400 mt-12">
        <p>© 2026 Landslide Monitoring System — IIT Mandi ACS Lab</p>
      </footer>
    </div>
  );
}
