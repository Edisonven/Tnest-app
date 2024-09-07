import "./App.css";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";

function App(): JSX.Element {
  return (
    <div className="app__container min-h-[100vh] bg-[#EBEBEB] dark:bg-[#22264B]">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
