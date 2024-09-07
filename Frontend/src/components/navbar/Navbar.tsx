import { FaCircleUser } from "react-icons/fa6";
import { BsGearFill } from "react-icons/bs";
import ThemeMenu from "../themeMenu/ThemeMenu";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { forwardRef } from "react";
import { DomRefElement, IconForwardRef } from "../../types/DomRefElement";

const GearIcon = forwardRef<HTMLDivElement, IconForwardRef>((props, ref) => (
  <div ref={ref}>
    <BsGearFill {...props} />
  </div>
));

function Navbar(): JSX.Element {
  const [openThemeMenu, setOpenThemeMenu] = useState(false);
  const iconRef = useRef<DomRefElement>(null);
  const themeRef = useRef<DomRefElement>(null);

  const handleOpenThemeMenu = () => {
    setOpenThemeMenu(!openThemeMenu);
  };

  const handleClickOutside = (event: MouseEvent | Event) => {
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
            <GearIcon
              ref={iconRef}
              onClick={handleOpenThemeMenu}
              className="text-[25px] text-teal-500 dark:text-slate-400 cursor-pointer select-none"
            />
            <AnimatePresence>
              {openThemeMenu ? <ThemeMenu ref={themeRef} /> : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
