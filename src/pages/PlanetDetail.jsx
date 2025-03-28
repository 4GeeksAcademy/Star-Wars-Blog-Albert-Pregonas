import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import gif1 from "../assets/img/568b078c8c3f9-unscreen.gif";
import gif2 from "../assets/img/568b078c63ff1-unscreen.gif";
import gif3 from "../assets/img/568b078ca42f1-unscreen.gif";

export const PlanetDetail = () => {
    const { id } = useParams();
    const [planet, setPlanet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [gifIndex, setGifIndex] = useState(0);

    const gifs = [
        { src: gif1 },
        { src: gif2 },
        { src: gif3 }
    ];

    const planetBack = {
        "Alderaan": "https://pbs.twimg.com/media/GUYfp4KXoAAT731.jpg:large",
        "Yavin IV": "https://external-preview.redd.it/orCZliSSmzm_MwSNbP_vDvTqmo1JYu7fb5C55wMJRiQ.jpg?width=1080&crop=smart&auto=webp&s=3e6ac76d028a6af6abd86d9314333e7cee0ec5f8",
        "Hoth": "https://external-preview.redd.it/x2DRpG2B0skIV9waIBRiOOiVQ5itQZa1wKBAmYsQIGw.jpg?auto=webp&s=1d1d800019974dc5df99a81a135a929765294744",
        "Dagobah": "https://wallpapers.com/images/hd/dagobah-1785-x-1013-wallpaper-xhn2loaetyrvrur6.jpg",
        "Bespin": "https://external-preview.redd.it/D8DR-A3DIl7-D66jEHwUZqj7mpvbhcpd3ifNSdFBKXI.jpg?auto=webp&s=90f0db455312e0a8087a2ad0e089a547e8da711a",
        "Endor": "https://wallpapers.com/images/hd/fondode-pantalla-endor-en-1920-x-1080-zd6ine5r60f7kepz.jpg",
        "Naboo": "https://wallpapers.com/images/hd/naboo-1920-x-816-wallpaper-utcjit70zcwimigf.jpg",
        "Coruscant": "https://wallpapers.com/images/hd/coruscant-1680-x-1011-wallpaper-69xfj1qq0r6u126t.jpg",
        "Kamino": "https://wallpapers.com/images/hd/kamino-1920-x-1080-wallpaper-pxaxgs3b6afy5ik8.jpg"
    }

    const backImg = planetBack[planet?.name] || planetBack["default"];

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * gifs.length);
        setGifIndex(randomIndex);

        fetch(`https://www.swapi.tech/api/planets/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPlanet(data.result.properties);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching planet:", error);
                setLoading(false);
            });
    }, [id]);
    
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", width: "100vw", backgroundColor: "#01040A", paddingBottom: "30vh" }}>
                <div className="star-wars-loader">
                    <img
                        src={gifs[gifIndex].src}
                        alt="Loading..."
                        style={{ width: "350px", height: "auto", paddingBottom: "130px", paddingLeft: "20px" }}
                        className="position-fixed"
                    />
                    <p className="loading-text mt-5 pt-2" style={{ fontFamily: "Pixelify Sans" }}>May the Force be with you!</p>
                </div>
            </div>
        );
    }

        return (
            <div className="col-12 container-fluid d-flex justify-content-center align-items-center" style={{ width: "100vw", backgroundColor: "#01040A", paddingTop: "70px" }}>
                <div className="charBox text-light d-flex justify-content-start align-items-center" style={{ height: "75vh", width: "75vw", backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), 
                      url('${backImg}')`}}>
    
                    <div className="contBox col-4 d-flex align-items-start flex-column">
                            <h2 className="ms-5 mb-5 text-light">{planet.name}</h2>
                            <p className="ms-5">
                                {planet.name} has a diameter of {planet.diameter} kilometers, with a {planet.climate} climate and a population of {planet.population}. Its terrain is {planet.terrain},
                                and {planet.surface_water} of its surface is covered in water. With a rotation period of {planet.rotation_period} hours and an orbital period of {planet.orbital_period} 
                                days, its gravity is {planet.gravity}, influencing everything that lives on its surface.
                            </p>
                    </div>
                </div>
            </div>
        );
    };

