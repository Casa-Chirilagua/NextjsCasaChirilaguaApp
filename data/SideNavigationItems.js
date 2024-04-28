//Icons
import { LuLayoutDashboard } from "react-icons/lu";
import { PiStudent } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { RiParentLine } from "react-icons/ri";
import { BiDonateHeart } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { AiOutlineForm } from "react-icons/ai";

//Colors
import Colors from "@/data/Colors";

const sideNavigationItems = {
  dashboard: {
    label: "Dashboard",
    icon: <LuLayoutDashboard className="dashboard-icon icon" />,
    path: "/dashboard/student",
    color: Colors["color-green"],
  },
  students: {
    label: "Students",
    icon: <PiStudent className="student-icon icon" />,
    path: "/students",
    color: Colors["color-purple-dark"],
  },
  parents: {
    label: "Parents",
    icon: <RiParentLine className="parent-icon icon" />,
    path: "/parents",
    color: Colors["color-light-green"],
  },
  programs: {
    label: "Programs",
    icon: <HiOutlineUserGroup className="program-icon icon" />,
    path: "/programs",
    color: Colors["color-green"],
  },
  families: {
    label: "Families",
    icon: <IoHomeOutline className="family-icon icon" />,
    path: "/families",
    color: Colors["color-purple-dark"],
  },
  volunteers: {
    label: "Volunteers",
    icon: <BiDonateHeart className="volunteer-icon icon" />,
    path: "/volunteers",
    color: Colors["color-green"],
  },
  mentors: {
    label: "Mentors",
    icon: <IoPersonOutline className="mentor-icon icon" />,
    path: "/mentors",
    color: Colors["color-orange"],
  },
  student_registration: {
    label: "Registration",
    icon: <AiOutlineForm className="student-registration-icon icon" />,
    path: "/students/registration",
    color: Colors["color-purple-dark"],
  },
  parent_registration: {
    label: "Registration",
    icon: <AiOutlineForm className="parent-registration-icon icon" />,
    path: "/parents/registration",
    color: Colors["color-light-green"],

  },
  volunteer_registration: {
    label: "Registration",
    icon: <AiOutlineForm className="volunteer-registration-icon icon" />,
    path: "/volunteers/registration",
    color: Colors["color-green"],
  },
  mentor_registration: {
    label: "Registration",
    icon: <AiOutlineForm className="mentor-registration-icon icon" />,
    path: "/mentors/registration",
    color: Colors["color-orange"],
  },
  program_registration: {
    label: "Registration",
    icon: <AiOutlineForm className="mentor-registration-icon icon" />,
    path: "/program/registration",
    color: Colors["color-green"],
  },
  student_Dashboard: {
    label: "Student",
    icon: <PiStudent className="student-icon icon" />,
    path: "/dashboard/student",
    color: Colors["color-purple-dark"],
  },
  parent_Dashboard: {
    label: "Parent",
    icon: <RiParentLine className="parent-icon icon" />,
    path: "/dashboard/parent",
    color: Colors["color-light-green"],
  },
  family_Dashboard: {
    label: "Family",
    icon: <IoHomeOutline className="family-icon icon" />,
    path: "/dashboard/family",
    color: Colors["color-purple-dark"],
  },
  volunteer_Dashboard: {
    label: "Volunteer",
    icon: <BiDonateHeart className="volunteer-icon icon" />,
    path: "/dashboard/volunteer",
    color: Colors["color-green"],
  },
  mentor_Dashboard: {
    label: "Mentor",
    icon: <IoPersonOutline className="mentor-icon icon" />,
    path: "/dashboard/mentor",
    color: Colors["color-orange"],
  },
  program_Dashboard: {
    label: "Program",
    icon: <HiOutlineUserGroup className="program-icon icon" />,
    path: "/dashboard/program",
    color: Colors["color-green"],
  },
};

export default sideNavigationItems;
