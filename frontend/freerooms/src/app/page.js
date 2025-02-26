import { MdFilterAlt, MdFilterList } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import RoomList from "@/components/roomlist";

export default function Home() {
  return (
    <div className="px-5 flex flex-col py-4">
      <div className="flex flex-row justify-between w-full gap-10">
        <div className="flex items-center gap-2">
          <button className="border-2 flex border-orange-500 font-bold px-10 py-3 rounded-md text-orange-500 gap-2">
            <MdFilterAlt className="h-6 w-6" />
            <span className="text-md">Filters</span>
          </button>
          <button className="border-2 flex border-orange-500 font-bold px-10 py-3 rounded-md text-orange-500 gap-2">
            <MdFilterList className="h-6 w-6" />
            <span className="text-md">Sort</span>
          </button>
        </div>
        <div className="flex-1 mx-52">
          <form className="w-full">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <GoSearch className="w-6 h-6" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md focus-within:border-orange-500"
                placeholder="Search for a building..."
                required
              />
            </div>
          </form>
        </div>
        <div className="flex items-center gap-2">
          <button className="border flex justify-between border-gray-500 py-3 rounded-s gap-2 px-1.5 w-36">
            <span className="text-md">26/02/25</span>
            <CiCalendar className="h-6 w-6" />
          </button>
          <button className="border flex justify-between border-gray-500 px-1.5 py-3 rounded-s gap-2 w-36">
            <span className="text-md">08:38 PM</span>
            <FaRegClock className="h-6 w-6" />
          </button>
        </div>
      </div>
      {/* Div for all buildings n shi */}
      <div>
        <RoomList />
      </div>
    </div>
  );
}
