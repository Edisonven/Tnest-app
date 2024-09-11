import { ChangeEvent } from "react";
import { IoClose } from "react-icons/io5";

export interface AddTaskInterface {
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  taskTitle: string;
  setTaskListId: React.Dispatch<React.SetStateAction<string>>;
  handleSendNewTask: () => void;
}

function AddTaskCard({
  handleChange,
  taskTitle,
  setTaskListId,
  handleSendNewTask,
}: AddTaskInterface) {
  return (
    <div>
      <div className="p-2 bg-gray-300 dark:bg-slate-800 relative rounded">
        <textarea
          autoFocus
          onChange={handleChange}
          value={taskTitle}
          name="task"
          className="bg-transparent border-none text-slate-800 dark:text-gray-300 w-full outline-none resize-none"
        />
        {!taskTitle ? (
          <p className="text-slate-800 dark:text-gray-300 text-sm font-normal absolute top-[11px] left-[9px] pointer-events-none">
            Introduce un nombre para esta tarjeta...
          </p>
        ) : null}
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={handleSendNewTask}
          className="bg-teal-500 dark:bg-[#383e9e] text-slate-800 dark:text-gray-300 px-2 py-[6px] rounded shadow text-sm font-medium my-2 hover:brightness-125"
        >
          Añadir tarjeta
        </button>
        <IoClose
          onClick={() => setTaskListId("")}
          className="text-slate-800 dark:text-gray-300 cursor-pointer text-[30px] hover:bg-slate-300 hover:dark:bg-[#333333] rounded-full p-1"
        />
      </div>
    </div>
  );
}

export default AddTaskCard;
