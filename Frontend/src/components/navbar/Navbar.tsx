import { FaCircleUser } from "react-icons/fa6";
import { BsGearFill } from "react-icons/bs";
import ThemeMenu from "../themeMenu/ThemeMenu";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { forwardRef } from "react";
import { DomRefElement, IconForwardRef } from "../../types/DomRefElement";
import CreateABoard from "../createABoard/CreateABoard";
import { Link } from "react-router-dom";

const GearIcon = forwardRef<HTMLDivElement, IconForwardRef>((props, ref) => (
  <div ref={ref}>
    <BsGearFill {...props} />
  </div>
));

function Navbar(): JSX.Element {
  const [openThemeMenu, setOpenThemeMenu] = useState(false);
  const iconRef = useRef<DomRefElement>(null);
  const themeRef = useRef<DomRefElement>(null);
  const [aplicationTheme, setApplicationTheme] = useState("light");

  const handleOpenThemeMenu = () => {
    setOpenThemeMenu(!openThemeMenu);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      iconRef.current &&
      themeRef.current &&
      !iconRef.current.contains(event.target as Node) &&
      !themeRef.current.contains(event.target as Node)
    ) {
      setOpenThemeMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <section className="bg-white dark:bg-[#393C73] p-2 relative z-10">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto">
        <div>
          <Link to="/" className="font-bold text-slate-800 dark:text-white">
            TASKMANAGEMENT
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="">
            <CreateABoard />
          </div>
          <div className="relative">
            <FaCircleUser className="text-[30px] text-teal-500 dark:text-slate-400 cursor-pointer select-none" />
          </div>
          <div className="relative">
            <GearIcon
              ref={iconRef}
              onClick={handleOpenThemeMenu}
              className="text-[35px] text-teal-500 dark:text-slate-400 cursor-pointer select-none hover:bg-[#0000001f] dark:hover:bg-[#00000054] rounded-full p-[6px] duration-300"
            />
            <AnimatePresence>
              {openThemeMenu ? (
                <ThemeMenu
                  aplicationTheme={aplicationTheme}
                  setApplicationTheme={setApplicationTheme}
                  ref={themeRef}
                />
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
