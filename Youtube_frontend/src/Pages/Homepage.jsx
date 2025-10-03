
import Header from "../Component/Header";
import { SidebarProvider } from "../Component/Sidebar.context.jsx";
import VideoGrid from "../Component/VideoGrid.jsx";
function HomePage() {
  return (

      <div>
        <SidebarProvider>
          <Header />
        </SidebarProvider>
        <VideoGrid />


 
      </div>

  );
}

export default HomePage;
