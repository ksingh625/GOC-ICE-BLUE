import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import BrandPage from "./pages/BrandPage";
import CampaignsPage from "./pages/CampaignsPage";
import CreatorPage from "./pages/CreatorPage";
import PricingPage from "./pages/PricingPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import GetStartedPage from "./pages/GetStartedPage";
import BookDemoPage from "./pages/BookDemoPage";
import JoinCreatorPage from "./pages/JoinCreatorPage";
import AboutUsPage from "./pages/AboutUsPage";
import BlogsPage from "./pages/BlogsPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import JobsPage from "./pages/JobsPage";

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
    path: "/pricing",
    Component: PricingPage,
  },
  {
    path: "/how-it-works",
    Component: HowItWorksPage,
  },
  {
    path: "/get-started",
    Component: GetStartedPage,
  },
  {
    path: "/book-demo",
    Component: BookDemoPage,
  },
  {
    path: "/join-creator",
    Component: JoinCreatorPage,
  },
  {
    path: "/about",
    Component: AboutUsPage,
  },
  {
    path: "/blogs",
    Component: BlogsPage,
  },
  {
    path: "/contact",
    Component: ContactPage,
  },
  {
    path: "/privacy",
    Component: PrivacyPolicyPage,
  },
  {
    path: "/terms",
    Component: TermsOfServicePage,
  },
  {
    path: "/jobs",
    Component: JobsPage,
  },
  {
    path: "*",
    Component: LandingPage,
  },
]);

