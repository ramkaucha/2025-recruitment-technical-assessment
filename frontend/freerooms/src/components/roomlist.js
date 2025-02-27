"use client";

import { useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { GoDot, GoDotFill } from "react-icons/go";

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
        <div key={item.name} className="border rounded-xl">
          <div
            className="relative aspect-[5/1] md:aspect-[19/20] sm:aspect-[10/7] w-full bg-center bg-cover flex flex-row justify-between sm:flex-col rounded-xl"
            style={{ backgroundImage: `url(${item.building_picture})` }}
          >
            <div className="flex p-2 order-2 sm:order-1 items-center sm:justify-end">
              <div className="bg-white p-3 rounded-2xl font-semibold shadow-md text-sm flex justify-between gap-2">
                <GoDotFill
                  className={`h-5 w-5 ${
                    item.rooms_available > 5 ? "text-green-700" : "text-yellow-400"
                  }`}
                />
                <span className="hidden sm:inline">
                  {item.rooms_available} {item.rooms_available > 1 ? "rooms" : "room"} available
                </span>
                <span className="sm:hidden">
                  {item.rooms_available} / {item.rooms_available}
                </span>
              </div>
            </div>

            <div className="sm:flex-grow hidden sm:order-2"></div>

            <div className="order-1 sm:order-3 justify-center sm:bg-orange-500 p-4 md:p-5 mt-auto rounded-xl m-3 flex items-center sm:justify-between">
              <div className="font-bold text-white text-md">{item.name}</div>
              <div className="text-white font-bold text-lg hidden md:flex justify-between gap-1">
                <span>0</span>
                <IoStarSharp className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
