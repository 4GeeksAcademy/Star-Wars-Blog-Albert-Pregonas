import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  const [gifIndex, setGifIndex] = useState(0);

  const gifs = [
    { src:'src/assets/img/568b078c8c3f9-unscreen.gif'},
    { src: "src/assets/img/568b078c63ff1-unscreen.gif"},
    { src: "src/assets/img/568b078ca42f1-unscreen.gif"},
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * gifs.length);
    setGifIndex(randomIndex);

    setLoading(false);
  }, []);

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
        <div className="text-light d-flex justify-content-center align-items-center" style={{ height: "100vh", paddingBottom:"20vh" }}>
			<div className="star-wars-loader">
      <img
            src={gifs[gifIndex].src}
            alt="Loading..."
            style={{ width: "350px", height: "auto", paddingBottom:"130px", paddingLeft:"20px"}}
            className="position-fixed"
          />
				<p className="loading-text mt-5 pt-2" style={{fontFamily:"Pixelify Sans"}}>May the Force be with you!</p>
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
              <div className="col-10 container-fluid mt-5 scroll-container" style={{ maxHeight: "420px" }}>
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
            <div className="col-10 container-fluid mt-5 scroll-container" style={{ maxHeight: "420px" }}>
              <Swiper
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                style={{maxWidth:"1500px"}}
              >
                {characters.map((char) => (
                  <SwiperSlide key={char.uid}>
                    <Link to={`/character/${char.uid}`} style={{ textDecoration: "none" }}>
                      <Card title={char.name} id={char.uid} type="character" />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          
          <div id="planets" className="mt-5">
            <h1 className="text-light">Planets</h1>
            <div className="col-10 container-fluid mt-5 scroll-container f" style={{ maxHeight: "420px" }}>
            <Swiper
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                style={{maxWidth:"1500px"}}
              >
                {planets.map((planet) => (
                  <SwiperSlide key={planet.uid}>
                    <Link to={`/planets/${planet.uid}`} style={{ textDecoration: "none" }}>
                      <Card title={planet.name} id={planet.uid} type="planet" />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div id="vehicles" className="mt-5">
            <h1 className="text-light">Vehicles</h1>
            <div className="col-10 container-fluid mt-5 scroll-container" style={{ maxHeight: "420px" }}>
              <Swiper
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                style={{maxWidth:"1500px"}}
              >
                {vehicles.map((vehicle) => (
                  <SwiperSlide key={vehicle.uid}>
                    <Link to={`/vehicles/${vehicle.uid}`} style={{ textDecoration: "none" }}>
                      <Card title={vehicle.name} id={vehicle.uid} type="vehicle" />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
