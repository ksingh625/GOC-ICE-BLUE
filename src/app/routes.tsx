import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import BrandPage from "./pages/BrandPage";
import CampaignsPage from "./pages/CampaignsPage";
import CreatorPage from "./pages/CreatorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/brands",
    Component: BrandPage,
  },
  {
    path: "/creators",
    Component: CreatorPage,
  },
  {
    path: "/campaigns",
    Component: CampaignsPage,
  },
  {
    path: "*",
    Component: LandingPage,
  },
]);
