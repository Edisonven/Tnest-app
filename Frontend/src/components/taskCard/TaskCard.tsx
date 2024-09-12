import { useState } from "react";
import TaskCardOptions from "./TaskCardOptions";
import { AnimatePresence } from "framer-motion";

export interface TaskIterface {
  id: number;
  title: string;
  desc?: string;
}

function TaskCard({ id, title }: TaskIterface) {
  const [openTaskOptions, setOpenTaskOptions] = useState(false);
  const [taskId, setTaskId] = useState<number>(0);

  const handleOpenTaskOptions = (id: number): void => {
    setOpenTaskOptions(!openTaskOptions);
    setTaskId(id);
  };

  return (
    <div>
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
