
import SideNav from "@/components/side_navigation_bar/SideNav";
import sideNavigationItems from "@/data/SideNavigationItems";

export const metadata = {
  title: 'Casa Chirilagua | Programs  ',
  descrtiption: "Primary page for managing programs.",
}
const layout = ({ children }) => {

  return (
    <div className="primary-container my-custom-background">
      <SideNav SidebarData={[sideNavigationItems.programs, sideNavigationItems.program_registration]} selectedColor={sideNavigationItems.programs.color} />
      {children}
    </div>
  )
}

export default layout