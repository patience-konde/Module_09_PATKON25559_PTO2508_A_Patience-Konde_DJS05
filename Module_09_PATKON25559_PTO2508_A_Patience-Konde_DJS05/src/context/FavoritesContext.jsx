import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");

    return savedFavorites
      ? JSON.parse(savedFavorites)
      : [];
  });

  // Save favorites whenever they change
  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  // Add podcast to favorites
  const addFavorite = (podcast) => {
    setFavorites((previousFavorites) => {
      const exists = previousFavorites.some(
        (item) => item.id === podcast.id
      );

      if (exists) {
        return previousFavorites;
      }

      return [...previousFavorites, podcast];
    });
  };

  // Remove podcast from favorites
  const removeFavorite = (id) => {
    setFavorites((previousFavorites) =>
      previousFavorites.filter(
        (podcast) => podcast.id !== id
      )
    );
  };

  // Check if podcast is favorite
  const isFavorite = (id) => {
    return favorites.some(
      (podcast) => podcast.id === id
    );
  };

  // Toggle favorite
  const toggleFavorite = (podcast) => {
    if (isFavorite(podcast.id)) {
      removeFavorite(podcast.id);
    } else {
      addFavorite(podcast);
    }
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside a FavoritesProvider"
    );
  }

  return context;
}