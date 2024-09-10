import { useAppSelector } from "../../features/boardBackgroundSlice";
import "./myBoard.css";

function MyBoard() {
  const { image, title } = useAppSelector((state) => state.background);

  return (
    <section className="select-none">
      <img className="fixed w-full" src={image} alt="" />
      <div className="my-board-container relative z-[5]">
        <div className="p-3 w-full bg-[#00000034] h-[60px] backdrop-blur-sm">
          <h1 className="text-slate-800 text-xl font-bold dark:text-white">
            {title}
          </h1>
        </div>
        <div>

        </div>
        <div className="bg-[#323568ce] max-w-[260px] w-full shadow p-4 backdrop-blur-sm">
          <h1 className="text-slate-800 dark:text-gray-300 mb-3 font-medium">
            Mis tableros
          </h1>
          <div className="flex items-center gap-2">
            <img
              className="max-w-[50px] h-[35px] object-cover rounded"
              src={image}
              alt=""
            />
            <span className="text-slate-800 dark:text-gray-300 font-medium">{title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyBoard;
