import { forwardRef } from "react";
import { TbLayoutBoard } from "react-icons/tb";

const CreateABoardModal = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="absolute top-[45px] right-0 w-[250px] bg-white dark:bg-[#393C73] rounded shadow-lg p-2"
    >
      <div className="cursor-pointer hover:bg-[#00000015] p-1 rounded select-none">
        <div className="flex items-center gap-2 mb-2">
          <TbLayoutBoard className="text-[20px] text-slate-800 dark:text-white" />
          <h1 className="text-sm text-slate-800 dark:text-white">
            Crea un tablero
          </h1>
        </div>
        <span className="text-xs font-normal text-slate-800 dark:text-white">
          Un tablero es un conjunto de tarjetas ordenadas como lista, úsalo para
          gestionar tus tareas diarias, o proyectos.
        </span>
      </div>
    </div>
  );
});

export default CreateABoardModal;
