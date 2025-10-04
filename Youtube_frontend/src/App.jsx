
import Header from "./Component/Header.jsx"
import LoginPage from "./Pages/LoginPage.jsx"
import RegisterPage from "./Pages/Register.jsx";
import HomePage from "./pages/HomePage.jsx";
import CreateChannelPage from "./Pages/CreateChannelPage.jsx";
import MyChannelPage from "./Pages/MyChannelPage.jsx";
import AddVideoPage from "./Pages/AddVideoPage.jsx";
import VideoPlayerPage from "./Pages/VideoPlayerPage.jsx";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { SearchWordProvider } from "./Component/SearchWord.context.jsx";
import { SidebarProvider } from "./Component/Sidebar.context.jsx";

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
      <SearchWordProvider>
        <SidebarProvider>
          <RouterProvider router={router} />
        </SidebarProvider>
      </SearchWordProvider>


    </>
  )
}

export default App
