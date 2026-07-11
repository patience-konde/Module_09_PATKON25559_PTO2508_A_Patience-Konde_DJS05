import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { PodcastProvider } from "./context/PodcastContext";
import { ThemeProvider } from "./context/ThemeContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AudioProvider } from "./context/AudioContext";

import { genres } from "./data";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>

    <ThemeProvider>

      <FavoritesProvider>

        <AudioProvider>

          <PodcastProvider
            initialPodcasts={[]}
            loading={false}
            error={null}
            genres={genres}
          >

            <App />

          </PodcastProvider>

        </AudioProvider>

      </FavoritesProvider>

    </ThemeProvider>

  </BrowserRouter>
);