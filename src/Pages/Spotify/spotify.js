import React, { useCallback, useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import axios from "axios";
import { musicGenres, ROUTE_PATHS, musicMoods } from "../../utility/constants";
import { useNavigate, useSearchParams } from "react-router-dom";

const Spotify = () => {
  const token = window.localStorage.getItem("spotify_token");

  const [searchParams] = useSearchParams();
  const emotion = searchParams.get("emotion");
   
  const [categories, setCategories] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [trackUris, setTrackUris] = useState([]);
  const [trackUrl, setTrackUrl] = useState("");
  const [currentView, setCurrentView] = useState("categories");
  const [breadcrumbs, setBreadcrumbs] = useState([
    { name: "Caregories", view: "categories" },
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/browse/categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const items = response.data.categories.items;

        // Check if there is an emotion query param and filter categories
        if (emotion && musicMoods[emotion]) {
           
          const filteredCategories = items.filter((category) =>
            musicMoods[emotion].includes(category?.name)
          );
          setCategories(filteredCategories);
        } else {
          setCategories(items);
        }
      } catch (error) {
        if (error.message === "Request failed with status code 401") {
          // Clear user data from localStorage
          localStorage.removeItem("user");
          localStorage.removeItem("authenticated");
          localStorage.removeItem("spotify_token");
          window.location.reload();
          // Or if you want to clear all local storage data
          // localStorage.clear();

          // Redirect to login page or home page after logout
          navigate(ROUTE_PATHS.LOGIN);
        }
        console.error("Error fetching categories from Spotify:", error);
      }
    };

    fetchCategories();
  }, [token]);

  const fetchPlaylists = async (categoryId, categoryName) => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPlaylists(response.data.playlists.items);
      setCurrentView("playlists");
      // Update breadcrumbs to include the new category
      setBreadcrumbs([
        { name: "Caregories", view: "categories" },
        { name: categoryName, view: "playlists" },
      ]);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const fetchTracks = async (playlistId, playlistName) => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTracks(response.data.items);
      setCurrentView("tracks");
      // Update breadcrumbs to include the new playlist
      setBreadcrumbs(prevBreadcrumbs => [
        ...prevBreadcrumbs.filter(crumb => crumb.view !== "tracks"), // Keep all but the 'tracks' breadcrumb
        { name: playlistName, view: "tracks" },
      ]);

      // Extract URIs from the fetched tracks and update the trackUris state
      const uris = response?.data?.items.map((item) => item?.track?.uri);
      setTrackUris(uris);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  const handleBreadcrumbClick = (view) => {
     
    setCurrentView(view);
    setBreadcrumbs(
      breadcrumbs.slice(0, breadcrumbs.findIndex((b) => b.view === view) + 1)
    );
  };

  const clicked = (e, a) => {
    setIsPlaying(e.isPlaying);
  };

  const trackClicked = (uri) => {
    // Find the index of the clicked track URI in the trackUris array
    const clickedIndex = trackUris.findIndex((url) => url === uri);

    // Reorder the trackUris array
    const reorderedTrackUris = [
      ...trackUris.slice(clickedIndex), // Get all the URIs from the clicked one to the end
      ...trackUris.slice(0, clickedIndex), // Get all the URIs that were before the clicked one
    ];

    // Update the trackUris state with the reordered array
    setTrackUris(reorderedTrackUris);

    setTrackUrl(uri);
    setIsPlaying(!isPlaying);
  };

  const handlePreviousClicked = useCallback(() => {
    // Move the last URI to the start of the array
    setTrackUris((uris) => {
      const lastUri = uris.pop(); // Remove the last element
      return [lastUri, ...uris]; // Add it to the beginning
    });
    setIsPlaying(true);
  }, []);

  const handleNextClicked = useCallback(() => {
    // Move the first URI to the end of the array
    setTrackUris((uris) => {
      const [firstUri, ...restUris] = uris; // Remove the first element
      return [...restUris, firstUri]; // Add it to the end
    });
    setIsPlaying(true);
  }, []);

  const CustomPreviousButton = ({ onClick }) => (
    <button
      className={""}
      style={{
        background: "transparent",
        border: "0px",
        borderRadius: 0,
        color: "inherit",
        cursor: "pointer",
        display: "inline-flex",
        lineHeight: 1,
        padding: "0px",
        position: "absolute",
        left: "185px",
      }}
      onClick={onClick}
    >
      <img
        src="./img/previous_button.svg"
        alt="Previous"
        className={"previous_button"}
      />
    </button>
  );

  const CustomNextButton = ({ onClick }) => (
    <button
      className={""}
      style={{
        background: "transparent",
        border: "0px",
        borderRadius: 0,
        color: "inherit",
        cursor: "pointer",
        display: "inline-flex",
        lineHeight: 1,
        padding: "0px",
        right: "175px",
        position: "absolute",
      }}
      onClick={onClick}
    >
      <img
        src="./img/previous_button.svg"
        alt="Next"
        className={"next_button"}
      />
    </button>
  );

  const components = {
    leftButton: <CustomPreviousButton onClick={handlePreviousClicked} />,
    rightButton: <CustomNextButton onClick={handleNextClicked} />,
  };

  return (
    <>
      <div className="container mt-4">
        <nav aria-label="breadcrumb" style={{width: "50%"}}>
          <ol className="breadcrumb mx-3">
            {breadcrumbs.map((crumb, index) => (
              <li
                key={index}
                className={`breadcrumb-item ${
                  index === breadcrumbs.length - 1 ? "active" : ""
                }`}
                onClick={() => handleBreadcrumbClick(crumb.view)}
              >
                {index === breadcrumbs.length - 1 ? (
                  crumb?.name
                ) : (
                  <a
                    href="#"
                  >
                    {crumb?.name}
                  </a>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
      {currentView === "categories" && (
        <div className="container spotify-playlists">
          <h1>Spotify Music Categories</h1>
          <ul>
            <div className="list">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {categories.map((category) => {
                  return (
                    <div
                      key={category.id}
                      className={`col-2 mb-4`}
                      onClick={() => fetchPlaylists(category.id, category?.name)}
                    >
                      <div className="item">
                        <img src={`${category.icons[0].url}`} />
                        <div className="play">
                          <span className="fa fa-play"></span>
                        </div>
                        <h4>{category?.name}</h4>
                        <p>
                          {musicGenres[category?.name]?.description?.replace(
                            /<[^>]*>/g,
                            ""
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ul>
        </div>
      )}
      {currentView === "playlists" && (
        <div className="container spotify-playlists">
          <h2>Playlists</h2>
          <ul>
            <div className="list">
              <div className="row g-4">
                {playlists.map((playlist) => {
                   
                  return (
                    <div
                      key={playlist.id}
                      className={`col-sm-6 col-md-4 mb-4 ${
                        playlists?.length === 2 ? "col-lg-6" : "col-lg-2"
                      }`}
                      onClick={() => fetchTracks(playlist.id, playlist?.name)}
                    >
                      <div className="card item">
                        <img src={`${playlist.images[0].url}`} />
                        <div className="play">
                          <span className="fa fa-play"></span>
                        </div>
                        <h4> {playlist?.name}</h4>
                        <p>{playlist.description?.replace(/<[^>]*>/g, "")}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ul>
        </div>
      )}
      {currentView === "tracks" && (
        <div className="container spotify-playlists">
          <h3>Tracks</h3>
          <ul>
            <div className="list">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {tracks.map((trackItem, index) => {
                  return (
                    <div key={index} className="col-2 mb-4">
                      <div
                        className="item"
                        onClick={() => trackClicked(trackItem.track.uri)}
                      >
                        <img src={`${trackItem.track?.album?.images[0].url}`} />
                        <div
                          className={`${
                            trackItem.track?.uri === trackUris[0] && isPlaying
                              ? "pause"
                              : "play"
                          }`}
                        >
                          <span
                            className={`${
                              trackItem.track?.uri === trackUris[0] && isPlaying
                                ? "fa fa-pause"
                                : "fa fa-play"
                            }`}
                          ></span>
                        </div>
                        <h4> {trackItem.track?.name}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ul>
        </div>
      )}
      <div
        style={{
          position: "fixed", // Use fixed positioning
          left: 0, // Align to the left edge
          bottom: 0, // Align to the bottom edge
          width: "100%", // Span the full width of the viewport
          zIndex: 1000, // Ensure it's above other content
        }}
      >
        {token ? (
          <SpotifyPlayer
            callback={clicked}
            play={isPlaying}
            autoPlay={false}
            components={components}
            styles={{
              activeColor: "#fff",
              bgColor: "rgb(1 69 143 / 96%)",
              color: "#fff",
              loaderColor: "#fff",
              sliderColor: "#1cb954",
              trackArtistColor: "#ccc",
              trackNameColor: "#fff",
            }}
            token={token}
            uris={trackUris.length > 0 ? trackUris : []}
          />
        ) : null}
      </div>
    </>
  );
};

export default Spotify;
