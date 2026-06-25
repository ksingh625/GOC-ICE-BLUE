import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import BrandPage from "./pages/BrandPage";
import CampaignsPage from "./pages/CampaignsPage";

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
    path: "/campaigns",
    Component: CampaignsPage,
  },
  {
    path: "*",
    Component: LandingPage,
  },
]);
