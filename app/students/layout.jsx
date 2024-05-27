
import SideNav from "@/components/side_navigation_bar/SideNav";
import sideNavigationItems from "@/data/SideNavigationItems";

export const metadata = {
  title: 'Casa Chirilagua | Students',
  descrtiption: "Primary page for managing students.",
}

const layout = ({ children }) => {

  return (
    <div className="primary-container my-custom-background">
        <SideNav SidebarData={[sideNavigationItems.students, sideNavigationItems.student_registration_v2]} selectedColor={sideNavigationItems.students.color}/>
        {children}
    </div>

  )
}

export default layout