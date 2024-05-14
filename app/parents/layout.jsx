import SideNav from "@/components/side_navigation_bar/SideNav";
import sideNavigationItems from "@/data/SideNavigationItems";

export const metadata = {
  title: 'Casa Chirilagua | Parents',
  descrtiption: "Primary page for managing parents.",
}
const layout = ({ children }) => {

  return (
    <div className="primary-container my-custom-background">
      <SideNav SidebarData={[sideNavigationItems.parents, sideNavigationItems.parent_registration]} selectedColor={sideNavigationItems.parents.color} />
      {children}
    </div>
  )
}

export default layout