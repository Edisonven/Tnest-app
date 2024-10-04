import { IoCloseOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../features/tasksSlice";
import { ChangeEvent, useState } from "react";
import { sendTaskDescription, sendTaskTitle } from "../../features/tasksSlice";
import TaskDescription from "./TaskDescription";

interface TaskCardOptionsProps {
  setOpenTaskOptions: React.Dispatch<React.SetStateAction<boolean>>;
  taskId: string;
}

const TaskCardOptions: React.FC<TaskCardOptionsProps> = ({
  setOpenTaskOptions,
  taskId,
}) => {
  const taskOptions = useAppSelector((state) => state.tasksProps);
  const filteredTask = taskOptions.find((task) => task.id === taskId);
  const [openDescriptionMenu, setOpenDescriptionMenu] = useState(false);
  const [openActivityMenu, setOpenActivityMenu] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [isDescriptionModified, setIsDescriptionModified] = useState(false);
  const [taskTitle, setTaskTitle] = useState(filteredTask?.title);
  const dispatch = useAppDispatch();

  const handleAddATaskDescription = () => {
    setOpenDescriptionMenu(!openDescriptionMenu);
  };

  const handleOpenActivityMenu = () => {
    setOpenActivityMenu(!openActivityMenu);
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
        setIsDescriptionModified(false);
      }
    } else {
      setOpenDescriptionMenu(false);
    }
  };

  const handleEditDescription = () => {
    setOpenDescriptionMenu(true);
    setIsDescriptionModified(true);
    if (filteredTask) {
      const editDescription = filteredTask.description;
      setTaskDescription(editDescription);
    }
  };

  const handleCancelEdit = () => {
    setOpenDescriptionMenu(false);
    setIsDescriptionModified(false);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTaskTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    if (filteredTask) {
      const updatedTasksTitle = taskOptions.map((task) =>
        task.id === filteredTask.id ? { ...task, title: taskTitle } : task
      );
      dispatch(sendTaskTitle({ title: taskTitle, taskId: filteredTask.id }));
      localStorage.setItem("tasks", JSON.stringify(updatedTasksTitle));
    }
  };

  return (
    <motion.div className="bg-[#25334A] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] min-h-[500px] rounded shadow outline outline-1 outline-gray-700 p-4">
      <IoCloseOutline
        onClick={() => setOpenTaskOptions(false)}
        className="absolute top-[8px] right-[8px] text-slate-800 dark:text-gray-300 text-[40px] cursor-pointer p-1 hover:bg-[#b4b4b42c] rounded-md duration-200"
      />
      <input
        onChange={handleTitleChange}
        onBlur={handleTitleBlur}
        className="text-slate-800 dark:text-gray-300 text-[20px] bg-transparent w-[90%]"
        type="text"
        value={taskTitle}
      />
      <div className="mt-3">
        <p className="text-slate-800 dark:text-gray-300 text-sm font-normal">
          En la lista {filteredTask?.taskListId}
        </p>
      </div>
      <div className="mt-7">
        <h1 className="text-slate-800 dark:text-gray-300 text-[20px]">
          Descripción
        </h1>
        {filteredTask?.description && !isDescriptionModified ? (
          <div className="flex items-center justify-between">
            <p className="text-slate-800 dark:text-gray-300 mt-4">
              {filteredTask.description}
            </p>
            <div className="">
              <button
                onClick={handleEditDescription}
                className="text-slate-800 dark:text-gray-300 px-3 py-1 dark:bg-slate-600 rounded shadow dark:hover:brightness-125"
              >
                Editar
              </button>
            </div>
          </div>
        ) : (
          <div>
            {openDescriptionMenu ? (
              <div className="mt-2">
                <TaskDescription
                  taskDescription={taskDescription}
                  setTaskDescription={setTaskDescription}
                  handleSendTaskDescription={handleSendTaskDescription}
                  handleCancelEdit={handleCancelEdit}
                />
              </div>
            ) : (
              <div
                onClick={handleAddATaskDescription}
                className="relative mt-2 hover:brightness-125"
              >
                <div className="border-none outline-none  w-full bg-[#22212E] p-2 text-slate-800 dark:text-gray-300 rounded-md shadow cursor-pointer h-[70px]">
                  <p className="text-slate-800 dark:text-gray-300 absolute top-[10px] left-[20px] pointer-events-none text-sm">
                    Añade una descripción para tu tarea...
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="mt-7">
          <div>
            <h1 className="text-slate-800 dark:text-gray-300 text-[20px]">
              Actividad
            </h1>
            {openActivityMenu ? (
              <div className="mt-3 w-full">
                <input
                  autoFocus
                  type="text"
                  className="w-full bg-[#22212E] border-none outline-none p-2 rounded shadow text-slate-800 dark:text-gray-300"
                />
              </div>
            ) : (
              <div
                onClick={handleOpenActivityMenu}
                className="mt-3 w-full cursor-pointer bg-[#22212E] border-none outline-none p-2 rounded shadow hover:brightness-125"
              >
                <p className="text-slate-800 dark:text-gray-300">
                  Escribe un comentario...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCardOptions;
