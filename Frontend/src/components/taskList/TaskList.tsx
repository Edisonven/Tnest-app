import { useState } from "react";
import { CgMathPlus } from "react-icons/cg";
import { ChangeEvent } from "react";
import AddTaskCard from "../taskCard/AddTaskCard";
import TaskCard from "../taskCard/TaskCard";
import { useAppDispatch, useAppSelector } from "../../features/tasksSlice";
import { setTaskInfo, setReOrderTaks } from "../../features/tasksSlice";
import { motion, AnimatePresence } from "framer-motion";

export interface taskInterface {
  id: string;
  title: string;
}

const TaskList = ({ title, id }: taskInterface) => {
  const [taskListId, setTaskListId] = useState<string | null>(null);
  const [taskTitle, setTaskTitle] = useState("");
  const dispatch = useAppDispatch();
  const globalStateTasks = useAppSelector((state) => state.tasksProps);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<string | "">("");

  const handleDragStart = (draggedTaskId: string) => {
    setDraggedTaskId(draggedTaskId);
    setActiveCard(id);
  };

  const handleDrop = (targetId: string) => {
    if (draggedTaskId !== null && draggedTaskId !== targetId) {
      const updatedTasks = [...globalStateTasks];
      const draggedTaskIndex = updatedTasks.findIndex(
        (task) => task.id === draggedTaskId
      );
      const targetTaskIndex = updatedTasks.findIndex(
        (task) => task.id === targetId
      );

      // Verifica que los índices sean válidos
      if (draggedTaskIndex >= 0 && targetTaskIndex >= 0) {
        // Reordenar tareas
        const [draggedTask] = updatedTasks.splice(draggedTaskIndex, 1);
        updatedTasks.splice(targetTaskIndex, 0, draggedTask);

        // Actualizamos el estado global
        dispatch(setReOrderTaks(updatedTasks));
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      }

      setDraggedTaskId(null);
    }
  };

  const handleAddNewTask = (id: string) => {
    setTaskListId(id || null);
    if (taskListId === null) {
      setTaskTitle("");
    }
  };

  const handleSendNewTask = () => {
    if (taskTitle.trim() !== "" && taskListId) {
      const newTask = {
        id: crypto.randomUUID(),
        title: taskTitle,
        taskListId: taskListId,
      };

      dispatch(setTaskInfo(newTask));
      localStorage.setItem(
        "tasks",
        JSON.stringify([...globalStateTasks, newTask])
      );
      setTaskTitle("");
      setTaskListId(null);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTaskTitle(e.target.value);
  };

  return (
    <div
      id={id}
      className={`bg-white dark:bg-[#1b1b1b] w-[300px] px-3 py-3 rounded-2xl shadow-lg ${
        activeCard === id ? "outline outline-1 outline-white" : ""
      }`}
    >
      <h1 className="text-slate-800 dark:text-gray-300 mb-2 px-5 font-medium">
        {title}
      </h1>
      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {globalStateTasks.map((task) =>
            task.taskListId === id ? (
              <motion.div
                key={task.id}
                layout 
                onDragStart={() => handleDragStart(task.id)}
                onDrop={() => handleDrop(task.id)}
                dragConstraints={{ top: 0, bottom: 0 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TaskCard
                  setActiveCard={setActiveCard} 
                  onDragStart={() => handleDragStart(task.id)}
                  onDrop={() => handleDrop(task.id)}
                  id={task.id}
                  title={task.title}
                />
              </motion.div>
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
