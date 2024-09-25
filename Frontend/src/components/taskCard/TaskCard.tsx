import React, { useState } from "react";
import TaskCardOptions from "./TaskCardOptions";
import { AnimatePresence } from "framer-motion";

export interface TaskIterface {
  id: string;
  title: string;
  desc?: string;
  onDragStart: (id: string) => void;
  onDrop: (id: string) => void;
  setActiveCard: React.Dispatch<React.SetStateAction<string | "">>;
}

function TaskCard({
  id,
  title,
  onDragStart,
  onDrop,
  setActiveCard,
}: TaskIterface) {
  const [openTaskOptions, setOpenTaskOptions] = useState(false);
  const [taskId, setTaskId] = useState<string>("");

  const handleOpenTaskOptions = (id: string): void => {
    setOpenTaskOptions(!openTaskOptions);
    setTaskId(id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDragStart={() => onDragStart(id)}
      onDrop={() => onDrop(id)}
      onDragOver={handleDragOver}
      onDragEnd={() => setActiveCard("")}
      draggable
    >
      <div
        onClick={() => handleOpenTaskOptions(id)}
        key={id}
        className="bg-slate-800 px-3 py-[6px] rounded cursor-pointer hover:brightness-125 hover:outline outline-1 outline-white"
      >
        <p className="text-slate-800 dark:text-gray-300 font-normal">{title}</p>
      </div>
      <AnimatePresence>
        {openTaskOptions ? (
          <TaskCardOptions
            setOpenTaskOptions={setOpenTaskOptions}
            taskId={taskId}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default TaskCard;
