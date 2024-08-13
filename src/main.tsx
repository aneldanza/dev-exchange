import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./services/store.ts";
import { RouterProvider } from "react-router-dom";
import { browserRouter } from "./services/BrowserRouter.tsx";

import "./index.css";
import { AuthProvider } from "./AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={browserRouter} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
