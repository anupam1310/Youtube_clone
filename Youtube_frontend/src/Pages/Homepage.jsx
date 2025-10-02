
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import { SidebarProvider } from "../Component/Sidebar.context.jsx";
function HomePage() {
  return (

      <div>
        <SidebarProvider>
          <Header />
        </SidebarProvider>
        

        <h1>Welcome to the Home Page</h1>
        <p>This is the main landing page of the application.</p>
      </div>

  );
}

export default HomePage;
