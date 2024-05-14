import SideNav from "@/components/side_navigation_bar/SideNav";
import sideNavigationItems from "@/data/SideNavigationItems";

export const metadata = {
  title: 'Casa Chirilagua | Families',
  descrtiption: "Primary page for managing families.",
}
const layout = ({ children }) => {

  return (
    <div className="primary-container my-custom-background">
      <SideNav SidebarData={[sideNavigationItems.families]} selectedColor={sideNavigationItems.families.color} />
      {children}
    </div>
  )
}

export default layout