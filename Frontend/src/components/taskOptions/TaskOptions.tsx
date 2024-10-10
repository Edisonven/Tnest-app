import { BiSolidDockTop } from "react-icons/bi";

interface TaskOptions {
  title: string;
}

const TaskOptions: React.FC<TaskOptions> = ({ title }) => {
  return (
    <div className="bg-gray-300 dark:bg-[#344766] cursor-pointer px-3 py-1 rounded shadow flex items-center justify-center gap-2 w-[120px] hover:brightness-125">
      <BiSolidDockTop className="text-slate-800 dark:text-gray-300" />
      <h1 className="text-slate-800 dark:text-gray-300 font-medium">{title}</h1>
    </div>
  );
};

export default TaskOptions;
