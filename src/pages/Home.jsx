import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card } from "../components/Cards.jsx"
import { HomeCard } from "../components/HomeCard.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()
  const [characters, setCharacters] = useState([])
  const [planets, setPlanets] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] =  useState(true)

  useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);

            const peopleRes = await fetch("https://www.swapi.tech/api/people");
            const peopleData = await peopleRes.json();
            setCharacters(peopleData.results);

            const planetsRes = await fetch("https://www.swapi.tech/api/planets");
            const planetsData = await planetsRes.json();
            setPlanets(planetsData.results?.slice(1));

            const vehiclesRes = await fetch("https://www.swapi.tech/api/vehicles");
            const vehiclesData = await vehiclesRes.json();
            setVehicles(vehiclesData.results);

            setLoading(false);
        } catch (err) {
            console.error("Error fetching data:", err);
            setLoading(false);
        }
    };

		fetchData();
	}, []);

	return (
		<div className="text-center pt-5" style={{ height: "275vh", width: "100vw", backgroundColor: "#01040A" }}>
			{loading ? (
				<div className="text-light d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
					<div class="spinner-border text-warning" role="status">
  					<span class="sr-only">Loading...</span>
					</div>
				</div>
			) : (
				<>
					<div>
						<HomeCard />
					</div>
					<div id="characters" className="mt-5 d-flex flex-column">
						<div className="col-10 container-fluid mt-5 scroll-container" style={{ maxHeight: "85vh" }}>
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
						<div className="col-10 container-fluid mt-5 scroll-container" style={{ maxHeight: "85vh" }}>
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
						<div className="col-10 container-fluid mt-5 scroll-container" style={{ maxHeight: "85vh" }}>
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
