
import Header from "./Component/Header.jsx"
import LoginPage from "./Pages/LoginPage.jsx"
import RegisterPage from "./Pages/Register.jsx";
import HomePage from "./pages/HomePage.jsx";
import CreateChannelPage from "./Pages/CreateChannelPage.jsx";
import MyChannelPage from "./Pages/MyChannelPage.jsx";
import AddVideoPage from "./Pages/AddVideoPage.jsx";
import VideoPlayerPage from "./Pages/VideoPlayerPage.jsx";
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
    },
    {
      path: "/create-channel",
      element: <CreateChannelPage />,
    },
    {
      path: "/my-channel",
      element: <MyChannelPage />,
    },
    {
      path: "/add-video",
      element: <AddVideoPage />,
    },
    { path: "/video/:id",
      element: <VideoPlayerPage />, 
    }



  ]);

  return (
    <>


      <RouterProvider router={router} />

    </>
  )
}

export default App
