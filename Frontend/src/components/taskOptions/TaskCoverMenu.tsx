import { coverPrincipalColors } from "./coverColors";
import { sendTaskCover, removeTaskCover } from "../../features/tasksSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../features/boardBackgroundSlice";
import { SetStateAction } from "react";
import { TaskArray } from "../../types/TaskArray";

interface TaskCoverMenuInterface {
  taskId: string;
  cover?: string;
  setTaskCoverOption: React.Dispatch<SetStateAction<boolean>>;
}

const TaskCoverMenu: React.FC<TaskCoverMenuInterface> = ({
  taskId,
  cover,
  setTaskCoverOption,
}) => {
  const storedTasks = useAppSelector((state) => state.tasksProps);
  const dispatch = useAppDispatch();
  const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  const handleSetCoverColor = (id: number) => {
    const colorFinded = coverPrincipalColors.find((c) => c.id === id);
    if (colorFinded) {
      dispatch(sendTaskCover({ taskId, cover: colorFinded.color_1 }));

      const updatedTasks = allTasks.map((t: TaskArray) =>
        t.id === taskId ? { ...t, cover: colorFinded.color_1 } : t
      );

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const handleRemoveTaskCover = () => {
    const taskWithCover = storedTasks.find((t) => t.id === taskId);
    if (taskWithCover) {
      dispatch(removeTaskCover({ taskId }));
      const updatedTasks = allTasks.map((t: TaskArray) =>
        t.id === taskId ? { ...t, cover: "" } : t
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTaskCoverOption(false);
    }
  };

  return (
    <div className="absolute top-[105%] left-0 bg-gray-300 dark:bg-[#344766] z-50 rounded outline outline-1 dark:outline-gray-800 p-3 w-[322px]">
      <h1 className="text-slate-800 dark:text-gray-300 text-center font-medium">
        Portada
      </h1>
      <div className="mt-4">
        <h1 className="text-slate-800 dark:text-gray-300 font-medium">
          Colores base
        </h1>
        <div className="mt-2 flex items-center justify-center gap-2 bg-[#0000006b] flex-wrap py-2 rounded">
          {coverPrincipalColors.map((color) => (
            <div
              onClick={() => handleSetCoverColor(color.id)}
              key={color.id}
              className="w-[50px] h-[30px] rounded cursor-pointer"
              style={{ backgroundColor: color.color_1 }}
            />
          ))}
        </div>
        <div className="mt-3">
          {cover && (
            <button
              onClick={handleRemoveTaskCover}
              className="text-slate-800 dark:text-gray-300 dark:bg-[#25334A] w-full py-[5px] rounded hover:dark:bg-[#3f6296]"
            >
              Quitar portada
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCoverMenu;
