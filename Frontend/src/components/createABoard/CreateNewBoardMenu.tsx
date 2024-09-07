import { motion } from "framer-motion";
import { forwardRef, useRef, useEffect } from "react";
import { OpenCreateBoardMenu } from "../../types/ThemeMenuProp";
import { IoClose } from "react-icons/io5";

const CreateNewBoardMenu = forwardRef<HTMLDivElement, OpenCreateBoardMenu>(
  ({ setOpenCreateBoardMenu, setOpenModal }, _) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleCloseBoardMenu = () => {
      setOpenCreateBoardMenu(false);
      if (setOpenModal) {
        setOpenModal(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenCreateBoardMenu(false);
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);

    return (
      <div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2, ease: "backInOut" }}
          style={{ originX: 1, originY: 0 }}
          className="absolute top-[45px] right-0 w-[250px] bg-white dark:bg-[#393C73] rounded-md shadow-lg p-2"
        >
          <div className="p-1 rounded select-none">
            <div className="flex items-center justify-center gap-2 mb-2 relative">
              <h1 className="font-medium text-slate-800 dark:text-white">
                Crear tablero
              </h1>
              <IoClose
                onClick={handleCloseBoardMenu}
                className="text-[28px] text-slate-800 dark:text-white cursor-pointer absolute top-0 right-0 hover:bg-[#0000002a] rounded-md p-1"
              />
            </div>
            <span className="text-xs font-normal text-slate-800 dark:text-white">
              Un tablero es un conjunto de tarjetas ordenadas como lista, úsalo
              para gestionar tus tareas diarias, o proyectos.
            </span>
          </div>
        </motion.div>
      </div>
    );
  }
);

export default CreateNewBoardMenu;
