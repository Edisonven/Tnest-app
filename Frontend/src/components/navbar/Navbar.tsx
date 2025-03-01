import ThemeMenu from "../themeMenu/ThemeMenu";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { DomRefElement } from "../../types/DomRefElement";
import CreateABoard from "../createABoard/CreateABoard";
import { Link } from "react-router-dom";
import BurgerMenu from "../burgerMenu/BurgerMenu";
import { ThemeMenuProps } from "../../types/ThemeMenuProp";
import { MdDashboard } from "react-icons/md";
import { GearIcon, UserIcon } from "../../utils/IconsForwardRefs";

function Navbar({
  setApplicationTheme,
  aplicationTheme,
}: ThemeMenuProps): JSX.Element {
  const [openThemeMenu, setOpenThemeMenu] = useState(false);
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  const gearIconRef = useRef<DomRefElement>(null);
  const userMenuRef = useRef<DomRefElement>(null);
  const themeRef = useRef<DomRefElement>(null);
  const burgerRef = useRef<DomRefElement>(null);

  const handleOpenThemeMenu = (): void => {
    setOpenThemeMenu(!openThemeMenu);
  };

  const handleOpenBurgerMenu = (): void => {
    setOpenBurgerMenu(!openBurgerMenu);
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      gearIconRef.current &&
      themeRef.current &&
      !gearIconRef.current.contains(event.target as Node) &&
      !themeRef.current.contains(event.target as Node)
    ) {
      setOpenThemeMenu(false);
    }

    if (
      gearIconRef.current &&
      userMenuRef.current &&
      burgerRef.current &&
      !userMenuRef.current.contains(event.target as Node) &&
      !burgerRef.current.contains(event.target as Node)
    ) {
      setOpenBurgerMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <section className="bg-white dark:bg-[#141826] p-2 relative z-30 outline outline-1 outline-gray-800">
      <div className="flex items-center justify-between max-w-[1800px] mx-auto">
        <div className="">
          <Link
            to="/"
            className="font-bold text-slate-800 px-2 dark:text-white text-[23px] flex items-center gap-1 hover:bg-slate-700 rounded duration-300"
          >
            TNest
            <MdDashboard className="text-slate-800 dark:text-gray-300 text-[23px]" />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="">
            <CreateABoard />
          </div>
          <div className="relative">
            <UserIcon
              ref={userMenuRef}
              onClick={handleOpenBurgerMenu}
              className="text-[30px] text-teal-500 dark:text-slate-400 cursor-pointer select-none"
            />
            <AnimatePresence>
              {openBurgerMenu ? <BurgerMenu ref={burgerRef} /> : null}
            </AnimatePresence>
          </div>
          <div className="relative">
            <GearIcon
              ref={gearIconRef}
              onClick={handleOpenThemeMenu}
              className="text-[35px] text-teal-500 dark:text-slate-400 cursor-pointer select-none hover:bg-[#0000001f] dark:hover:bg-[#72727254] rounded-full p-[6px] duration-300"
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
