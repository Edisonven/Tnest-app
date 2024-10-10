import { IconType } from "react-icons";

interface TaskOptions {
  title: string;
  icon: IconType;
}

const TaskOptions: React.FC<TaskOptions> = ({ title, icon: Icon }) => {
  return (
    <div className="bg-gray-300 dark:bg-[#344766] cursor-pointer px-3 py-1 rounded shadow flex items-center gap-2 min-w-[180px] hover:brightness-125">
      <Icon className="text-slate-800 dark:text-gray-300" />
      <h1 className="text-slate-800 dark:text-gray-300 font-medium">{title}</h1>
    </div>
  );
};

export default TaskOptions;
