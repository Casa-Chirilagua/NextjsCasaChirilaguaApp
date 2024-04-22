import SideNav from "@/components/side_navigation_bar/SideNav";
import sideNavigationItems from "@/data/SideNavigationItems";

const layout = ({ children }) => {
  
    return (
    <div className="primary-container my-custom-background">
        <SideNav SidebarData={[sideNavigationItems.students, sideNavigationItems.student_registration]} selectedColor={sideNavigationItems.students.color}/>
        {children}
    </div>
  )
}

export default layout