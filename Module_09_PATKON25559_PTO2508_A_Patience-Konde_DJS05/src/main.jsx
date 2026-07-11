import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { PodcastProvider } from "./context/PodcastContext";
import { ThemeProvider } from "./context/ThemeContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AudioProvider } from "./context/AudioContext";

ReactDOM.createRoot(document.getElementById("root")).render(
 <BrowserRouter>
  <ThemeProvider>
    <FavoritesProvider>
      <AudioProvider>
        <App />
      </AudioProvider>
    </FavoritesProvider>
  </ThemeProvider>
</BrowserRouter>
);