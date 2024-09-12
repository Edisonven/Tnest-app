import { IoCloseOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useAppSelector } from "../../features/tasksSlice";

interface TaskCardOptionsProps {
  setOpenTaskOptions: React.Dispatch<React.SetStateAction<boolean>>;
  taskId: number;
}

const TaskCardOptions: React.FC<TaskCardOptionsProps> = ({
  setOpenTaskOptions,
  taskId,
}) => {
  const taskOptions = useAppSelector((state) => state.tasksProps);

  const filteredTask = taskOptions.find((task) => task.id === taskId);

  return (
    <motion.div className="bg-[#25334A] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded shadow outline outline-1 outline-gray-700 p-4">
      <IoCloseOutline
        onClick={() => setOpenTaskOptions(false)}
        className="absolute top-[8px] right-[8px] text-slate-800 dark:text-gray-300 text-[40px] cursor-pointer p-1 hover:bg-[#b4b4b42c] rounded-md duration-200"
      />
      <h1 className="text-slate-800 dark:text-gray-300">
        {filteredTask?.title}
      </h1>
    </motion.div>
  );
};

export default TaskCardOptions;
