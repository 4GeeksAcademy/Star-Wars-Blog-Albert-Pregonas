import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import gif1 from "../assets/img/568b078c8c3f9-unscreen.gif";
import gif2 from "../assets/img/568b078c63ff1-unscreen.gif";
import gif3 from "../assets/img/568b078ca42f1-unscreen.gif";

export const CharacterDetail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [gifIndex, setGifIndex] = useState(0);

    const gifs = [
        { src: gif1 },
        { src: gif2 },
        { src: gif3 }
    ];

    const characterBack = {
        "Luke Skywalker": "https://wallpapers.com/images/hd/star-wars-luke-skywalker-4k-qmu2a4saypwlm9ui.jpg",
        "Darth Vader": "https://i.imgur.com/MhFZEBm.png",
        "Leia Organa": "https://wallpapercat.com/w/full/c/6/d/968186-1920x1200-desktop-hd-leia-organa-wallpaper-photo.jpg",
        "Obi-Wan Kenobi": "https://w0.peakpx.com/wallpaper/536/630/HD-wallpaper-obi-wan-kenobi-artwork-obi-wan-kenobi-star-wars-tv-shows-artwork-artist-artstation.jpg",
        "R2-D2": "https://i.pinimg.com/736x/c3/a7/80/c3a780163cf1b0a16d0fda255fca5d47.jpg",
        "C-3PO": "https://bkasnick.com/wp-content/uploads/2014/06/c3po-wallpaper.jpg",
        "default": "https://lumiere-a.akamaihd.net/v1/images/owen-lars-bio-4_78f896a3.jpeg?region=0%2C0%2C1280%2C720"
    }

    const backImg = characterBack[character?.name] || characterBack["default"];

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * gifs.length);
        setGifIndex(randomIndex);

        fetch(`https://www.swapi.tech/api/people/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCharacter(data.result.properties);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching character:", error);
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
                <div className="charBox text-light d-flex justify-content-start align-items-center" style={{ height: "75vh", width: "75vw", backgroundImage:`linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), 
                      url('${backImg}')`}}>
    
                    <div className="contBox col-4 d-flex align-items-start flex-column">
                            <h2 className="ms-5 mb-5 text-light">{character.name}</h2>
                            <p className="ms-5">
                                {`Este personaje es ${character.gender} con una piel de color ${character.skin_color}. 
                                Su cabello es de un tono ${character.hair_color}, y sus ojos destacan con un color ${character.eye_color}. 
                                Con una altura de ${character.height} cm y un peso de ${character.mass} kg, posee una presencia imponente en la galaxia.`}
                            </p>
                    </div>
                </div>
            </div>
        );
    };