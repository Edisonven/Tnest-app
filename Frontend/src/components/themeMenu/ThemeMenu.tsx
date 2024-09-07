import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

function ThemeMenu(): JSX.Element {
  return (
    <div className="absolute top-[40px] right-0 bg-white dark:bg-[#393C73] shadow-lg rounded ">
      <div className="p-1 flex items-center gap-1 select-none">
        <MdLightMode className="text-[40px] cursor-pointer hover:bg-slate-200 p-1" />
        <MdDarkMode className="text-[40px] cursor-pointer hover:bg-slate-200 p-1" />
      </div>
    </div>
  );
}

export default ThemeMenu;
