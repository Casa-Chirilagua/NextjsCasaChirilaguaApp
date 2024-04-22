import SideNav from "@/components/side_navigation_bar/SideNav";
import sideNavigationItems from "@/data/SideNavigationItems";

const layout = ({ children }) => {
  
    return (
    <div className="primary-container my-custom-background">
        <SideNav SidebarData={[sideNavigationItems.volunteers, sideNavigationItems.volunteer_registration]} selectedColor={sideNavigationItems.volunteers.color}/>
        {children}
    </div>
  )
}

export default layout