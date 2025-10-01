
import Header from "./Component/Header.jsx"
import LoginPage from "./Pages/LoginPage.jsx"
import RegisterPage from "./Pages/Register.jsx";
import HomePage from "./pages/HomePage.jsx";
import { createBrowserRouter,RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    }
  ]);

  return (
    <>


      <RouterProvider router={router} />

    </>
  )
}

export default App
