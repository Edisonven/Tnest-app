import { MdLightMode, MdDarkMode } from "react-icons/md";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const ThemeMenu = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      style={{ originX: 1, originY: 0 }}
      className="absolute top-[40px] right-0 bg-white dark:bg-[#393C73] shadow-lg rounded "
    >
      <div className="p-1 flex items-center gap-1 select-none">
        <MdLightMode className="text-[35px] cursor-pointer hover:bg-slate-200 p-1" />
        <MdDarkMode className="text-[35px] cursor-pointer hover:bg-slate-200 p-1" />
      </div>
    </motion.div>
  );
});

export default ThemeMenu;
