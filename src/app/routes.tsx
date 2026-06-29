import { createBrowserRouter, Navigate } from "react-router";
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
import LoginPage from "./pages/LoginPage";

// Creator Dashboard imports
import CreatorDashboardLayout from "./pages/creator/CreatorDashboardLayout";
import CreatorDashboardPage from "./pages/creator/CreatorDashboardPage";
import CreatorCampaignsPage from "./pages/creator/CreatorCampaignsPage";
import CreatorSubmissionsPage from "./pages/creator/CreatorSubmissionsPage";
import CreatorLeaderboardPage from "./pages/creator/CreatorLeaderboardPage";
import CreatorDailyChallengePage from "./pages/creator/CreatorDailyChallengePage";
import CreatorGettingStartedPage from "./pages/creator/CreatorGettingStartedPage";
import CreatorWalletPage from "./pages/creator/CreatorWalletPage";
import CreatorSettingsPage from "./pages/creator/CreatorSettingsPage";

// Brand Dashboard imports
import BrandDashboardLayout from "./pages/brand/BrandDashboardLayout";
import BrandDashboardPage from "./pages/brand/BrandDashboardPage";
import BrandCampaignsPage from "./pages/brand/BrandCampaignsPage";
import BrandAnalyticsPage from "./pages/brand/BrandAnalyticsPage";
import BrandBillingPage from "./pages/brand/BrandBillingPage";
import BrandGettingStartedPage from "./pages/brand/BrandGettingStartedPage";
import BrandSettingsPage from "./pages/brand/BrandSettingsPage";
import BrandCreateCampaignPage from "./pages/brand/BrandCreateCampaignPage";

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
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: LoginPage,
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
  
  // Creator Portal Routes
  {
    path: "/creator",
    Component: CreatorDashboardLayout,
    children: [
      {
        path: "",
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        Component: CreatorDashboardPage,
      },
      {
        path: "campaigns",
        Component: CreatorCampaignsPage,
      },
      {
        path: "submissions",
        Component: CreatorSubmissionsPage,
      },
      {
        path: "leaderboard",
        Component: CreatorLeaderboardPage,
      },
      {
        path: "daily-challenge",
        Component: CreatorDailyChallengePage,
      },
      {
        path: "getting-started",
        Component: CreatorGettingStartedPage,
      },
      {
        path: "wallet",
        Component: CreatorWalletPage,
      },
      {
        path: "settings",
        Component: CreatorSettingsPage,
      },
    ],
  },

  // Brand Portal Routes
  {
    path: "/brand",
    Component: BrandDashboardLayout,
    children: [
      {
        path: "",
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        Component: BrandDashboardPage,
      },
      {
        path: "campaigns/create",
        Component: BrandCreateCampaignPage,
      },
      {
        path: "campaigns",
        Component: BrandCampaignsPage,
      },
      {
        path: "analytics",
        Component: BrandAnalyticsPage,
      },
      {
        path: "billing",
        Component: BrandBillingPage,
      },
      {
        path: "getting-started",
        Component: BrandGettingStartedPage,
      },
      {
        path: "settings",
        Component: BrandSettingsPage,
      },
    ],
  },

  {
    path: "*",
    Component: LandingPage,
  },
]);
