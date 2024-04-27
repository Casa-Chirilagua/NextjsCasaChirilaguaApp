'use client'

import SideNav from "@/components/side_navigation_bar/SideNav";
import sideNavigationItems from "@/data/SideNavigationItems";
import { useSession } from 'next-auth/react';


const layout = ({ children }) => {
  const { data: session } = useSession();

    return (
      session && <div className="primary-container my-custom-background">
        <SideNav SidebarData={[sideNavigationItems.mentors, sideNavigationItems.mentor_registration]} selectedColor={sideNavigationItems.mentors.color}/>
        {children}
    </div>
  )
}

export default layout