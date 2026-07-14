import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import CurriculumPage from "../pages/curriculum/page";
import AwardsPage from "../pages/awards/page";
import ProjectsPage from "../pages/projects/page";
import ProjectDetailPage from "../pages/projects/detail/page";
import NoticesPage from "../pages/notices/page";
import NoticeDetailPage from "../pages/notices/detail/page";
import RecruitingPage from "../pages/recruiting/page";
import FaqPage from "../pages/faq/page";
import MembersPage from "../pages/members/page";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/curriculum", element: <CurriculumPage /> },
  { path: "/awards", element: <AwardsPage /> },
  { path: "/members", element: <MembersPage /> },
  { path: "/projects", element: <ProjectsPage /> },
  { path: "/notices", element: <NoticesPage /> },
  { path: "/notices/:id", element: <NoticeDetailPage /> },
  { path: "/recruiting", element: <RecruitingPage /> },
  { path: "/faq", element: <FaqPage /> },
  { path: "*", element: <NotFound /> },
];

export default routes;