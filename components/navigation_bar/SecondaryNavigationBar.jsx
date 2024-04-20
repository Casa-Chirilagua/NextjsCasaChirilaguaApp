'use client';

import Link from 'next/link';
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation'

//Icons
import { LuLayoutDashboard } from "react-icons/lu";
import { PiStudent } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineDiversity2 } from "react-icons/md";
import { RiParentLine } from "react-icons/ri";
import { BiDonateHeart } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";

//data
import Colors from "@/data/Colors";

const navItems = [
  { label: "Dashboard", icon: <LuLayoutDashboard className="dashboard-icon icon" />, path: "/dashboard/student", color: Colors["color-green"] },
  { label: "Students", icon: <PiStudent className="student-icon icon" />, path: "/students", color: Colors["color-purple-dark"] },
  { label: "Parents", icon: <RiParentLine className="parent-icon icon" />, path: "/parents", color: Colors["color-light-green"] },
  { label: "Programs", icon: <MdOutlineDiversity2 className="program-icon icon" />, path: "/programs", color: Colors["color-green"] },
  { label: "Families", icon: <IoHomeOutline className="family-icon icon" />, path: "/families", color: Colors["color-purple-dark"] },
  { label: "Volunteers", icon: <BiDonateHeart className="volunteer-icon icon" />, path: "/volunteers", color: Colors["color-green"] },
  { label: "Mentors", icon: <IoPersonOutline className="mentor-icon icon" />, path: "/mentors", color: Colors["color-orange"] },
];

//User Session
import { useSession } from 'next-auth/react';

function SecondaryNavigationBar() {
  const { data: session } = useSession();

  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState(null);

  // Effect to update active item based on pathname
  useEffect(() => {
    const currentItem = navItems.find(item => pathname.includes(item.path));
    if (currentItem) {
      setActiveItem(currentItem.label);
    }
  }, [pathname]); // Re-run this effect when pathname changes

  const getItemStyle = (item) => {
    return { color: item.label === activeItem ? item.color : "#888888" };
  };

  const getBorderBottomColor = (item) => {
    return { borderBottom: `0.2rem solid ${item.label === activeItem ? item.color : 'white'}` };
  };

  return (
    session && <nav className="main-navbar-container">
      <ul className="navbar-nav mr-auto">
        {navItems.map((item, index) => (
          <li key={index} className={`nav-item ${item.label.toLowerCase()}`}>
            <div
              tabIndex={index}
              className={`item ${item.label.toLowerCase()}`}
              onClick={() => setActiveItem(item.label)}
              style={getItemStyle(item)}
            >
              {item.icon}
              <Link href={item.path}>
                <div className="nav-link" style={getBorderBottomColor(item)}>{item.label}</div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SecondaryNavigationBar;
