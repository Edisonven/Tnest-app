import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { BrowserRouter } from "react-router-dom";
import CreateBoardMenuProvider from "./context/CreateBoardContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CreateBoardMenuProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </CreateBoardMenuProvider>
    </BrowserRouter>
  </StrictMode>
);
