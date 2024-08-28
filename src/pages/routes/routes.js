import { createBrowserRouter } from "react-router-dom";

import App from "../../App";
import Home from "../../pages/home/home";
import TodoList from "../../components/todoList/Todo-List";
import ProductList from "../../components/productsList/Products-List";
import MagicBall from "../../components/magicBall/Magic-Ball";

import Users from "../users/Users";
import User from "../users/User";
import { getUser, getUsers } from "../../loaders/usersLoaders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Page Not Found</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/todo",
        element: <TodoList />,
      },
      {
        path: "/product-list",
        element: <ProductList />,
      },
      {
        path: "/magic-ball",
        element: <MagicBall />,
      },
      {
        path: "/users",
        element: <Users />,
        loader: getUsers,
        children: [
          {
            path: ":id" /* users/:id */,
            element: <User />,
            loader: getUser,
          },
        ],
      },
      {
        path: "users/:id",
        element: <User />,
        loader: getUser,
      },
    ],
  },
]);

export default router;
