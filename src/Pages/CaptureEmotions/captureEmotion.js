// Import necessary libraries and components from their respective packages
import React, { useState, useRef, useEffect} from "react";
import { FileUploader } from "react-drag-drop-files";
import Notifications from "../../Components/Notifications/notification";
// Import necessary constants from utility/constants
import {
  notificationsType,
  dismissAll,
  skeleton_loader,
} from "../../utility/constants";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
// Import CSS for the Skeleton component
import "react-loading-skeleton/dist/skeleton.css";
// Import useSelector and useDispatch from react-redux
import { useSelector, useDispatch } from "react-redux";
// Import necessary actions from trendsSlice
import {
  setMatchTrendData,
  setBase64,
  setFavTrendData,
  setInputText,
} from "../../reducers/trendsSlice";
import cloneDeep from "clone-deep";
import Webcam from "react-webcam";

// Define an array of acceptable file types for the FileUploader
const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const MatchTrends = () => {
  // Declare state variables and their setters for file, matchTrend, and inputDisable
  const [file, setFile] = useState(null);
  const [matchTrend, setMatchTrend] = useState(false);
  const [inputDisable, setInputDisable] = useState(false);

    // Declare a reference to the Webcam component
  const webcamRef = useRef(null);

      // Declare a state variable to control the visibility of the webcam
  const [showWebcam, setShowWebcam] = useState(false);

  // Retrieve necessary state variables from the Redux store
  const base64 = useSelector((state) => state.trends.base64);
  const inputText = useSelector((state) => state.trends.inputText);
  const matchtrendVal = useSelector((state) => state.trends.matchtrendVal);
  const favTrends = useSelector((state) => state.trends.favTrends);

  // Declare a state variable for loading status and its setter
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the useDispatch hook
  const dispatch = useDispatch();

    // Function to capture an image from the webcam
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setFile(imageSrc);
      dispatch(setBase64(imageSrc));
      setShowWebcam(false); // Hide the webcam after capturing the image
    }, [webcamRef, setFile]);

      // Function to toggle the webcam visibility
  const handleWebcam = () => {
    setShowWebcam(!showWebcam);
  };


  // Function to update the favorite status of a trend
  const updateFavoriteStatus = (trend, isFavorite) => {
    const newData = matchtrendVal.map((t) =>
      t.id === trend.id ? { ...t, favorite: isFavorite } : t
    );
    let favData = cloneDeep(favTrends ? favTrends : []);
    if (isFavorite) {
      favData.push(
        newData.find((t) => t.id === trend.id && t.favorite === isFavorite)
      );
      dispatch(setFavTrendData(favData));
    } else {
      const index = favData.findIndex((element) => element.id === trend.id);
      if (index >= 0) {
        favData.splice(index, 1);
        dispatch(setFavTrendData(favData));
      }
    }
    dispatch(setMatchTrendData(newData));
  };

  // Function to handle the click on an empty heart icon
  const emptyHeartClicked = (trend) => {
    updateFavoriteStatus(trend, true);
  };

  // Function to handle the click on a filled heart icon
  const fillHeartClicked = (trend) => {
    updateFavoriteStatus(trend, false);
  };

  // Function to convert a file to base64 format
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Function to handle the file change event
  const handleChange = async (f) => {
      
    setFile(f);
    dispatch(setBase64(await toBase64(f)));
  };

  // Function to handle the match trend button click
  const matchTrendClicked = async () => {
    if (base64 != null && inputText.length !== 0) {
      setIsLoading(true);
      dismissAll();

      // Create a FormData object and append the necessary data
      const bodyFormData = new FormData();
      bodyFormData.append("file", file);
      bodyFormData.append("text", inputText);

      try {
        // Send a POST request to the backend
        const response = await axios({
          method: "post",
          url: "https://www.fashiontrendcheck.com/findrelativeimages",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: bodyFormData,
        });

        const resultTrends = response.data;
        const trendList = await getTrendList(resultTrends);
        if (trendList.length > 0) {
          setIsLoading(false);
          dispatch(setMatchTrendData(trendList));
          setInputDisable(true);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      Notifications({
        type: notificationsType.ERROR,
        message: `Please select or upload an image and enter text to capture your emotion.`,
      });
    }
  };

  // Function to generate a trend list from the API response
  const getTrendList = async (resultTrends) => {

  };

  // Function to reset the trend state variables and dispatch actions
  const resetTrend = () => {
    dispatch(setBase64(null));
    setFile(null);
    setMatchTrend(false);
    dispatch(setInputText(""));
    setIsLoading(false);
    dispatch(setMatchTrendData(null));
    setInputDisable(false);
    setShowWebcam(false);
    dismissAll();
  };

  useEffect(() => {
    // Dynamically load the Spotify Web Playback SDK
    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://sdk.scdn.co/spotify-player.js';
    scriptTag.async = true;
    
    document.body.appendChild(scriptTag);
    
    window.onSpotifyWebPlaybackSDKReady = () => {
      // Your player initialization code here
      const token = '7fd7f9c6c9584290b8889ae117a3c12d'; // Replace with your access token
      const player = new window.Spotify.Player({
        name: 'medoly_mood',
        getOAuthToken: cb => { cb(token); }
      });
      // Connect to the player!
      player.connect();

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });
      
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });
      
      player.addListener('player_state_changed', (state) => {
        console.log('Player state changed:', state);
      });
      
      player.addListener('initialization_error', ({ message }) => {
        console.error('Initialization error:', message);
      });
      
      player.addListener('authentication_error', ({ message }) => {
        console.error('Authentication error:', message);
      });
      
      player.addListener('account_error', ({ message }) => {
        console.error('Account error:', message);
      });
      
      player.addListener('playback_error', ({ message }) => {
        console.error('Playback error:', message);
      });
      
    };

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  // Return the JSX structure for rendering the MatchTrends component
  return (
    <>
      {base64 != null ? (
        // If base64 image data is available, display the image and input field
        <div className="drag_drop">
          <img className="CAPTURE_EMOTIONS_img" alt="tred_match_img" src={base64} />
        </div>
      ) : 
      showWebcam ? (
        <div className="drag_drop webcam-container">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
          />
          <div>
          <button onClick={capture} className="btn custom_primary_color btn-lg">
            Capture
          </button>
          </div>
        </div>
      ) : 
      (
        // If base64 image data is not available, display the file uploader and input field
        <div className="drag_drop">
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
        </div>
      )}
    
      {/* // Render Match Trend and Reset buttons */}
      <div className="container d-flex justify-content-center mb-5 mt-5">
        <button
          className="btn custom_primary_color btn-lg"
          style={{ marginRight: 10 }}
          onClick={handleWebcam}
        >
          Capture Emotion
        </button>
        <button
          className="btn custom_primary_color btn-lg"
          style={{ marginRight: 10 }}
          onClick={matchTrendClicked}
        >
          Upload a Image
        </button>
        <button
          className="btn custom_primary_color btn-lg"
          style={{ marginLeft: 10 }}
          onClick={resetTrend}
        >
          Reset
        </button>
      </div>
      {/* // Render the matched trend cards or loading skeletons */}
      <div className="container mt-5 mb-5">
        <div className="row">
          {isLoading ? (
            <div className="col-md-3 col-sm-4 mb-4 item d-flex">
              {skeleton_loader.map((skeleton, i) => {
                return (
                  <Skeleton
                    key={i}
                    style={{ height: 250, width: 250, marginLeft: 15 }}
                  />
                );
              })}
            </div>
          ) : (
            matchtrendVal?.map((trend, i) => {
              return (
                <div className="col-md-3 col-sm-4 mb-4 item" key={i}>
                  <div className="card item-card card-block trend_card">
                    <img src={trend.img} alt="Photo of sunset" />
                    <div className={"trend_card_body"}>
                      <h5 className="item-card-title mt-3 mb-3">
                        {trend.title}
                      </h5>
                      <div className="d-flex justify-content-between">
                      <p className="card-text">{trend.price}</p>
                      {trend.favorite ? (
                        <img
                          src={"img/icons8-heart-ios-16-glyph/icons8-heart-90.png"}
                          className="react-icon heart-react-icon"
                          onClick={() => fillHeartClicked(trend)}
                        />
                      ) : (
                        <img
                          src={"img/icons8-favorite-ios-16-glyph/icons8-favorite-90.png"}
                          className="react-icon"
                          onClick={() => emptyHeartClicked(trend)}
                        />
                      )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

// Export the MatchTrends component
export default MatchTrends;
