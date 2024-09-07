import { FaCircleUser } from "react-icons/fa6";
import { BsGearFill } from "react-icons/bs";
import ThemeMenu from "../themeMenu/ThemeMenu";

function Navbar(): JSX.Element {
  return (
    <section className="bg-white dark:bg-[#393C73] p-2">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto">
        <div>
          <h1 className="font-bold">TASKMANAGEMENT</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <FaCircleUser className="text-[30px] text-teal-500 dark:text-slate-400 cursor-pointer select-none" />
          </div>
          <div className="relative">
            <BsGearFill className="text-[25px] text-teal-500 dark:text-slate-400 cursor-pointer select-none" />
            <ThemeMenu />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
