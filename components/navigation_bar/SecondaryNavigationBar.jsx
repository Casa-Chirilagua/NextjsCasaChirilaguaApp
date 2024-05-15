'use client';
import Link from 'next/link';
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import navItems from "@/data/MainNavigationItems"; // Make sure the path is correct
import { useSession } from 'next-auth/react';

function SecondaryNavigationBar() {
  const { data: session } = useSession();
  //.log(session);
  const pathname = usePathname();
  //.log(pathname);
  const [activeItem, setActiveItem] = useState(null);

  // Effect to update active item based on pathname
  useEffect(() => {
    // Find item whose path matches the current pathname
    const currentItemKey = Object.keys(navItems).find(key => pathname.includes(navItems[key].path));
    setActiveItem(currentItemKey ? navItems[currentItemKey].label : null);
  }, [pathname]);

  const getItemStyle = (item) => {
    return { color: item.label === activeItem ? item.color : "#495057" };
  };

  const getBorderBottomColor = (item) => {
    return { borderBottom: `0.2rem solid ${item.label === activeItem ? item.color : 'white'}` };
  };

  return (
    pathname !== '/login' && <nav className="main-navbar-container">
      <ul className="navbar-nav mr-auto">
        {Object.entries(navItems).map(([key, item], index) => (
          <li key={index} className={`nav-item ${item.label.toLowerCase()}`}>
            <div
              tabIndex={index}
              className={`item ${item.label.toLowerCase()}`}
              onClick={() => setActiveItem(item.label)}
              style={getItemStyle(item)}
            >
              {item.icon}
              <Link href={item.path}>
                <p className="nav-link" style={getBorderBottomColor(item)}>
                  {item.label}
                </p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SecondaryNavigationBar;
