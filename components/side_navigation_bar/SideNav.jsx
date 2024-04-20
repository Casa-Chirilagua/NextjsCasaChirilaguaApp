import React, { useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";

function SideNav({ SidebarData, selectedColor }) {
  const [sidebar, setSidebar] = useState(false);
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
            <Link to="#" className="menu-bars">
              <HiBars3 />
            </Link>
          </li>
        </IconContext.Provider>
        {SidebarData.map((item, index) => {
          return (
            <li key={index} className={`list-item ${item.cName}`}>
              <Link
                style={{
                  color: hoveredItem === index ? white : selectedColor,
                  backgroundColor:
                    hoveredItem === index ? selectedColor : white,
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                to={item.path}
                className='sidebar-list-item'
              >
                {item.icon}
                <span className='sidenav-item-text' style={{ marginLeft: "1.6rem", color: hoveredItem === index ? white : "#343a40"}}>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SideNav;
