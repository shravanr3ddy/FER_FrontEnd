import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../utility/constants";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();

  const getHeaderTitle = () => {
    if (ROUTE_PATHS.CAPTURE_EMOTIONS === pathName) {
      return <h1>Capture Your Emotion</h1>;
    } else if (ROUTE_PATHS.FAVOURITES === pathName) {
      return <h1>Favourites</h1>;
    } else if (ROUTE_PATHS.CURRENT_MATCH === pathName) {
      return <h1>Current Trends</h1>;
    } else if (ROUTE_PATHS.CONTACT === pathName) {
      return <h1>Contact Us</h1>;
    } else if (ROUTE_PATHS.ABOUT_US === pathName) {
      return <h1>About Us</h1>;
    } else {
      return <h1>Logout</h1>;
    }
  };

  const getHeaderCaptions = () => {
    if (ROUTE_PATHS.CAPTURE_EMOTIONS === pathName) {
      return "Upload your photo or use your webcam to let MelodyMood capture your current emotion. Our sophisticated FER system will analyze your facial expression and curate a music playlist that aligns with your mood.";
    } else if (ROUTE_PATHS.FAVOURITES === pathName) {
      return "Curate your trend haven. Save, access, and share your favorites.";
    } else if (ROUTE_PATHS.CURRENT_MATCH === pathName) {
      return "Explore the latest buzz! Stay updated and inspired.";
    } else if (ROUTE_PATHS.CONTACT === pathName) {
      return "Reach Out to Our Friendly Team: We're Here to Help!";
    } else if (ROUTE_PATHS.ABOUT_US === pathName) {
      return "Tuning into Emotions with Technology and Music";
    } else if (ROUTE_PATHS.DOCUMENTATION === pathName) {
      return "Documentation";
    }
  };
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('authenticated');
    // Or if you want to clear all local storage data
    // localStorage.clear();
    
    // Redirect to login page or home page after logout
    navigate(ROUTE_PATHS.LOGIN);
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark" style={{backgroundColor: '#fff'}}>
        <div className="container-fluid">
          <Link to={ROUTE_PATHS.HOME} className="navbar-brand router_links project_name">
            MelodyMood
          </Link>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto custom_header">
              <li
                className={`nav-item router_links ${
                  ROUTE_PATHS.HOME === pathName ? "active" : ""
                }`}
              >
                <Link to={ROUTE_PATHS.HOME} className={`nav-link text-dark ${
                  ROUTE_PATHS.HOME === pathName ? "active" : ""
                }`}>
                  Home
                </Link>
              </li>
              {/* <li
                className={`nav-item router_links ${
                  ROUTE_PATHS.CURRENT_MATCH === pathName ? "active" : ""
                }`}
              >
                <Link to={ROUTE_PATHS.CURRENT_MATCH} className={`nav-link text-dark ${
                  ROUTE_PATHS.CURRENT_MATCH === pathName ? "active" : ""
                }`}>
                  Current Trends
                </Link>
              </li> */}
              <li
                className={`nav-item router_links ${
                  ROUTE_PATHS.CAPTURE_EMOTIONS === pathName ? "active" : ""
                }`}
              >
                <Link to={ROUTE_PATHS.CAPTURE_EMOTIONS} className={`nav-link text-dark ${
                  ROUTE_PATHS.CAPTURE_EMOTIONS === pathName ? "active" : ""
                }`}>
                  Capture Your Emotion
                </Link>
              </li>
              {/* <li
                className={`nav-item router_links ${
                  ROUTE_PATHS.FAVOURITES === pathName ? "active" : ""
                }`}
              >
                <Link to={ROUTE_PATHS.FAVOURITES} className={`nav-link text-dark ${
                  ROUTE_PATHS.FAVOURITES === pathName ? "active" : ""
                }`}>
                  Favourites
                </Link>
              </li> */}
              <li
                className={`nav-item router_links ${
                  ROUTE_PATHS.ABOUT_US === pathName ? "active" : ""
                }`}
              >
                <Link to={ROUTE_PATHS.ABOUT_US} className={`nav-link text-dark ${
                  ROUTE_PATHS.ABOUT_US === pathName ? "active" : ""
                }`}>
                  About Us
                </Link>
              </li>
              <li
                className={`nav-item router_links ${
                  ROUTE_PATHS.CONTACT === pathName ? "active" : ""
                }`}
              >
                <Link to={ROUTE_PATHS.CONTACT} className={`nav-link text-dark  ${
                  ROUTE_PATHS.CONTACT === pathName ? "active" : ""
                }`}>
                  Contact
                </Link>
              </li>
              <li className="nav-item router_links">
              <Link to={ROUTE_PATHS.LOGOUT} className="nav-link text-dark" onClick={handleLogout}>
                Logout
              </Link>
            </li>
            </ul>
          </div>
        </div>
      </nav>
      {ROUTE_PATHS.HOME === pathName ? null : (
        <header id="page-header">
          <div className="fade_layer">
            <div className="container" style={{paddingTop: '50px'}}>
              <div className="row">
                <div className="col-md-6 m-auto text-center">
                  {getHeaderTitle()}
                  <p>
                  {getHeaderCaptions()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
