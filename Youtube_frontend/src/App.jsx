import { createBrowserRouter } from "react-router-dom"
import Header from "./Component/Header.jsx"
import LoginPage from "./Pages/LoginPage.jsx"
import RegisterPage from "./Pages/Register.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return (
    <>

      <Header />
      <RegisterPage />
      <LoginPage />
    </>
  )
}

export default App
