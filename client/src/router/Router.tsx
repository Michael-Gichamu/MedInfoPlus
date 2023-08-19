import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import AppLayout from "../Layout";
import { ResourceCenterComponent } from "../pages/resource/ResourceCenter"; // Import your page components
import { HomeComponentPage } from "../pages/resource/Home";
const routes = createRoutesFromElements([
  <Route path="/" element={<AppLayout />}>
    <Route index element={<HomeComponentPage />} />
    <Route path="/diabetes" element={<ResourceCenterComponent />} />
  </Route>,
]);

export const router = createBrowserRouter(routes);
