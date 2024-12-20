import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const BurgerMenu = forwardRef<HTMLDivElement>(({}, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, ease: "backInOut" }}
      style={{ originX: 1, originY: 0 }}
      className="bg-white shadow-lg rounded dark:bg-[#141826] p-3 absolute top-[44px] right-0 w-[150px] outline outline-1 outline-gray-800"
    >
      <div className="flex flex-col items-center gap-3 w-full"></div>
      <hr className="my-2" />
      <Link
        className="text-slate-800 dark:text-white w-full text-center text-sm font-medium flex items-center justify-center gap-2"
        to="/my-board"
      >
        Mis tableros
        <MdOutlineSpaceDashboard className="text-[22px]" />
      </Link>
      <hr className="my-2" />
    </motion.div>
  );
});

export default BurgerMenu;
