import { useAppSelector } from "../../features/boardBackgroundSlice";
import "./myBoard.css";

function MyBoard() {
  const { image, title } = useAppSelector((state) => state.background);

  return (
    <section className="select-none">
      <div>
        <img className="fixed w-full" src={image} alt="" />
        <div className=" relative z-[5]">
          {!image || !title ? (
            <div className="no-board flex items-center justify-center w-full">
              <p>Aún no tienes tableros</p>
            </div>
          ) : (
            <div className="my-board-container">
              <div className="p-3 w-full bg-[#ebebeb5b] shadow dark:bg-[#00000034] h-[60px] backdrop-blur-sm">
                <h1 className="text-slate-100 text-xl font-bold dark:text-white">
                  {title}
                </h1>
              </div>
              <div></div>
              <div className="bg-[#ebebebe5] dark:bg-[#323568ce] max-w-[260px] w-full shadow p-4 backdrop-blur-sm">
                <h1 className="text-slate-800 dark:text-gray-300 mb-3 font-medium">
                  Mis tableros
                </h1>
                <div className="flex items-center gap-2 cursor-pointer">
                  <img
                    className="max-w-[50px] h-[35px] object-cover rounded"
                    src={image}
                    alt=""
                  />
                  <span className="text-slate-800 dark:text-gray-300 font-medium">
                    {title}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MyBoard;
