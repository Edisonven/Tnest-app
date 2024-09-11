import { forwardRef } from "react";
import { motion } from "framer-motion";
import { background } from "./backgrounds2";
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
      <h1 className="text-slate-800 dark:text-gray-300 text-center font-bold">
        Opciones del tablero
      </h1>
      <div className="mt-3">
        <hr className="my-2" />
        <p className="text-slate-800 dark:text-gray-300 font-medium text-sm">
          Cambiar fondo
        </p>
        <div>
          <div className="flex items-center justify-center flex-wrap gap-3 my-3">
            {background.map((img) => (
              <img
                key={img.id}
                className="rounded w-full max-w-[100px] h-[60px] object-fill cursor-pointer hover:brightness-125 hover:outline outline-1 outline-slate-600 hover:dark:outline-white"
                src={img.href}
                alt="fondo-tablero"
              />
            ))}
          </div>
          <div className="flex justify-center mb-4">
            <button className="bg-teal-700 text-gray-300 font-medium rounded shadow mt-3 w-full h-[38px] dark:bg-[#131842] dark:text-gray-300">
              Cambiar
            </button>
          </div>
        </div>
        <hr className="my-2" />
        <button className="text-slate-800 dark:text-gray-300 font-medium text-sm">
          Eliminar tablero
        </button>
      </div>
    </motion.div>
  );
});

export default AsideBoardOptions;
