import { useState } from "react";
import { CgMathPlus } from "react-icons/cg";
import { ChangeEvent } from "react";
import AddTaskCard from "../taskCard/AddTaskCard";
import TaskCard from "../taskCard/TaskCard";
import { useAppDispatch, useAppSelector } from "../../features/tasksSlice";
import {
  setTaskInfo,
  setReOrderTaks,
  moveTaskToColumn,
} from "../../features/tasksSlice";
import { AnimatePresence } from "framer-motion";

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
  const [draggingTaskIndex, setDraggingTaskIndex] = useState<number | null>(
    null
  );
  const [taskIndex, setTaskIndex] = useState<number | null>(null);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    draggedTaskId: string
  ) => {
    setDraggedTaskId(draggedTaskId);
    event.dataTransfer?.setData("itemID", draggedTaskId);
  };

  const handleDrop = () => {
    setDraggedTaskId(null);
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

  const handleColumnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const itemID = event.dataTransfer.getData("itemID");
    const itemFoundIndex = globalStateTasks.findIndex(
      (task) => task.id === itemID
    );

    if (itemFoundIndex !== -1) {
      const itemFound = { ...globalStateTasks[itemFoundIndex] };

      itemFound.taskListId = id;

      const newGlobalTaskState = globalStateTasks.map((task, index) => {
        if (index === itemFoundIndex) {
          return itemFound;
        }
        return task;
      });

      dispatch(moveTaskToColumn({ taskId: itemID, newColumnId: id }));

      localStorage.setItem("tasks", JSON.stringify(newGlobalTaskState));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!draggedTaskId) return;

    setDraggingTaskIndex(taskIndex);

    const updatedTasks = [...globalStateTasks];
    const draggedTaskIndex = updatedTasks.findIndex(
      (task) => task.id === draggedTaskId
    );

    if (draggedTaskIndex !== -1 && draggedTaskIndex !== draggedTaskIndex) {
      // Sacar la tarea arrastrada de su posición original
      const [draggedTask] = updatedTasks.splice(draggedTaskIndex, 1);

      // Insertar la tarea arrastrada en la nueva posición
      updatedTasks.splice(draggedTaskIndex, 0, draggedTask);

      // Despachar la acción para actualizar el estado global
      dispatch(setReOrderTaks(updatedTasks));

      // Guardar los cambios en localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  return (
    <div
      onDrop={(event) => handleColumnDrop(event)}
      onDragOver={(e) => handleDragOver(e)}
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
          {globalStateTasks.map((task, index) =>
            task.taskListId === id ? (
              <div key={task.id} onDragOver={() => setTaskIndex(index)}>
                <TaskCard
                  draggedTaskId={draggedTaskId}
                  desc={task.description}
                  comments={task.comments}
                  setActiveCard={setActiveCard}
                  onDragStart={(event) => handleDragStart(event, task.id)}
                  onDrop={handleDrop}
                  id={task.id}
                  title={task.title}
                  index={index}
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
