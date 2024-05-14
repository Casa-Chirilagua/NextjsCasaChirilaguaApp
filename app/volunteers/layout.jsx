import SideNav from "@/components/side_navigation_bar/SideNav";
import sideNavigationItems from "@/data/SideNavigationItems";

export const metadata = {
  title: 'Casa Chirilagua | Volunteers',
  descrtiption: "Primary page for managing volunteers.",
}
const layout = ({ children }) => {
  
    return (
    <div className="primary-container my-custom-background">
        <SideNav SidebarData={[sideNavigationItems.volunteers, sideNavigationItems.volunteer_registration]} selectedColor={sideNavigationItems.volunteers.color}/>
        {children}
    </div>
  )
}

export default layout