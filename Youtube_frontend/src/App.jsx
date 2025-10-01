import { createBrowserRouter } from "react-router-dom"
import Header from "./Component/Header.jsx"
import LoginPage from "./Pages/LoginPage.jsx"

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

      <LoginPage />
    </>
  )
}

export default App
