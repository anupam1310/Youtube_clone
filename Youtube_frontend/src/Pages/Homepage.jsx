import Header from "../Component/Header";
import { SidebarProvider } from "../Component/Sidebar.context.jsx";
import VideoGrid from "../Component/VideoGrid.jsx";
import { SearchWordProvider } from "../Component/SearchWord.context.jsx";

// Home Page with header, sidebar, and video grid
function HomePage() {
  return (
    <div>
      <SidebarProvider>
        <SearchWordProvider>
          <Header />
          <VideoGrid />
        </SearchWordProvider>
      </SidebarProvider>
    </div>
  );
}

export default HomePage;
