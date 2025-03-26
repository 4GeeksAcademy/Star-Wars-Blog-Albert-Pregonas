import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const CharacterDetail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/people/${id}`)
            .then((res) => res.json())
            .then((data) => setCharacter(data.result.properties))
            .catch((error) => console.error("Error fetching character:", error));
    }, [id]);

    if (!character) 
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", width: "100vw", backgroundColor: "#01040A" }}>
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );

    return (
        <div className="col-12 container-fluid d-flex justify-content-center align-items-center" style={{ width: "100vw", backgroundColor: "#01040A", paddingTop: "70px" }}>
            <div className="charBox text-light d-flex justify-content-center align-items-center flex-row" style={{ height: "75vh", width: "75vw" }}>

                <div className="contBox d-flex align-items-center justify-content-center position-relative" 
                    style={{ height: "550px", width: "430px", overflow: "hidden" }}>

                    <img 
                        className="img-fluid" 
                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${id}.jpg`} 
                        alt={character.name} 
                        style={{ height: "500px", width: "375px", objectFit: "cover" }}
                    />

                    <div className="d-flex justify-content-center align-items-center text-dark position-absolute w-100" 
                        style={{ height: "70px", bottom: "0", backgroundColor:"#0C111F" }}>
                        <h2 className="m-0 text-light">{character.name}</h2>
                    </div>
                </div>

                <div className="contBox d-flex align-items-center justify-content-center ms-4" style={{ height: "550px", width: "430px", objectFit: "cover" }}>
                <div className="" style={{ height: "500px", width: "375px", backgroundColor:"#0C111F" }}>
                    <div className="d-flex mt-5 ms-5 me-5 flex-column" style={{ fontSize: "1.2em" }}>
                        <p>
                        {character.name} is a {character.gender} with {character.skin_color} skin and {character.hair_color} hair. Standing at {character.height} cm tall, 
                        their {character.eye_color} eyes reveal a sharp, focused demeanor. Weighing {character.mass} kg, they possess both strength and agility, making them a formidable presence in any battle.
                        </p>
                    </div>
                </div>
                </div>

            </div>
        </div>
    );
};