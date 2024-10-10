import React, { useState } from "react";
import TaskCardOptions from "./TaskCardOptions";
import { AnimatePresence } from "framer-motion";
import { LuText } from "react-icons/lu";
import { BiCommentDetail } from "react-icons/bi";

export interface TaskIterface {
  id: string;
  title: string;
  desc?: string;
  comments: Array<{
    id: string;
    comment: string;
  }>;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (id: string) => void;
  setActiveColumn: React.Dispatch<React.SetStateAction<string | "">>;
  draggedTaskId: string | null;
  index: number;
  draggingTaskIndex: number | null;
  setDraggingTaskIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

function TaskCard({
  id,
  title,
  onDragStart,
  onDrop,
  setActiveColumn,
  desc,
  comments,
  draggedTaskId,
  index,
  draggingTaskIndex,
  setDraggingTaskIndex,
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
    <div>
      <div
        onDragStart={onDragStart}
        onDrop={() => onDrop(id)}
        onDragOver={handleDragOver}
        onDragEnd={() => {
          setDraggingTaskIndex(null);
          setActiveColumn("");
        }}
        draggable
      >
        <div
          onClick={() => handleOpenTaskOptions(id)}
          key={id}
          className={`${
            draggingTaskIndex === index ? "bg-[#0f0909]" : "bg-slate-800"
          } px-3 py-[6px] rounded cursor-pointer hover:brightness-125 ${
            !draggedTaskId ? "hover:outline outline-1 outline-white" : ""
          }`}
        >
          <div className={`${draggingTaskIndex === index ? "opacity-0" : ""}`}>
            <p className="text-slate-800 dark:text-gray-300 font-normal">
              {title}
            </p>
            <div className="flex items-center gap-4">
              {desc ? (
                <div className="mt-3">
                  <LuText className="text-[20px] text-slate-800 dark:text-gray-300" />
                </div>
              ) : null}
              {comments?.length > 0 ? (
                <div className="mt-3 flex items-center gap-1">
                  <BiCommentDetail className="text-[20px] text-slate-800 dark:text-gray-300" />
                  <p className="text-slate-800 dark:text-gray-300 text-xs mb-1">
                    {comments.length}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
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
