import "./taskCard.css";
import { IoCloseOutline } from "react-icons/io5";
import { useAppSelector, useAppDispatch } from "../../features/tasksSlice";
import { ChangeEvent, useState } from "react";
import { sendTaskTitle } from "../../features/tasksSlice";
import TaskDescription from "./TaskDescription";
import TaskOptions from "../taskOptions/TaskOptions";
import { BiSolidDockTop } from "react-icons/bi";
import { TbTrashX } from "react-icons/tb";
import TaskCoverMenu from "../taskOptions/TaskCoverMenu";
import useDeleteTaskComment from "../../hooks/useDeleteTaskComment";
import useSendTaskComments from "../../hooks/useSendTaskComments";
import useSendTaskDescription from "../../hooks/useSendTaskDescription";
import { TaskCardOptionsProps } from "../../types/TaskCard";

const TaskCardOptions: React.FC<TaskCardOptionsProps> = ({
  setOpenTaskOptions,
  taskId,
  columnTitle,
}) => {
  const { handleDeleteTaskComment, handleOpenCoverMenu, taskCoverOption } =
    useDeleteTaskComment(taskId);
  const {
    handleSendTaskComments,
    openActivityMenu,
    setOpenActivityMenu,
    taskComments,
    setTaskComments,
    handleOpenActivityMenu,
  } = useSendTaskComments(taskId);
  const {
    handleSendTaskDescription,
    taskDescription,
    setTaskDescription,
    isDescriptionModified,
    setIsDescriptionModified,
    openDescriptionMenu,
    setOpenDescriptionMenu,
    handleAddATaskDescription,
    handleEditDescription,
  } = useSendTaskDescription(taskId);

  const taskOptions = useAppSelector((state) => state.tasksProps);
  const filteredTask = taskOptions.find((task) => task.id === taskId);
  const [taskTitle, setTaskTitle] = useState(filteredTask?.title);
  const dispatch = useAppDispatch();

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

  const handleCommentsChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setTaskComments(e.target.value);
  };

  return (
    <div className="bg-[#25334A] fixed top-[20px] left-1/2 z-50 transform -translate-x-1/2  w-[850px] min-h-[560px] max-h-[900px]  rounded shadow outline outline-1 outline-gray-700 p-4">
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
          En la lista{" "}
          <span className="uppercase font-medium bg-[#425b81] rounded px-1">
            {columnTitle}
          </span>
        </p>
      </div>
      <div className="mt-4 flex justify-between gap-5">
        <div className="w-full">
          <h1 className="text-slate-800 dark:text-gray-300 text-[20px]">
            Descripción
          </h1>
          {filteredTask?.description && !isDescriptionModified ? (
            <div className="flex items-center justify-between gap-3">
              <p className="task-desc-paragraph text-slate-800 dark:text-gray-300 mt-4 max-h-[100px] overflow-y-auto">
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
                  <div className="border-none outline-none w-full bg-[#22212E] p-2 text-slate-800 dark:text-gray-300 rounded-md shadow cursor-pointer h-[70px]">
                    <p className="text-slate-800 dark:text-gray-300 absolute top-[10px] left-[20px] pointer-events-none text-sm">
                      Añade una descripción para tu tarea...
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="mt-5">
            <h1 className="text-slate-800 dark:text-gray-300 text-[20px]">
              Actividad
            </h1>
            {openActivityMenu ? (
              <div className="mt-3 w-full">
                <textarea
                  onChange={handleCommentsChange}
                  value={taskComments}
                  autoFocus
                  className="w-full bg-[#22212E] max-w-[570px] border-none outline-none p-2 rounded shadow text-slate-800 dark:text-gray-300 resize-none"
                />
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={handleSendTaskComments}
                    className="text-slate-800 dark:text-gray-300 bg-[#4D59B3] px-3 py-[7px] rounded shadow hover:brightness-125 font-medium"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setOpenActivityMenu(false)}
                    className="text-slate-800 dark:text-gray-300 px-3 py-[7px] rounded shadow font-medium hover:bg-[#00000034]"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={handleOpenActivityMenu}
                className="mt-3 mb-2 w-full cursor-pointer bg-[#22212E] border-none outline-none p-2 rounded shadow hover:brightness-125"
              >
                <p className="text-slate-800 dark:text-gray-300">
                  Escribe un comentario...
                </p>
              </div>
            )}
            <div className="task-comments-container max-h-[400px] overflow-y-auto overflow-x-hidden">
              {filteredTask?.comments?.map((comment) => (
                <div key={comment.id} className="mt-5">
                  <div className="min-w-[120px] w-max max-w-[570px] bg-[#1d1b29] border-none outline-none px-3 py-2 rounded-3xl shadow">
                    <p className="text-slate-800 dark:text-gray-300 w-full break-words">
                      {comment.comment}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-2 ml-3 text-slate-800 dark:text-gray-300 font-medium text-xs">
                    <button>Editar</button>
                    <button
                      className="hover:underline"
                      onClick={() => handleDeleteTaskComment(comment.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="relative">
            <TaskOptions
              onClick={handleOpenCoverMenu}
              icon={BiSolidDockTop}
              title="Portada"
            />
            {taskCoverOption && <TaskCoverMenu />}
          </div>
          <div>
            <TaskOptions icon={TbTrashX} title="Eliminar tarjeta" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCardOptions;
