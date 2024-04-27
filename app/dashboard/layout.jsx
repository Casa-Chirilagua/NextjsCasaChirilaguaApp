import SideNav from '@/components/side_navigation_bar/SideNav'
import sideNavigationItems from '@/data/SideNavigationItems'
import { useSession } from 'next-auth/react';

const layout = ({ children }) => {
    const { data: session } = useSession();
    return (
        session && <div className='primary-container my-custom-background'>
            <SideNav SidebarData={[sideNavigationItems.student_Dashboard, sideNavigationItems.volunteer_Dashboard, sideNavigationItems.program_Dashboard, sideNavigationItems.parent_Dashboard, sideNavigationItems.mentor_Dashboard]} selectedColor={sideNavigationItems.dashboard.color} />
            {children}
        </div>
    )
}


export default layout