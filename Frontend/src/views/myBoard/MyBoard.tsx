import { useAppSelector } from "../../features/boardBackgroundSlice";
import "./myBoard.css"

function MyBoard() {
  const { image, title } = useAppSelector((state) => state.background);

  return (
    <section className="">
      <div className="my-board-container">
        <div>
          <h1>{title}</h1>
        </div>
        <div className="bg-[#00000054] max-w-[250px] w-full shadow ">
          <h1 className="text-slate-800 dark:text-gray-300">Mis tableros</h1>
          <span>holaaa</span>
        </div>
      </div>
    </section>
  );
}

export default MyBoard;
