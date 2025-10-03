
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
        <iframe width="560" height="315" src="https://www.youtube.com/embed/c02YoWR9gSY?si=1P8iHcQIDKZbFOdi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>

  );
}

export default HomePage;
