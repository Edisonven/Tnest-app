import { motion } from "framer-motion";
import { forwardRef, useRef, useEffect, useState } from "react";
import { OpenCreateBoardMenu } from "../../types/ThemeMenuProp";
import { IoClose } from "react-icons/io5";
import board1 from "/images/application/boards-background/board-1.png";
import skeleton from "/images/application/boards-background/skeleton-2.png";
import { background } from "./background.ts";

const CreateNewBoardMenu = forwardRef<HTMLDivElement, OpenCreateBoardMenu>(
  ({ setOpenCreateBoardMenu, setOpenModal }, _) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [boardImage, setBoardImage] = useState("");

    const handleCloseBoardMenu = () => {
      setOpenCreateBoardMenu(false);
      if (setOpenModal) {
        setOpenModal(false);
      }
    };
    console.log(boardImage);
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
          className="absolute top-[45px] right-0 w-[320px] bg-white dark:bg-[#393C73] rounded-md shadow-lg p-2"
        >
          <div className="p-1 rounded select-none">
            <div className="flex items-center justify-center gap-2 mb-5 relative">
              <h1 className="font-medium text-slate-800 dark:text-white">
                Crear tablero
              </h1>
              <IoClose
                onClick={handleCloseBoardMenu}
                className="text-[28px] text-slate-800 dark:text-white cursor-pointer absolute top-[-2px] right-0 hover:bg-[#0000002a] rounded-md p-1"
              />
            </div>
            <div className="flex items-center justify-center mb-4">
              <figure className="relative">
                <img
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[160px]"
                  src={skeleton}
                  alt=""
                />

                <img
                  className="rounded shadow w-full max-w-[190px] h-[120px] object-cover"
                  src={boardImage}
                  alt="fondo-tablero-1"
                />
              </figure>
            </div>
            <div>
              <h1 className="text-slate-800 dark:text-white font-medium text-sm mb-1">
                Fondos
              </h1>
              <div className="flex items-center justify-between gap-1">
                {background.map((img) => (
                  <img
                    onClick={() => setBoardImage(img.href)}
                    key={img.id}
                    className="rounded w-full max-w-[68px] h-[40px] object-fill cursor-pointer hover:brightness-125 hover:outline outline-1 outline-slate-600 hover:dark:outline-white"
                    src={img.href}
                    alt="fondo-tablero-1"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
);

export default CreateNewBoardMenu;
