import React, { useState } from "react";
import TaskCardOptions from "./TaskCardOptions";
import { AnimatePresence, motion } from "framer-motion";

export interface TaskIterface {
  id: string;
  title: string;
  desc?: string;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
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
    <motion.div
      layout
      dragConstraints={{ top: 0, bottom: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      onDragStart={onDragStart}
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
    </motion.div>
  );
}

export default TaskCard;
