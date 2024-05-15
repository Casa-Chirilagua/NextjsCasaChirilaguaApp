'use client';
import { useState } from "react";
import Link from "next/link";
import { IconContext } from "react-icons";
import { usePathname } from 'next/navigation';

import { RxHamburgerMenu } from "react-icons/rx";

function SideNav({ SidebarData, selectedColor }) {
  const [sidebar, setSidebar] = useState(false);
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState(null);
  const white = "#fff";

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
      <ul className="nav-menu-items" onClick={showSidebar}>
        <IconContext.Provider value={{ color: selectedColor }}>
          <li className="navbar-toggle">
            <div className="menu-bars flex items-center justify-center text-4xl" onClick={showSidebar}>
              <RxHamburgerMenu style={{color: selectedColor}} />
            </div>
          </li>
        </IconContext.Provider>
        {SidebarData.map((item, index) => {
          const isActive = pathname === item.path;
          return (
            <li key={index} className={`list-item nav-text`}>
              <Link className='sidebar-list-item' href={item.path}>
                <p
                  style={{
                    color: isActive ? white : (hoveredItem === index ? selectedColor : "#343a40"),
                    backgroundColor: isActive ? selectedColor : (hoveredItem === index ? selectedColor : white),
                  }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  className='sidebar-list-item'
                >
                  {item.icon}
                  <span style={{ marginLeft: "1.6rem", color: isActive ? white : (hoveredItem === index ? white : "#343a40") }}>
                    {item.label}
                  </span>
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SideNav;
