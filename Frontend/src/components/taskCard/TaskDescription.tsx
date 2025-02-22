interface TaskDescription {
  taskDescription: string;
  setTaskDescription: React.Dispatch<React.SetStateAction<string>>;
  handleSendTaskDescription: () => void;
  handleCancelEdit: () => void;
}

const TaskDescription: React.FC<TaskDescription> = ({
  taskDescription,
  setTaskDescription,
  handleSendTaskDescription,
  handleCancelEdit,
}) => {
  return (
    <div className="">
      <textarea
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        autoFocus
        className="border-none outline-none  w-full bg-[#22212E] p-2 text-slate-800 dark:text-gray-300 rounded-md shadow h-[70px] resize-none"
      />
      <div className="flex items-center gap-3 mt-2">
        <button
          onClick={handleSendTaskDescription}
          className="text-slate-800 dark:text-gray-300 bg-[#4D59B3] px-3 py-[7px] rounded shadow hover:brightness-125 font-medium"
        >
          Guardar
        </button>
        <button
          onClick={handleCancelEdit}
          className="text-slate-800 dark:text-gray-300 px-3 py-[7px] rounded shadow font-medium hover:bg-[#00000034]"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default TaskDescription;
