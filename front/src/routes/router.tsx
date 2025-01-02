import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import MainPage from "../pages/MainPage";
import ErrorPage from "../pages/ErrorPage";
import JoinPage from "../pages/JoinPage";
import LoginPage from "../pages/LoginPage";
import PostDetailPage from "../pages/PostDetailPage";
import PostEditPage from "../pages/PostEditPage";
import PostWritePage from "../pages/PostWritePage";

// interface RouterProps {
//   children: React.ReactNode;
// }

const routerArr = [
  {
    path: "/",
    element: <Layout children={<MainPage />} />,
    errorElement: <Layout children={<ErrorPage />} />,
  },
  {
    path: "/join",
    element: <Layout children={<JoinPage />} />,
    errorElement: <Layout children={<ErrorPage />} />,
  },
  {
    path: "/login",
    element: <Layout children={<LoginPage />} />,
    errorElement: <Layout children={<ErrorPage />} />,
  },
  {
    path: "/post/:id",
    element: <Layout children={<PostDetailPage />} />,
    errorElement: <Layout children={<ErrorPage />} />,
  },
  {
    path: "/post/id/edit",
    element: <Layout children={<PostEditPage />} />,
    errorElement: <Layout children={<ErrorPage />} />,
  },
  {
    path: "/write",
    element: <Layout children={<PostWritePage />} />,
    errorElement: <Layout children={<ErrorPage />} />,
  },
  {
    path: "*",
    element: <Layout children={<ErrorPage />} />,
    errorElement: <Layout children={<ErrorPage />} />,
  },
];

export const router = createBrowserRouter(routerArr);
