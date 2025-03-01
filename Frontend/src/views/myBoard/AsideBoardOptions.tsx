import { forwardRef } from "react";
import { motion } from "framer-motion";
import { background } from "./backgrounds2";
import { setImage } from "../../features/boardBackgroundSlice";
import { useAppDispatch } from "../../features/boardBackgroundSlice";
import { Img } from "react-image";
import { TbTrashXFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { setReOrderTaks } from "../../features/tasksSlice";

const AsideBoardOptions = forwardRef<HTMLDivElement>(({}, ref) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeBoardBackground = (href: string): void => {
    dispatch(setImage(href));
    const existingBoardData = JSON.parse(localStorage.getItem("board") || "{}");
    const updatedBoardData = {
      ...existingBoardData,
      image: href,
    };
    localStorage.setItem("board", JSON.stringify(updatedBoardData));
  };

  const handleDeleteCurrentBoard = (): void => {
    localStorage.removeItem("board");
    localStorage.removeItem("tasks");
    dispatch(setReOrderTaks([]));
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "backInOut" }}
      style={{ originX: 1, originY: 0 }}
      ref={ref}
      className="absolute top-[100%] left-[20px] dark:bg-[#141826] bg-white px-5 py-2 rounded shadow-xl w-[300px] outline outline-1 outline-gray-800"
    >
      <h1 className="text-slate-800 dark:text-gray-300 text-center font-bold">
        Opciones del tablero
      </h1>
      <div className="mt-3">
        <hr className="my-2 border-gray-400" />
        <p className="text-slate-800 dark:text-gray-300 font-medium text-sm">
          Cambiar fondo
        </p>
        <div>
          <div className="flex items-center justify-center flex-wrap gap-3 my-3">
            {background.map((img) => (
              <Img
                onClick={() => handleChangeBoardBackground(img.href)}
                key={img.id}
                className="rounded w-full max-w-[120px] h-[70px] object-fill cursor-pointer hover:brightness-125 hover:outline outline-1 outline-slate-600 hover:dark:outline-white"
                src={img.href}
                alt="fondo-tablero"
              />
            ))}
          </div>
          <hr className="my-2 border-gray-400" />
        </div>
        <div className="mb-4">
          <button
            onClick={handleDeleteCurrentBoard}
            className="text-slate-800 dark:text-gray-300 mt-4 font-medium text-sm flex items-center gap-2 hover:bg-[#0000004b] px-2 py-1 rounded"
          >
            Eliminar tablero
            <TbTrashXFilled className="text-slate-800 dark:text-gray-300 text-[16px]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
});

export default AsideBoardOptions;
