import { useEffect, useRef, useState, ChangeEvent } from "react";
import TaskList from "../../components/taskList/TaskList";
import {
  useAppSelector,
  useAppDispatch,
} from "../../features/boardBackgroundSlice";
import { setImage, setTitle } from "../../features/boardBackgroundSlice";
import "./myBoard.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import AsideBoardOptions from "./AsideBoardOptions";
import { forwardRef } from "react";
import { ThreeDotsIconForwardRef } from "../../types/DomRefElement";
import { AnimatePresence } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const ThreeDotsIcon = forwardRef<HTMLDivElement, ThreeDotsIconForwardRef>(
  (props, ref) => (
    <div ref={ref}>
      <BsThreeDotsVertical {...props} />
    </div>
  )
);

function MyBoard() {
  const { image, title } = useAppSelector((state) => state.background);
  const [openModalOptions, setOpenModalOptions] = useState(false);
  const dispatch = useAppDispatch();
  const modalAsideRef = useRef<HTMLDivElement>(null);
  const modalIconAsideRef = useRef<HTMLDivElement>(null);
  const [boardTitle, setBoardTitle] = useState(title);
  const [hideSidebarClass, setHideSidebarClass] = useState("");
  const [showSidebarMenu, setShowSidebarMenu] = useState(false);

  useEffect(() => {
    const storedBoard = localStorage.getItem("board");
    if (storedBoard) {
      const { image, title } = JSON.parse(storedBoard);
      dispatch(setImage(image));
      dispatch(setTitle(title));
    }
  }, [dispatch]);

  const handleOpenModalOptions = () => {
    setOpenModalOptions(!openModalOptions);
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      modalAsideRef.current &&
      modalIconAsideRef.current &&
      !modalAsideRef.current.contains(event.target as Node) &&
      !modalIconAsideRef.current.contains(event.target as Node)
    ) {
      setOpenModalOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBoardTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    const storedBoard = localStorage.getItem("board");
    const parsedBoard = storedBoard ? JSON.parse(storedBoard) : {};
    if (boardTitle && boardTitle.trim() !== "") {
      dispatch(setTitle(boardTitle));
      localStorage.setItem(
        "board",
        JSON.stringify({ ...parsedBoard, title: boardTitle })
      );
    }
  };

  const handleAddSidebarClass = () => {
    const className = "fixed h-full translate-x-[-245px]";
    setHideSidebarClass(className);
    setShowSidebarMenu(true);
  };

  const handleRemoveSidebarClass = () => {
    const className = "";
    setHideSidebarClass(className);
    setShowSidebarMenu(false);
  };

  return (
    <section className="select-none">
      <div>
        <img className="fixed w-full" src={image} alt="" />
        <div className="relative z-[5]">
          {!image || !title ? (
            <div className="no-board flex items-center justify-center w-full">
              <p className="text-slate-800 dark:text-gray-300">
                Aún no tienes tableros
              </p>
            </div>
          ) : (
            <div className="my-board-container">
              <div className="w-full overflow-hidden">
                <div className="py-3 px-5 w-full bg-[#ebebeb5b] shadow dark:bg-[#00000034] h-[60px] backdrop-blur-sm">
                  <input
                    onBlur={handleTitleBlur}
                    onChange={handleTitleChange}
                    className="text-slate-100 text-xl font-bold dark:text-white bg-transparent w-max px-2"
                    type="text"
                    value={boardTitle}
                  />
                </div>
                <div className="flex items-start py-4 px-6 gap-4">
                  <TaskList id={"1"} title="Lista de tareas" />
                  <TaskList id={"2"} title="En proceso" />
                  <TaskList id={"3"} title="En revisión" />
                  <TaskList id={"4"} title="Completado" />
                </div>
              </div>
              <div
                className={`bg-[#ebebebe5] dark:bg-[#141826ee] max-w-[260px] w-full shadow p-4 backdrop-blur-sm flex flex-col ${hideSidebarClass} duration-150`}
              >
                <div
                  onClick={handleAddSidebarClass}
                  className="self-end border border-gray-800 rounded shadow p-1 hover:brightness-125 cursor-pointer"
                >
                  <IoIosArrowBack className="text-slate-800 dark:text-gray-300 text-[20px]" />
                </div>
                <div
                  onClick={handleRemoveSidebarClass}
                  className={`absolute left-[246px] top-[45px] border border-gray-600 rounded-full dark:bg-[#141826] p-1 cursor-pointer ${
                    showSidebarMenu ? "" : "hidden"
                  }`}
                >
                  <IoIosArrowForward className="text-slate-800 dark:text-gray-300 text-[18px]" />
                </div>
                <hr className="my-4 border-none h-[1px] bg-slate-800 dark:bg-gray-800" />
                <div className="">
                  <h1 className="text-slate-800 dark:text-gray-300 mb-3 font-medium">
                    Mis tableros
                  </h1>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        className="max-w-[50px] h-[35px] object-cover rounded"
                        src={image}
                        alt=""
                      />
                      <span className="text-slate-800 dark:text-gray-300 font-medium">
                        {title}
                      </span>
                    </div>
                    <div className="relative">
                      <ThreeDotsIcon
                        ref={modalIconAsideRef}
                        onClick={handleOpenModalOptions}
                        className="text-slate-800 dark:text-gray-300 text-[27px] p-1 hover:bg-[#00000050] rounded-full duration-200 cursor-pointer"
                      />
                      <AnimatePresence>
                        {openModalOptions ? (
                          <AsideBoardOptions ref={modalAsideRef} />
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MyBoard;
