// Import required CSS file and components
import React, { useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/header";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/home";
import Contact from "./Pages/Contact/contact";
import About from "./Pages/AboutUs/about";

// Import required routing components and hooks from react-router-dom
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import additional page components
import Trends from "./Pages/Trends/trends";
import MatchTrends from "./Pages/CaptureEmotions/captureEmotion";

// Import constants for route paths
import { ROUTE_PATHS } from "./utility/constants";

// Import the Favourites component
import Favourites from "./Components/Favourites/Favourites";

// Import the useLocation hook from react-router-dom
import { useLocation } from "react-router-dom";

// Import the useState hook from React
import { useState } from "react";
// import Login from "./Pages/auth/Login";
import { setClientToken } from "./spotify";
import Login from "./Pages/Autentication/Login/login";
import SignUp from "./Pages/Autentication/SignUp/signup";

function App() {
  // Get the current location and path from the useLocation hook
  const location = useLocation();
  const pathName = location.pathname;
  const authenticated = Boolean(localStorage.getItem("authenticated"));

  // Define a state variable for storing favourites data
  const [favouritesData, setFavouritesData] = useState([]);

  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);
debugger;
  return (
    // Render the Header and Footer components along with the Routes

    !authenticated ? (
      <Routes>
        <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />
        <Route path={ROUTE_PATHS.SIGNUP} element={<SignUp />} />
        <Route path="*" element={<Navigate to={ROUTE_PATHS.LOGIN} replace />} />
      </Routes>
    ) : (
      <>
        <Header />
        <div
          className={`${
            pathName === ROUTE_PATHS.HOME ? "" : "custom_container"
          }`}
        >
          <Routes>
            {/* // Define the routes for each page component */}

            <Route path={ROUTE_PATHS.HOME} element={<Home />} />
            <Route exact path={ROUTE_PATHS.CONTACT} element={<Contact />} />
            <Route exact path={ROUTE_PATHS.ABOUT_US} element={<About />} />
            <Route
              exact
              path={ROUTE_PATHS.CURRENT_MATCH}
              element={<Trends setFavouritesData={setFavouritesData} />}
            />
            <Route
              exact
              path={ROUTE_PATHS.CAPTURE_EMOTIONS}
              element={<MatchTrends />}
            />
            <Route
              exact
              path={ROUTE_PATHS.FAVOURITES}
              element={<Favourites favouritesData={favouritesData} />}
            />
            <Route path="*" element={<Navigate to={ROUTE_PATHS.HOME} replace />} />
          </Routes>
        </div>
        <Footer />
      </>
    )
  );
}

// Export the App component as the default export
export default App;
