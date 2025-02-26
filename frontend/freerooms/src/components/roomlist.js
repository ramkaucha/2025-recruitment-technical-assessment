"use client";

import { useState } from "react";
import Image from "next/image";

const BUILDINGS = [
  {
    name: "AGSM",
    rooms_available: 9,
    building_file: "/agsm.webp",
  },
  {
    name: "Ainsworth Building",
    rooms_available: 16,
    building_picture: "/ainsworth.webp",
  },
  {
    name: "Anita B Lawrence Centre",
    rooms_available: 44,
    building_picture: "/anitab.webp",
  },
  {
    name: "Biological Sciences",
    rooms_available: 6,
    building_picture: "/biologicalScience.webp",
  },
  {
    name: "Biological Science (West)",
    rooms_available: 8,
    building_picture: "/biologicalScienceWest.webp",
  },
  {
    name: "Blockhouse",
    rooms_available: 42,
    building_picture: "/blockhouse.webp",
  },
  {
    name: "Business School",
    rooms_available: 18,
    building_picture: "/businessSchool.webp",
  },
  {
    name: "Civil Engineering Building",
    rooms_available: 8,
    building_picture: "/civilBuilding.webp",
  },
  {
    name: "Colombo Building",
    rooms_available: 5,
    building_picture: "/colombo.webp",
  },
  {
    name: "Computer Science & Eng (K17)",
    rooms_available: 7,
    building_picture: "/cseBuilding.webp",
  },
];

export default function RoomList() {
  const [buildings, setBuildings] = useState(BUILDINGS);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-5">
      {buildings.map((item) => (
        <div key={item.name} className="border rounded-md">
          <div
            className="relative aspect-[19/20] w-full bg-center bg-cover flex flex-col"
            style={{ backgroundImage: `url(${item.building_picture})` }}
          >
            <div className="flex justify-end p-2">
              <div className="bg-white p-2 rounded-md shadow-md">Content</div>
            </div>

            <div className="flex-grow"></div>

            <div className="bg-white bg-opacity-80 p-3 mt-auto">
              <div className="font-semibold">Something</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
