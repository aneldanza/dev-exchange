import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./services/store.ts";
import { RouterProvider } from "react-router-dom";
import { browserRouter } from "./services/BrowserRouter.tsx";
import "react-loading-skeleton/dist/skeleton.css";

import "./index.css";
import { AuthProvider } from "./services/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={browserRouter} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
