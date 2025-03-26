import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card } from "../components/Cards.jsx"
import { HomeCard } from "../components/HomeCard.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const peopleRes = await fetch("https://www.swapi.tech/api/people");
        const peopleData = await peopleRes.json();
        const peopleList = peopleData.results.map((item) => ({
          ...item,
          type: "character",
        }));
        setCharacters(peopleList);

        const planetsRes = await fetch("https://www.swapi.tech/api/planets");
        const planetsData = await planetsRes.json();
        const planetsList = planetsData.results?.slice(1).map((item) => ({
          ...item,
          type: "planet",
        }));
        setPlanets(planetsList);

        const vehiclesRes = await fetch("https://www.swapi.tech/api/vehicles");
        const vehiclesData = await vehiclesRes.json();
        const vehiclesList = vehiclesData.results.map((item) => ({
          ...item,
          type: "vehicle",
        }));
        setVehicles(vehiclesList);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const allItems = [...characters, ...planets, ...vehicles];

    if (!search) {
      setFilteredItems([]);
    } else {
      setFilteredItems(
        allItems.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, characters, planets, vehicles]);

  return (
    <div className="text-center pt-5" style={{ height: "275vh", width: "100vw", backgroundColor: "#01040A" }}>
      {loading ? (
        <div className="text-light d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
			<div className="star-wars-loader">
				<div className="loader"></div>
				<p className="loading-text">May the Force be with you!</p>
			</div>
        </div>
      ) : (
        <>
          <div>
            <HomeCard />
          </div>
          <form className="d-flex col-12 justify-content-center mt-5 pt-5 flex-column">
            <div className="d-flex flex-row justify-content-center">
              <input
                className="form-control me-2 d-flex"
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "50vw" }}
                type="search"
                placeholder="Characters, planets or vehicles..."
                aria-label="Search"
              />
            </div>
            {filteredItems.length > 0 && (
              <div className="col-10 container-fluid mt-5 scroll-container" style={{ maxHeight: "29vh" }}>
                <ul className="text-light mt-3 d-flex flex-row gap-3 flex-nowrap">
                  {filteredItems.map((item) => (
                    <Link to={`/${item.type}/${item.uid}`} key={item.uid} style={{ textDecoration: "none" }}>
                      <Card title={item.name} id={item.uid} type={item.type} />
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </form>

          <div id="characters" className="mt-5 d-flex flex-column">
            <div className="col-10 container-fluid mt-5 scroll-container" style={{ maxHeight: "35vh" }}>
              <div className="d-flex gap-3 flex-nowrap">
                {characters.map((char) => (
                  <Link to={`/character/${char.uid}`} key={char.uid} style={{ textDecoration: "none" }}>
                    <Card title={char.name} id={char.uid} type="character" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div id="planets" className="mt-5">
            <h1 className="text-light">Planets</h1>
            <div className="col-10 container-fluid mt-5 scroll-container" style={{ maxHeight: "35vh" }}>
              <div className="d-flex gap-3 flex-nowrap">
                {planets.map((planet) => (
                  <Link to={`/planet/${planet.uid}`} key={planet.uid} style={{ textDecoration: "none" }}>
                    <Card title={planet.name} id={planet.uid} type="planet" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div id="vehicles" className="mt-5">
            <h1 className="text-light">Vehicles</h1>
            <div className="col-10 container-fluid mt-5 scroll-container" style={{ maxHeight: "35vh" }}>
              <div className="d-flex gap-3 flex-nowrap">
                {vehicles.map((vehicle) => (
                  <Link to={`/vehicle/${vehicle.uid}`} key={vehicle.uid} style={{ textDecoration: "none" }}>
                    <Card title={vehicle.name} id={vehicle.uid} type="vehicle" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
