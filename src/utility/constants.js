import { toast } from "react-toastify";

export const ROUTE_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  CAPTURE_EMOTIONS: "/cature_emotions",
  CURRENT_MATCH: "/trends_match",
  FAVOURITES: "/favourites",
  ABOUT_US: "/about",
  CONTACT: "/contact",
  LOGOUT: "/logout",
  SPOTIFY_AUTH: "/spotify_auth",
  SPOTIFY: "/spotify",
};

export const notificationsType = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  WARNING: "WARNING",
  INFORAMTION: "INFORMATION",
};

const musicMoods = {
  sad: ["Pop", "Disco", "Workout", "Dance/Electronic", "Indie"],
  happy: ["Disney", "Spotify CLASSICS", "GLOW", "New Releases", "Discover"],
  angry: ["R&B", "Mood", "Rock", "Francophone", "K-pop"],
};

export const musicGenres = {
  Pop: {
    mood: "sad",
    description: "Uplifting and mainstream hits to lighten your mood.",
  },
  Disco: {
    mood: "sad",
    description: "Energetic dance tunes to get you moving.",
  },
  Workout: { mood: "sad", description: "High-tempo beats to pump you up." },
  "Dance/Electronic": {
    mood: "sad",
    description: "Groovy electronic vibes for a joyous escape.",
  },
  Indie: {
    mood: "sad",
    description: "Independent tracks for a soothing feel.",
  },

  Disney: { mood: "happy", description: "Magical and joyful Disney classics." },
  "Spotify CLASSICS": {
    mood: "happy",
    description: "Timeless music pieces to enjoy your happy moments.",
  },
  GLOW: {
    mood: "happy",
    description: "Feel-good melodies to keep the smile on.",
  },
  "New Releases": {
    mood: "happy",
    description: "Explore the latest in music to stay happy and in the know.",
  },
  Discover: {
    mood: "happy",
    description: "Curated music for new delightful finds.",
  },
  Frequency: {
    mood: "happy",
    description: "Consistent electronic beats to keep your energy levels high.",
  },
  Decades: {
    mood: "happy",
    description:
      "Hit tunes from the past that bring a wave of nostalgia and joy.",
  },
  Latin: {
    mood: "happy",
    description:
      "Lively and passionate rhythms that are sure to boost your mood.",
  },

  "R&B": {
    mood: "angry",
    description: "Smooth and soulful R&B to mellow down the anger.",
  },
  Mood: {
    mood: "angry",
    description: "Music that resonates with your deeper feelings.",
  },
  Rock: {
    mood: "angry",
    description: "Hard-hitting rock to channel the intensity.",
  },
  Francophone: {
    mood: "angry",
    description: "French hits to add a different tone to your mood.",
  },
  "K-pop": {
    mood: "angry",
    description: "Energetic Korean pop to dance away the anger.",
  },
  "Hip-Hop": {
    mood: "angry",
    description:
      "Powerful and rhythmical music that can be both energetic and introspective.",
  },
};

export const dismissAll = () => toast.dismiss();

export const skeleton_loader = [1, 2, 3, 4];
