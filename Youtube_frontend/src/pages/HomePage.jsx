//. Home Page:  using tailwinf for styling
// ○ Display a YouTube Header.  
// ○ Display a static sidebar that you can toggle from the top hamburger menu.  
// ○ Display filter buttons at the top.  
// ○ Display a grid of video thumbnails.  
// ○ Each video card should show:  We will make card as separate component
// ■ Title  
// ■ Thumbnail  
// ■ Channel Name  
// ■ Views


import Header from '../Header';

function HomePage() {
    const handleHamburgerClick = () => {
        // TODO: Implement sidebar toggle logic
        alert('Sidebar toggle');
    };
    return (
        <div>
            <Header onHamburgerClick={handleHamburgerClick} />
            {/* <Sidebar />
            <Filters />
            <VideoGrid /> */}
        </div>
    );
}

export default HomePage;