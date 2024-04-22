//Icons
import { LuLayoutDashboard } from "react-icons/lu";
import { PiStudent } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { RiParentLine } from "react-icons/ri";
import { BiDonateHeart } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi2";
import {AiOutlineForm} from 'react-icons/ai';


//Colors
import Colors from "@/data/Colors";

const navItems = {
    dashboard: { label: "Dashboard", icon: <LuLayoutDashboard className="dashboard-icon icon" />, path: "/dashboard/student", color: Colors["color-green"] },
    students: { label: "Students", icon: <PiStudent className="student-icon icon" />, path: "/students", color: Colors["color-purple-dark"] },
    parents: { label: "Parents", icon: <RiParentLine className="parent-icon icon" />, path: "/parents", color: Colors["color-light-green"] },
    programs: { label: "Programs", icon: <HiOutlineUserGroup className="program-icon icon" />, path: "/programs", color: Colors["color-green"] },
    families: { label: "Families", icon: <IoHomeOutline className="family-icon icon" />, path: "/families", color: Colors["color-purple-dark"] },
    volunteers: { label: "Volunteers", icon: <BiDonateHeart className="volunteer-icon icon" />, path: "/volunteers", color: Colors["color-green"] },
    mentors: { label: "Mentors", icon: <IoPersonOutline className="mentor-icon icon" />, path: "/mentors", color: Colors["color-orange"] },

};

  export default navItems;