// Dashboard.js
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

function LocationHeading() {
  const location = useLocation();
  const { listId, userId } = useParams(); // Get the dynamic part of the route

  // Define your header based on the route using the useState hook
  const [header, setHeader] = useState("");

  useEffect(() => {
    if (location.pathname.startsWith("/gamecontrol")) {
      setHeader("Game Control");
      return;
    }
    if (location.pathname.startsWith("/userdetail")) {
      setHeader("User Details");
      return;
    }
    switch (location.pathname) {
      case "/":
        setHeader("Dashboard");
        break;
      case "/game":
        setHeader("Game");
        break;
      case "/users":
        setHeader("Users");
        break;
      case "/recharge":
        setHeader("Recharge");
        break;
      case "/withdraw":
        setHeader("Withdraw");
        break;
      case "/settings":
        setHeader("Settings");
        break;
      case "/bets":
        setHeader("All Bets");
        break;
      case "/selfgame":
        setHeader("Self Game");
        break;
      case "/marketgame":
        setHeader("Market Game");
        break;
      case "/bank":
        setHeader("Bank Setting");
        break;
      case "/notice":
        setHeader("Notice");
        break;
      case "/changepassword":
        setHeader("Change Password");
        break;
      case "/declareresult":
        setHeader("Declare Result");
        break;
      case "/starline":
        setHeader("Starline Result");
        break;
      case "/slider":
        setHeader("Slider");
        break;
      case "/delhigames":
        setHeader("Delhi Games");
        break;
      default:
        setHeader("Unknown Page");
    }
  }, [location.pathname, listId, userId]); // Listen for changes in location.pathname

  return <h4 className="hidden text-xl font-semibold md:block">{header}</h4>;
}

export default LocationHeading;
