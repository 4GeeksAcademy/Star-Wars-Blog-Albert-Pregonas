import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React from "react";

export const Card = ({ title, id, type }) => {
  const { store, dispatch } = useGlobalReducer();
  
  const isFavorite = store.favorites.some((fav) => fav.id === id && fav.type === type);

  const handleFavorite = (event) => {
    event.preventDefault();

    dispatch({
      type: "toggle_favorite",
      payload: { id, title, type },
    });
  };

  return (
    <div 
      className="card position-relative" 
      style={{ width: "18rem", height: "350px", overflow: "hidden", border: "none" }} 
    >
      <img 
        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${type}s/${id}.jpg`} 
        className="card-img" 
        alt={title} 
        style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }} 
      />

      <div 
        className="position-absolute w-100 d-flex justify-content-between align-items-center px-3" 
        style={{ 
          bottom: "0px", 
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          height: "70px",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
        }}
      >
        <h5 className="text-light m-0">{title}</h5>
        
        <i 
          className={isFavorite ? "fa-solid fa-heart text-light" : "fa-regular fa-heart text-light"} 
          style={{ fontSize: "1.5em", cursor: "pointer" }} 
          onClick={handleFavorite}
        ></i>
      </div>
    </div>
  );
};