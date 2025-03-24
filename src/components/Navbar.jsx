import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleFavoriteToggle = (fav) => {
    dispatch({
      type: "toggle_favorite",
      payload: fav,
    });
  };

  console.log("Store Favorites:", store.favorites);

  return (
    <nav className="navbar navbar-light d-flex justify-content-center align-items-center">
      <div className="d-flex align-items-center col-9 justify-content-between">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Star_Wars_Logo..png/640px-Star_Wars_Logo..png" alt="Star_Wars" style={{ width: "7vw" }} />
          </span>
        </Link>
        <div className="ps-5 pe-5 d-flex">
          <Link to="/" className="pe-5 pt-3 text-light" style={{ textDecoration: "none", fontSize: "1.1em" }}>
            <p>Characters</p>
          </Link>
          <Link to="/" className="pt-3 pe-5 text-light" style={{ textDecoration: "none", fontSize: "1.1em" }}>
            <p>Planets</p>
          </Link>
          <Link to="/" className="pt-3 pe-5 text-light" style={{ textDecoration: "none", fontSize: "1.1em" }}>
            <p>Vehicles</p>
          </Link>

          <div className="position-relative pt-3">
            <i className="fa-solid fa-heart text-light" style={{ fontSize: "1.5em", cursor: "pointer" }} onClick={() => setShowDropdown(!showDropdown)}></i>

            {showDropdown && (
              <div className="position-absolute bg-dark text-light p-3 mt-4 rounded" style={{ top: "2rem", right: "0", minWidth: "200px", zIndex: 1000 }}>
                {store.favorites.length > 0 ? (
                  store.favorites.map((fav) => (
                    <div key={fav.id} className="d-flex justify-content-between align-items-center">
                      <Link to={`/${fav.type}/${fav.id}`} className="d-block text-light text-decoration-none">
                        {fav.title ? fav.title : "Unknown"}
                      </Link>
                      <button
                        className="btn btn-dark btn-sm"
                        onClick={() => handleFavoriteToggle(fav)}
                        style={{ fontSize: "0.8em" }}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted text-light">No favorites yet</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
