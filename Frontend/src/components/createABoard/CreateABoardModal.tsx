import { forwardRef } from "react";
import { TbLayoutBoard } from "react-icons/tb";
import { motion } from "framer-motion";
import { OpenCreateBoardMenu } from "../../types/ThemeMenuProp";

const CreateABoardModal = forwardRef<HTMLDivElement, OpenCreateBoardMenu>(
  ({ setOpenCreateBoardMenu, setOpenModal }, ref) => {
    const handleOpenCreateBoardMenu = () => {
      setOpenCreateBoardMenu(true);
      if (setOpenModal) {
        setOpenModal(false);
      }
    };

    return (
      <motion.div
        onClick={handleOpenCreateBoardMenu}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2, ease: "backInOut" }}
        style={{ originX: 1, originY: 0 }}
        ref={ref}
        className="absolute top-[45px] right-0 w-[250px] bg-white dark:bg-[#141826] outline outline-1 outline-gray-800 rounded shadow-lg p-2"
      >
        <div className="cursor-pointer hover:bg-[#72727250] p-1 rounded select-none">
          <div className="flex items-center gap-2 mb-2">
            <TbLayoutBoard className="text-[20px] text-slate-800 dark:text-white" />
            <h1 className="text-sm text-slate-800 dark:text-gray-300">
              Crea un tablero
            </h1>
          </div>
          <span className="text-xs font-normal text-slate-800 dark:text-gray-300">
            Un tablero es un conjunto de tarjetas ordenadas como lista, úsalo
            para gestionar tus tareas diarias, o proyectos.
          </span>
        </div>
      </motion.div>
    );
  }
);

export default CreateABoardModal;
