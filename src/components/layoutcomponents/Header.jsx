import { RiMenu3Line } from "react-icons/ri";
import LocationHeading from "./LocationHeading";
import { useNavigate } from "react-router-dom";
import ToggleButton from "../ToggleButton";

const Header = ({ collapse, setCollapse }) => {
  const navigate = useNavigate();
  function handleLogOut() {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  return (
    <>
      <header
        className={`sticky top-0 inset-x-0 py-4 flex sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm px-3 ${
          collapse ? "lg:pl-24 " : " lg:pl-64"
        }`}
      >
        <nav
          className={`flex items-center md:flex-[0.2] gap-3 px-3`}
          aria-label="Global"
        >
          <span
            className="flex cursor-pointer"
            onClick={() => {
              setCollapse(!collapse);
            }}
          >
            <RiMenu3Line size={24} color="#777" />
          </span>
          <LocationHeading />
          {/* <ToggleButton/> */}
        </nav>
        <div className="flex flex-1 md:flex-[0.8] items-center justify-end w-full px-4 ml-auto sm:justify-between sm:gap-x-3 sm:order-3 ">
          <div className="flex flex-row items-center justify-end w-full gap-5">
            <div className="items-center gap-3 hs-dropdown relative inline-flex [--placement:bottom-right]">
              <div
                className="cursor-pointer flex items-center rounded-full p-1"
                title="Home"
                onClick={() => {
                  navigate("/");
                  setCollapse(true);
                }}
              >
                <div className="text-grey-600 font-sans font-bold uppercase">
                  Home
                </div>
              </div>
            </div>
            <div className="items-center gap-3 hs-dropdown relative inline-flex [--placement:bottom-right]">
              <div
                className="cursor-pointer flex items-center rounded-full p-1"
                title="LogOut"
                onClick={() => {
                  handleLogOut();
                }}
              >
                <div className="text-grey-600 font-sans font-bold uppercase">
                  Logout
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
