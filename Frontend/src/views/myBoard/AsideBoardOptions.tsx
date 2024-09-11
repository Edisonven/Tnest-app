import { forwardRef } from "react";
import { motion } from "framer-motion";

const AsideBoardOptions = forwardRef<HTMLDivElement>(({}, ref) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, ease: "backInOut" }}
      style={{ originX: 1, originY: 0 }}
      ref={ref}
      className="absolute top-[100%] left-[20px] bg-[#393C73] p-2 rounded shadow-xl"
    >
      <h1 className="text-slate-800 dark:text-gray-300">AsideBoardOptions</h1>
    </motion.div>
  );
});

export default AsideBoardOptions;
