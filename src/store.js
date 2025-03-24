export const initialStore = () => {
  return {
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "toggle_favorite":
      const { id, title, type } = action.payload;
      const isFavorite = store.favorites.some((fav) => fav.id === id && fav.type === type);

      const updatedFavorites = isFavorite ? store.favorites.filter((fav) => !(fav.id === id && fav.type === type)) : [...store.favorites, { id, title, type }];

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return {
        ...store,
        favorites: updatedFavorites,
      };

    default:
      throw Error("Unknown action.");
  }
}


