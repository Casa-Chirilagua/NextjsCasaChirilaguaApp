
import SideNav from "@/components/side_navigation_bar/SideNav";
import sideNavigationItems from "@/data/SideNavigationItems";

export const metadata = {
  title: 'Casa Chirilagua | Mentors',
  descrtiption: "Primary page for managing mentors.",
}
const layout = ({ children }) => {

    return (
      <div className="primary-container my-custom-background">
        <SideNav SidebarData={[sideNavigationItems.mentors, sideNavigationItems.mentor_registration]} selectedColor={sideNavigationItems.mentors.color}/>
        {children}
    </div>
  )
}

export default layout