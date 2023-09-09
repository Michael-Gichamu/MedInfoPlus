import { router } from "./router/Router";
import { RouterProvider } from "react-router-dom";
import "./index.css";
export const App = () => {
  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
