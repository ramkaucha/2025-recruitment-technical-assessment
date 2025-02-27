"use client";

import Image from "next/image";
import { GoSearch } from "react-icons/go";
import { MdGridView, MdDarkMode } from "react-icons/md";
import { IoMdMap } from "react-icons/io";
import { useState } from "react";
import logoOpen from "@/assets/freeRoomsLogo.png";
import logoClose from "@/assets/freeroomsDoorClosed.png";

const NAVPAGES = [
  {
    name: "search",
    route: "/search",
    current: false,
    icon: GoSearch,
  },
  {
    name: "browse",
    route: "/",
    current: false,
    icon: MdGridView,
  },
  {
    name: "map",
    route: "/map",
    current: false,
    icon: IoMdMap,
  },
  {
    name: "darkmode",
    route: "/darkmode",
    current: false,
    icon: MdDarkMode,
  },
];

export default function Navigation() {
  const currentPath = "/";
  const [pages, setPages] = useState(() => {
    return NAVPAGES.map((page) => ({
      ...page,
      current: page.route === currentPath,
    }));
  });
  const [logo, setLogo] = useState(logoOpen);

  const handleLogoClick = () => {
    if (logo === logoOpen) {
      setLogo(logoClose);
    } else {
      setLogo(logoOpen);
    }
  };

  return (
    <div className="flex justify-between items-center w-full px-5 py-2 border-b">
      <div className="flex items-center text-orange-500">
        <Image
          src={logo}
          alt="Freeroom's logo"
          width="50"
          height="50"
          onClick={() => handleLogoClick()}
          className="cursor-pointer"
        />
        <span className="text-3xl hidden sm:block">Freerooms</span>
      </div>
      <div className="flex gap-3">
        {pages.map((item) => (
          <button
            key={item.name}
            className={`w-11 h-11 rounded-md border-orange-500 border flex flex-col justify-center items-center ${
              item.current ? "text-white bg-orange-500" : "bg-white text-orange-500"
            }`}
          >
            <item.icon className="w-6 h-6" />
          </button>
        ))}
      </div>
    </div>
  );
}
