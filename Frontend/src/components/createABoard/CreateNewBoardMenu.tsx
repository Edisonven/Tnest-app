import { motion } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";
import { OpenCreateBoardMenu } from "../../types/ThemeMenuProp";
import { IoClose } from "react-icons/io5";
import board1 from "/images/application/boards-background/board-1.png";
import skeleton from "/images/application/boards-background/skeleton-2.png";
import { background } from "./background.ts";
import { FormEvent } from "react";
import {
  useAppSelector,
  useAppDispatch,
} from "../../features/boardBackgroundSlice.ts";
import { setTitle, setImage } from "../../features/boardBackgroundSlice.ts";
import { useNavigate } from "react-router-dom";

const CreateNewBoardMenu = forwardRef<HTMLDivElement, OpenCreateBoardMenu>(
  ({ setOpenCreateBoardMenu, setOpenModal }, _) => {
    const [boardImage, setBoardImage] = useState(board1);
    const [error, setError] = useState("");
    const { title } = useAppSelector((state) => state.background);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleCloseBoardMenu = () => {
      setOpenCreateBoardMenu(false);
      if (setOpenModal) {
        setOpenModal(false);
      }
    };

    const handleSendBoardProps = (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();

      dispatch(setImage(boardImage));

      if (title.trim() === "") {
        setError("El título es obligatorio *");
      } else {
        navigate("/my-board");
      }
    };

    useEffect(() => {
      setError("");
    }, [title]);

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
              <h1 className="font-medium text-slate-800 dark:text-gray-300">
                Crear tablero
              </h1>
              <IoClose
                onClick={handleCloseBoardMenu}
                className="text-[28px] text-slate-800 dark:text-gray-300 cursor-pointer absolute top-[-2px] right-0 hover:bg-[#0000002a] rounded-md p-1"
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
                  className="rounded shadow w-full max-w-[190px] h-[120px] object-fill"
                  src={boardImage}
                  alt="fondo-tablero-1"
                />
              </figure>
            </div>
            <div>
              <h1 className="text-slate-800 dark:text-gray-300 font-medium text-sm mb-1">
                Fondos
              </h1>
              <div className="flex items-center justify-between gap-1 mb-3">
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
              <div>
                <h1 className="text-slate-800 dark:text-gray-300 font-medium text-sm mb-1">
                  Título de tablero
                </h1>
                <form onSubmit={handleSendBoardProps}>
                  <input
                    value={title}
                    onChange={(e) => dispatch(setTitle(e.target.value))}
                    type="text"
                    id="titulo"
                    name="titulo"
                    className="bg-transparent text-slate-800 dark:text-gray-300 px-2 border-none outline outline-1 outline-slate-800 dark:outline-white h-[33px] w-full rounded"
                  />
                  <span className="mt-2 block font-bold text-sm text-red-600">
                    {error}
                  </span>
                  <button className="bg-teal-700 text-gray-300 font-medium rounded shadow mt-3 w-full h-[38px] dark:bg-[#131842] dark:text-gray-300">
                    Crear
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
);

export default CreateNewBoardMenu;
