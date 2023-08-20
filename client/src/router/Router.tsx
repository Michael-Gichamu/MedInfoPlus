import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import AppLayout from "../Layout";
import { ResourceCenterComponent } from "../pages/resource/ResourceCenter";
import { HomeComponentPage } from "../pages/resource/Home";
import { ArticlesComponent } from "../pages/articles/Articles";
const routes = createRoutesFromElements([
  <Route path="/" element={<AppLayout />}>
    <Route path="/diabetes" element={<ResourceCenterComponent />} />
    <Route path="/articles" element={<HomeComponentPage />} />
    <Route path="/article/:id" element={<ArticlesComponent />} />
  </Route>,
]);

export const router = createBrowserRouter(routes);
