import React, { useState } from "react";
import TaskCardOptions from "./TaskCardOptions";
import { PiTextAlignLeft } from "react-icons/pi";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import Overlay from "../overlay/Overlay";
import { TaskCardInterface } from "../../types/TaskCard";

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
  columnTitle,
}: TaskCardInterface) {
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
          }  rounded cursor-pointer hover:brightness-125 overflow-hidden ${
            !draggedTaskId ? "hover:outline outline-1 outline-white" : ""
          }`}
        >
          {/*     <div className="bg-yellow-600 h-[30px]"></div> */}
          <div
            className={`${
              draggingTaskIndex === index ? "opacity-0" : ""
            } px-3 py-[6px]`}
          >
            <p className="text-slate-800 dark:text-gray-300 font-normal">
              {title}
            </p>
            <div className="flex items-center gap-3">
              {desc ? (
                <div className="mt-3">
                  <PiTextAlignLeft className="text-[20px] text-slate-800 dark:text-gray-200" />
                </div>
              ) : null}
              {comments?.length > 0 ? (
                <div className="mt-3 flex items-center gap-1">
                  <HiOutlineChatBubbleOvalLeftEllipsis className="text-[18px] text-slate-800 dark:text-gray-300" />
                  <p className="text-slate-800 dark:text-gray-300 text-xs">
                    {comments.length}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {openTaskOptions ? (
        <div>
          <TaskCardOptions
            columnTitle={columnTitle}
            setOpenTaskOptions={setOpenTaskOptions}
            taskId={taskId}
          />
          <Overlay />
        </div>
      ) : null}
    </div>
  );
}

export default TaskCard;
