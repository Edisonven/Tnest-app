import { useContext } from "react";
import background_1 from "/images/application/background-1.svg";
import { CreateBoardMenuContext } from "../../context/CreateBoardContext";
import Button from "@mui/material/Button";

function Home(): JSX.Element {
  const { setOpenCreateBoardMenu } = useContext(CreateBoardMenuContext);

  return (
    <section className="flex items-center justify-center mt-[80px]">
      <div className="flex gap-6">
        <div className="flex flex-col gap-5">
          <h1 className="text-[45px] font-medium text-slate-800 dark:text-gray-300 max-w-[500px]">
            Gestiona tus tareas diarias de manera más cómoda y versátil
          </h1>
          <p className="text-slate-800 dark:text-gray-300 text-xl font-medium max-w-[300px]">
            Crea un tablero y comienza a trabajar
          </p>
          <div className="mt-6">
            {/*  <button
              onClick={() => setOpenCreateBoardMenu(true)}
              className="text-slate-800 dark:text-gray-300 px-3 py-2 bg-black shadow rounded-3xl font-medium"
            >
              Crear Tablero
            </button> */}
            <Button
              onClick={() => setOpenCreateBoardMenu(true)}
              sx={{
                borderRadius: 30,
                fontWeight: 700,
                backgroundColor: "#ffffff",
                height: 45,
                color: "#141826",
                "&:hover": {
                  filter: "brightness(70%)",
                },
                transition: "all 0.3s ease",
              }}
              variant="contained"
            >
              Crear Tablero
            </Button>
          </div>
        </div>
        <div>
          <img className="w-full max-w-[400px]" src={background_1} alt="" />
        </div>
      </div>
    </section>
  );
}

export default Home;
