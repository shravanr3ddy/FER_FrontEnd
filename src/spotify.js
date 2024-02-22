import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "3497491b9d854b62a4ab62c97d061acc";
const redirectUri = "http://localhost:3000";
const scopes = [
    "streaming",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-email",
    "user-read-private",
    // add other necessary scopes for your application
];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;


const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;