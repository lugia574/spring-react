import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Error from "../pages/Error";
import Join from "../pages/Join";
import Login from "../pages/Login";
import Main from "../pages/Main";
import PostDetail from "../pages/PostDetail";
import PostEdit from "../pages/PostEdit";
import PostWrite from "../pages/PostWrite";

// interface RouterProps {
//   children: React.ReactNode;
// }

const routerArr = [
  {
    path: "/",
    element: <Layout children={<Main />} />,
    errorElement: <Layout children={<Error />} />,
  },
  {
    path: "/join",
    element: <Layout children={<Join />} />,
    errorElement: <Layout children={<Error />} />,
  },
  {
    path: "/login",
    element: <Layout children={<Login />} />,
    errorElement: <Layout children={<Error />} />,
  },
  {
    path: "/post:id",
    element: <Layout children={<PostDetail />} />,
    errorElement: <Layout children={<Error />} />,
  },
  {
    path: "/post:id/edit",
    element: <Layout children={<PostEdit />} />,
    errorElement: <Layout children={<Error />} />,
  },
  {
    path: "/write",
    element: <Layout children={<PostWrite />} />,
    errorElement: <Layout children={<Error />} />,
  },
  {
    path: "*",
    element: <Layout children={<Error />} />,
    errorElement: <Layout children={<Error />} />,
  },
];

export const router = createBrowserRouter(routerArr);
