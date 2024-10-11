import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { BrowserRouter } from "react-router-dom";
import BoardMenuProvider from "./context/BoardContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <BoardMenuProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </BoardMenuProvider>
    </BrowserRouter>
  </StrictMode>
);
