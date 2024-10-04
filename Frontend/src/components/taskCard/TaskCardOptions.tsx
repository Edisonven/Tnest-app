import { IoCloseOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../features/tasksSlice";
import { useState } from "react";
import { sendTaskDescription } from "../../features/tasksSlice";

interface TaskCardOptionsProps {
  setOpenTaskOptions: React.Dispatch<React.SetStateAction<boolean>>;
  taskId: string;
}

const TaskCardOptions: React.FC<TaskCardOptionsProps> = ({
  setOpenTaskOptions,
  taskId,
}) => {
  const taskOptions = useAppSelector((state) => state.tasksProps);
  const [openDescriptionMenu, setOpenDescriptionMenu] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const dispatch = useAppDispatch();

  const filteredTask = taskOptions.find((task) => task.id === taskId);

  const handleAddATaskDescription = () => {
    setOpenDescriptionMenu(!openDescriptionMenu);
  };

  const handleSendTaskDescription = () => {
    if (taskDescription) {
      dispatch(
        sendTaskDescription({
          taskId: filteredTask?.id,
          description: taskDescription,
        })
      );
      if (filteredTask) {
        const updatedTasks = taskOptions.map((task) =>
          task.id === filteredTask.id
            ? { ...task, description: taskDescription }
            : task
        );

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      }
    }
  };
  console.log(filteredTask);

  return (
    <motion.div className="bg-[#25334A] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] min-h-[500px] rounded shadow outline outline-1 outline-gray-700 p-4">
      <IoCloseOutline
        onClick={() => setOpenTaskOptions(false)}
        className="absolute top-[8px] right-[8px] text-slate-800 dark:text-gray-300 text-[40px] cursor-pointer p-1 hover:bg-[#b4b4b42c] rounded-md duration-200"
      />
      <h1 className="text-slate-800 dark:text-gray-300 text-[20px]">
        {filteredTask?.title}
      </h1>
      <div className="mt-3">
        <p className="text-slate-800 dark:text-gray-300 text-sm font-normal">
          En la lista {filteredTask?.taskListId}
        </p>
      </div>
      <div className="mt-5">
        <h1 className="text-slate-800 dark:text-gray-300 text-[20px]">
          Descripción
        </h1>
        {filteredTask?.description ? (
          <div>
            <p className="text-slate-800 dark:text-gray-300 mt-4">
              {filteredTask.description}
            </p>
          </div>
        ) : (
          <div>
            {openDescriptionMenu ? (
              <div className="mt-2">
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  autoFocus
                  className="border-none outline-none  w-full bg-[#22212E] p-2 text-slate-800 dark:text-gray-300 rounded-md shadow h-[70px] resize-none"
                ></textarea>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={handleSendTaskDescription}
                    className="text-slate-800 dark:text-gray-300 bg-[#4D59B3] px-3 py-[7px] rounded shadow hover:brightness-125 font-medium"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setOpenDescriptionMenu(false)}
                    className="text-slate-800 dark:text-gray-300 px-3 py-[7px] rounded shadow font-medium hover:bg-[#00000034]"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={handleAddATaskDescription}
                className="relative mt-2 hover:brightness-125"
              >
                <div className="border-none outline-none  w-full bg-[#22212E] p-2 text-slate-800 dark:text-gray-300 rounded-md shadow cursor-pointer h-[70px]"></div>
                <p className="text-slate-800 dark:text-gray-300 absolute top-[10px] left-[20px] pointer-events-none text-sm">
                  Añade una descripción para tu tarea...
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskCardOptions;
