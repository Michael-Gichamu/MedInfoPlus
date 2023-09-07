import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import AppLayout from "../Layout";
import { SignUp } from "../authentication/Signup";
import { SavedArticleComponent } from "../pages/resource/Dash";
import { Login } from "../authentication/Login";
import { ResourceCenterComponent } from "../pages/resource/ResourceCenter";
import { HomeComponentPage } from "../pages/resource/Home";
import { ArticlesComponent } from "../pages/articles/Articles";
const routes = createRoutesFromElements([
  <Route path="/" element={<AppLayout />}>
    <Route index element={<SavedArticleComponent />} />
    <Route path="/diabetes" element={<ResourceCenterComponent />} />
    <Route path="/auth/signup" element={<SignUp />} />
    <Route path="/auth/login" element={<Login />} />
    <Route path="/articles" element={<HomeComponentPage />} />
    <Route path="/article/:id" element={<ArticlesComponent />} />
    <Route path="/diabetes/articles/:id" element={<ArticlesComponent />} />
  </Route>,
]);

export const router = createBrowserRouter(routes);
