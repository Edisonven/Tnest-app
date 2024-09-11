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
      className="absolute top-[100%] left-[20px] dark:bg-[#393C73] bg-white px-5 py-2 rounded shadow-xl w-[300px]"
    >
      <h1 className="text-slate-800 dark:text-gray-300 text-center font-normal">
        Opciones del tablero
      </h1>
      <div className="mt-3">
        <p className="text-slate-800 dark:text-gray-300 font-medium">
          Eliminar tablero
        </p>
        <hr className="my-4" />
        <p className="text-slate-800 dark:text-gray-300 font-medium">
          Cambiar fondo
        </p>
      </div>
    </motion.div>
  );
});

export default AsideBoardOptions;
