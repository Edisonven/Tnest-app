import { MdLightMode, MdDarkMode } from "react-icons/md";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import { ThemeMenuProps } from "../../types/ThemeMenuProp";

const ThemeMenu = forwardRef<HTMLDivElement, ThemeMenuProps>(
  ({ aplicationTheme, setApplicationTheme }, ref) => {
    const handleSetDarkTheme = () => {
      const newTheme = "dark";
      setApplicationTheme(newTheme);
      document.documentElement.setAttribute("class", newTheme);
      localStorage.setItem("theme", newTheme);
    };

    const handleSetLightTheme = () => {
      const newTheme = "light";
      setApplicationTheme(newTheme);
      document.documentElement.setAttribute("class", newTheme);
      localStorage.setItem("theme", newTheme);
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2, ease: "backInOut" }}
        style={{ originX: 1, originY: 0 }}
        className="absolute top-[47px] right-0 bg-white dark:bg-[#141826] shadow-lg rounded outline outline-1 outline-gray-800"
      >
        <div className="p-1 flex items-center gap-1 select-none">
          <MdLightMode
            onClick={handleSetLightTheme}
            className={`${
              aplicationTheme === "light"
                ? "text-yellow-400"
                : "text-gray-400"
            } text-[35px] cursor-pointer p-1 rounded hover:bg-[#7575753a]`}
          />
          <MdDarkMode
            onClick={handleSetDarkTheme}
            className={`${
              aplicationTheme === "dark"
                ? "text-gray-200"
                : "text-slate-800"
            } text-[35px] cursor-pointer p-1 rounded hover:bg-[#7575753a]`}
          />
        </div>
      </motion.div>
    );
  }
);

export default ThemeMenu;
