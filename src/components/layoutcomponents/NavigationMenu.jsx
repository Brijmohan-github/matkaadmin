import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiLuggageDepositLine, RiStackLine } from "react-icons/ri";
import SidebarLinkGroup from "./SidebarLinkGroupProps";
import { RiBankFill } from "react-icons/ri";
import {
  IoGameControllerOutline,
  IoSettingsOutline,
  IoBusinessOutline,
  IoStorefrontOutline,
} from "react-icons/io5";
import { SiAmazongames, SiGamemaker, SiRepublicofgamers } from "react-icons/si";
import { FiUsers } from "react-icons/fi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaFantasyFlightGames, FaRegBell } from "react-icons/fa6";
import { MdLock } from "react-icons/md";
import { IoMdImages } from "react-icons/io";
const NavigationMenu = ({ collapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded == null ? false : storedSidebarExpanded == "true"
  );
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <>
      <div className="flex-1 space-y-5">
        {[
          {
            icon: <RiStackLine size={24} />,
            title: "Dashboard",
            link: "/",
          },

          {
            icon: <FiUsers size={24} />,
            title: "Users",
            link: "/users",
          },
          {
            icon: <IoGameControllerOutline size={24} />,
            title: "Game",
            link: "/game",
          },
          // {
          //   icon: <IoStorefrontOutline size={24} />,
          //   title: "Self Game",
          //   link: "/selfgame",
          // },
          // {
          //   icon: <IoBusinessOutline size={24} />,
          //   title: "Market Game",
          //   link: "/marketgame",
          // },
          {
            icon: <FaFantasyFlightGames size={24} />,
            title: "Bet",
            link: "/bets",
          },
          {
            icon: <SiRepublicofgamers size={24} />,
            title: "Declare Result",
            link: "/declareresult",
          },
          {
            icon: <SiAmazongames size={24} />,
            title: "Delhi Games",
            link: "/delhigames",
          },
          {
            icon: <SiGamemaker size={24} />,
            title: "Starline",
            link: "/starline",
          },
          {
            icon: <RiLuggageDepositLine size={24} />,
            title: "Recharge",
            link: "/recharge",
          },
          {
            icon: <BiMoneyWithdraw size={24} />,
            title: "Withdraw",
            link: "/withdraw",
          },
          {
            icon: <FaRegBell size={24} />,
            title: "Notice",
            link: "/notice",
          },
          {
            icon: <MdLock size={24} />,
            title: "Change Password",
            link: "/changepassword",
          },
          {
            icon: <IoMdImages size={24} />,
            title: "Slider Settings",
            link: "/slider",
          },
          {
            icon: <RiBankFill size={24} />,
            title: "Bank",
            link: "/bank",
          },
          {
            icon: <IoSettingsOutline size={24} />,
            title: "Settings",
            link: "/settings",
          },
        ].map((course, index) => (
          <ul key={index}>
            {course.submenu ? (
              <SidebarLinkGroup
                activeCondition={pathname.includes(course.link)}
              >
                {(handleClick, open) => (
                  <>
                    <NavLink
                      to="#"
                      className={() =>
                        `group flex menu items-center gap-x-3.5 p-3 pr-6 duration-200 transition rounded-l-full   text-md hover:text-white  cursor-pointer  rounded-md font-medium  ${
                          pathname.includes(course.link)
                            ? "bg-primary text-white"
                            : "text-gray-400"
                        }`
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        if (sidebarExpanded) {
                          handleClick();
                          navigate(course.link);
                        } else {
                          setSidebarExpanded(true);
                        }
                      }}
                    >
                      {course.icon}
                      <span className={`${collapse && "hidden"}`}>
                        {course.title}
                      </span>
                    </NavLink>

                    {!collapse && (
                      <div
                        className={`translate duration-300 transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-2 ml-3 border-l-2 border-primary ">
                          {course.submenu.map((subItem) => (
                            <li key={Math.random() * 10000}>
                              <NavLink
                                end
                                to={subItem.link}
                                className={({ isActive }) =>
                                  `group relative flex items-center gap-2.5 rounded-sm   p-4  font-medium  duration-300 ease-in-out  ${
                                    isActive
                                      ? "font-medium text-white"
                                      : "text-gray-400"
                                  }`
                                }
                              >
                                {subItem.subtitle}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </SidebarLinkGroup>
            ) : (
              <NavLink
                to={course.link}
                id="menu"
                className={({ isActive }) =>
                  `flex menu items-center gap-x-3.5 p-3 pr-6 duration-200 transition rounded-l-full   text-md hover:text-white  cursor-pointer  rounded-md font-medium  ${
                    isActive ? "bg-primary text-white" : "text-gray-400"
                  }`
                }
              >
                {course.icon}
                <span className={`${collapse && "hidden"}`}>
                  {course.title}
                </span>
              </NavLink>
            )}
          </ul>
        ))}
      </div>
    </>
  );
};

export default NavigationMenu;
