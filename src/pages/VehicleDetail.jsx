import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import gif1 from "../assets/img/568b078c8c3f9-unscreen.gif";
import gif2 from "../assets/img/568b078c63ff1-unscreen.gif";
import gif3 from "../assets/img/568b078ca42f1-unscreen.gif";

export const VehicleDetail = () => {
    const { id } = useParams()
    const [vehicle, setVehicle] = useState(null)
    const [loading, setLoading] = useState(true);
    const [gifIndex, setGifIndex] = useState(0);

    const gifs = [
        { src: gif1 },
        { src: gif2 },
        { src: gif3 }
    ];

    const vehicleBack = {
        "Sand Crawler": "https://cdna.artstation.com/p/assets/images/images/002/550/442/large/pablo-carpio-sandcrawler.jpg?1462997825",
        "X-34 landspeeder": "https://lumiere-a.akamaihd.net/v1/images/E4D_IA_1136_6b8704fa.jpeg?region=237%2C0%2C1456%2C819",
        "T-16 skyhopper": "https://images4.alphacoders.com/887/887792.jpg",
        "TIE/LN starfighter": "https://cdna.artstation.com/p/assets/images/images/027/630/946/large/donny-versiga-sw-tie-fighter-01.jpg?1592089296",
        "Snowspeeder": "https://i.redd.it/4tzde0thij071.jpg",
        "AT-AT": "https://external-preview.redd.it/GlvWsksORn1C6Iia-Rc2YXWHf99o29OkgBtBvHYDv3U.jpg?auto=webp&s=13b74c4241a13181be6f6678325ec1617088ea80",
        "TIE bomber": "https://c4.wallpaperflare.com/wallpaper/878/210/408/artwork-darek-zabrocki-star-wars-galactic-empire-wallpaper-preview.jpg",
        "AT-ST": "https://wallpapercave.com/wp/wp7747921.jpg",
        "Storm IV Twin-Pod cloud car": "https://cdnb.artstation.com/p/assets/images/images/070/431/969/large/christina-spicer-render-3.jpg?1702508185",
        "Sail barge": "https://cdnb.artstation.com/p/assets/images/images/040/093/561/large/charles-hakes-aslsb1.jpg?1627849728"
    }

    const backImg = vehicleBack[vehicle?.name] || vehicleBack["default"];


    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * gifs.length);
        setGifIndex(randomIndex);

        fetch(`https://www.swapi.tech/api/vehicles/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setVehicle(data.result.properties);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching vehicle:", error);
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
                            <h2 className="ms-5 mb-5 text-light">{vehicle.name}</h2>
                            <p className="ms-5">
                                {vehicle.name} is equipped with {vehicle.consumables} of consumables, has a cargo capacity of {vehicle.cargo_capacity}, and can carry {vehicle.passengers} 
                                passengers. It boasts a maximum atmospheric speed of {vehicle.max_atmosphering_speed} and requires a crew of {vehicle.crew}. Measuring {vehicle.length} 
                                meters in length, it costs {vehicle.cost_in_credit} credits. Manufactured by {vehicle.manufacturer}, it belongs to the {vehicle.vehicle_class} class.
                            </p>
                    </div>
                </div>
            </div>
        );
    };


