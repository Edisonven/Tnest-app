import { useEffect } from "react";
import TaskList from "../../components/taskList/TaskList";
import {
  useAppSelector,
  useAppDispatch,
} from "../../features/boardBackgroundSlice";
import { setImage, setTitle } from "../../features/boardBackgroundSlice";
import "./myBoard.css";
import { BsThreeDotsVertical } from "react-icons/bs";

function MyBoard() {
  const { image, title } = useAppSelector((state) => state.background);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedBoard = localStorage.getItem("board");
    if (storedBoard) {
      const { image, title } = JSON.parse(storedBoard);
      dispatch(setImage(image));
      dispatch(setTitle(title));
    }
  }, [dispatch]);

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
              <div className="w-full">
                <div className="p-3 w-full bg-[#ebebeb5b] shadow dark:bg-[#00000034] h-[60px] backdrop-blur-sm">
                  <h1 className="text-slate-100 text-xl font-bold dark:text-white">
                    {title}
                  </h1>
                </div>
                <div className="flex items-start p-4 gap-4 flex-wrap">
                  <TaskList id={"1"} title="Lista de tareas" />
                  <TaskList id={"2"} title="En proceso" />
                  <TaskList id={"3"} title="En revisión" />
                  <TaskList id={"4"} title="Completado" />
                </div>
              </div>
              <div className="bg-[#ebebebe5] dark:bg-[#323568ce] max-w-[260px] w-full shadow p-4 backdrop-blur-sm">
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

                  <BsThreeDotsVertical className="text-slate-800 dark:text-gray-300 text-[27px] p-1 hover:bg-[#00000050] rounded-full duration-200 cursor-pointer" />
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
