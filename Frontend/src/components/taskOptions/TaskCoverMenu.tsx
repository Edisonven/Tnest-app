import { coverPrincipalColors } from "./coverColors";
import { sendTaskCover } from "../../features/tasksSlice";
import { useDispatch } from "react-redux";

interface TaskCoverMenuInterface {
  taskId: string;
}

const TaskCoverMenu: React.FC<TaskCoverMenuInterface> = ({ taskId }) => {
  const dispatch = useDispatch();

  const handleSetCoverColor = (id: number) => {
    const colorFinded = coverPrincipalColors.find((c) => c.id === id);
    if (colorFinded) {
      dispatch(sendTaskCover({ taskId, cover: colorFinded.color_1 }));
    }
  };

  return (
    <div className="absolute top-[105%] left-0 bg-gray-300 dark:bg-[#344766] z-50 rounded outline outline-1 dark:outline-gray-800 p-3 w-[322px]">
      <h1 className="text-slate-800 dark:text-gray-300 text-center font-medium">
        Portada
      </h1>
      <div className="mt-4">
        <h1 className="text-slate-800 dark:text-gray-300 font-medium">
          Colores
        </h1>
        <div className="mt-2 flex items-center justify-center gap-2 bg-[#0000006b] flex-wrap py-2 rounded">
          {coverPrincipalColors.map((color) => (
            <div
              onClick={() => handleSetCoverColor(color.id)}
              key={color.id}
              className="w-[50px] h-[30px] rounded cursor-pointer"
              style={{ backgroundColor: color.color_1 }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCoverMenu;
