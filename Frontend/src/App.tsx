import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/home/Home";
import Navbar from "./components/navbar/Navbar";
import MyBoard from "./views/myBoard/MyBoard";
import { useEffect, useState } from "react";

function App(): JSX.Element {
  const [aplicationTheme, setApplicationTheme] = useState("light");

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    const storedTheme = localStorage.getItem("theme");

    const initialTheme = storedTheme || systemTheme;

    setApplicationTheme(initialTheme);
    document.documentElement.setAttribute("class", initialTheme);
  }, [setApplicationTheme]);

  return (
    <div className="app__container min-h-[100vh] bg-[#EBEBEB] dark:bg-[#22264B]">
      <Navbar
        setApplicationTheme={setApplicationTheme}
        aplicationTheme={aplicationTheme}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-board" element={<MyBoard />} />
      </Routes>
    </div>
  );
}

export default App;
