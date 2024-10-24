import { useContext, useState } from "react";
import { CgMathPlus } from "react-icons/cg";
import { ChangeEvent } from "react";
import AddTaskCard from "../taskCard/AddTaskCard";
import TaskCard from "../taskCard/TaskCard";
import { AnimatePresence } from "framer-motion";
import { BoardMenuContext } from "../../context/BoardContext";
import useTaskList from "../../hooks/useTaskList";
import { useAppSelector } from "../../features/tasksSlice";
import useDragAndDrop from "../../hooks/useDragAndDrop";
export interface taskInterface {
  id: string;
  title: string;
}

const TaskList = ({ title, id }: taskInterface) => {
  const {
    taskTitle,
    setTaskTitle,
    handleSendNewTask,
    handleAddNewTask,
    taskListId,
    setTaskListId,
  } = useTaskList();
  const { handleDragStart, handleDrop, handleColumnDrop, handleDragOver } =
    useDragAndDrop(id);
  const { draggedTaskId, draggingTaskIndex, setDraggingTaskIndex } =
    useContext(BoardMenuContext);
  const [activeColumn, setActiveColumn] = useState<string | "">("");
  const globalStateTasks = useAppSelector((state) => state.tasksProps);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTaskTitle(e.target.value);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    const newTarget = e.relatedTarget as HTMLElement;

    if (!newTarget || !e.currentTarget.contains(newTarget)) {
      setActiveColumn("");
    }
  };

  return (
    <div
      onDrop={() => {
        setActiveColumn("");
        setDraggingTaskIndex(null);
      }}
      onDragEnd={() => {
        setActiveColumn("");
        setDraggingTaskIndex(null);
      }}
      onDragOver={(event) => handleColumnDrop(event)}
      onDragEnter={() => setActiveColumn(id)}
      onDragLeave={(e) => handleDragLeave(e)}
      id={id}
      className={`bg-white dark:bg-[#141414] w-[300px] px-3 py-3 rounded-2xl shadow-lg ${
        activeColumn === id ? "outline outline-1 outline-white" : ""
      }`}
    >
      <h1 className="text-slate-800 dark:text-gray-300 mb-2 px-5 font-medium">
        {title}
      </h1>
      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {globalStateTasks.map((task, index) =>
            task.taskListId === id ? (
              <div key={task.id} onDragOver={(e) => handleDragOver(e, index)}>
                <TaskCard
                  cover={task.cover}
                  draggedTaskId={draggedTaskId}
                  desc={task.description}
                  comments={task.comments}
                  setActiveColumn={setActiveColumn}
                  onDragStart={() => handleDragStart(task.id)}
                  onDrop={handleDrop}
                  id={task.id}
                  title={task.title}
                  index={index}
                  columnTitle={title}
                  draggingTaskIndex={draggingTaskIndex}
                  setDraggingTaskIndex={setDraggingTaskIndex}
                />
              </div>
            ) : null
          )}
        </AnimatePresence>
        <div>
          {id === taskListId ? (
            <AddTaskCard
              handleSendNewTask={handleSendNewTask}
              handleChange={handleChange}
              taskTitle={taskTitle}
              setTaskListId={setTaskListId}
            />
          ) : null}
        </div>
      </div>
      {taskListId === id ? null : (
        <div
          onClick={() => handleAddNewTask(id)}
          className="flex items-center gap-2 hover:bg-[#96969663] cursor-pointer py-1 px-2 rounded duration-300"
        >
          <CgMathPlus className="text-slate-800 dark:text-gray-300 text-[20px]" />
          <button className="text-slate-800 dark:text-gray-300">
            Añadir una tarjeta
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
