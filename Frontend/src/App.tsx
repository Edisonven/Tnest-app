import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import MyBoard from "./views/myBoard/MyBoard";

function App(): JSX.Element {
  return (
    <div className="app__container min-h-[100vh] bg-[#EBEBEB] dark:bg-[#22264B]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-board" element={<MyBoard />} />
      </Routes>
    </div>
  );
}

export default App;
