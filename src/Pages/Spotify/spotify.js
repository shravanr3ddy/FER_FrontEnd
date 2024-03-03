import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import axios from "axios";
import { musicGenres } from "../../utility/constants";
import console from "node:console";

const Spotify = () => {
  const token = window.localStorage.getItem("spotify_token");

  const [categories, setCategories] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [trackUris, setTrackUris] = useState([]);
  const [trackUrl, setTrackUrl] = useState("");
  const [currentView, setCurrentView] = useState("categories");
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

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
        setCategories(response.data.categories.items);
      } catch (error) {
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
      setBreadcrumbs([{ name: categoryName, view: "categories" }]);
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
      setBreadcrumbs((prev) => [
        ...prev,
        { name: playlistName, view: "playlists" },
      ]);

    // Extract URIs from the fetched tracks and update the trackUris state
    const uris = response.data.items.map((item) => item.track.uri);
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

  const clicked = (e) => {
    setIsPlaying(e.isPlaying);
  };

  const trackClicked = (uri) => {
    // Find the index of the clicked track URI in the trackUris array
  const clickedIndex = trackUris.findIndex(url => url === uri);

  // Reorder the trackUris array
  const reorderedTrackUris = [
    ...trackUris.slice(clickedIndex),    // Get all the URIs from the clicked one to the end
    ...trackUris.slice(0, clickedIndex)  // Get all the URIs that were before the clicked one
  ];

  // Update the trackUris state with the reordered array
  setTrackUris(reorderedTrackUris);

    setTrackUrl(uri);
    setIsPlaying(!isPlaying);
  };

  const breadcrums = ["Categories", "PlayLists", "Tracks"];

  return (
    <>
      <div className="container">
        {breadcrumbs.map((crumb, index) => (
          <span key={index} onClick={() => handleBreadcrumbClick(crumb.view)}>
            {breadcrums[index]} {">"}
          </span>
        ))}
      </div>
      {currentView === "categories" && (
        <div className="spotify-playlists">
          <h1>Spotify Music Categories</h1>
          <ul>
            <div className="list">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {categories.map((category) => {
                  return (
                    <div
                      key={category.id}
                      className="col-2 mb-4"
                      onClick={() => fetchPlaylists(category.id, category.name)}
                    >
                      <div className="item">
                        <img src={`${category.icons[0].url}`} />
                        <div className="play">
                          <span className="fa fa-play"></span>
                        </div>
                        <h4>{category.name}</h4>
                        <p>
                          {musicGenres[category.name]?.description?.replace(
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
        <div className="spotify-playlists">
          <h2>Playlists</h2>
          <ul>
            <div className="list">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {playlists.map((playlist) => {
                  return (
                    <div
                      key={playlist.id}
                      className="col-2 mb-4"
                      onClick={() => fetchTracks(playlist.id, playlist.name)}
                    >
                      <div className="item">
                        <img src={`${playlist.images[0].url}`} />
                        <div className="play">
                          <span className="fa fa-play"></span>
                        </div>
                        <h4> {playlist.name}</h4>
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
        <div className="spotify-playlists">
          <h3>Tracks</h3>
          <ul>
            <div className="list">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {tracks.map((trackItem, index) => {
                  return (
                    <div
                      key={index}
                      className="col-2 mb-4">
                      <div className="item" onClick={() => trackClicked(trackItem.track.uri)}>
                        <img src={`${trackItem.track.album.images[0].url}`} />
                        <div className={`${(trackItem.track.uri === trackUrl && isPlaying) ? "pause" : "play"}`}>
                          <span
                            className={`${
                              trackItem.track.uri === trackUrl && isPlaying
                                ? "fa fa-pause"
                                : "fa fa-play"
                            }`}
                          ></span>
                        </div>
                        <h4> {trackItem.track.name}</h4>
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
        {currentView === "tracks" && (
         <SpotifyPlayer
         callback={clicked}
         play={isPlaying}
         autoPlay={false}
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
       
        )}
      </div>
    </>
  );
};

export default Spotify;
