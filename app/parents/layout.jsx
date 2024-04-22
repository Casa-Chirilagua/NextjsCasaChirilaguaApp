import SideNav from "@/components/side_navigation_bar/SideNav";
import sideNavigationItems from "@/data/SideNavigationItems";

const layout = ({ children }) => {
  
    return (
    <div className="primary-container my-custom-background">
        <SideNav SidebarData={[sideNavigationItems.parents, sideNavigationItems.parent_registration]} selectedColor={sideNavigationItems.parents.color}/>
        {children}
    </div>
  )
}

export default layout