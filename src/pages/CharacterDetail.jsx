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
                <div className="pe-5">
                    <img 
                        className="rounded-2 img-fluid" 
                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${id}.jpg`} 
                        alt={character.name} 
                        style={{ maxHeight: "400px", maxWidth: "100%", objectFit: "cover" }}
                    />
                </div>
                <div className="rounded-2" style={{ height: "400px", width: "290px", backgroundColor: "#241818" }}>
                    <div className="d-flex mt-4 justify-content-center">
                        <h2>{character.name}</h2>
                    </div>
                    <div className="d-flex mt-5 ms-3 flex-column" style={{ fontSize: "1.2em" }}>
                        <p>Height: {character.height}</p>
                        <p>Mass: {character.mass}</p>
                        <p>Birth Year: {character.birth_year}</p>
                        <p>Gender: {character.gender}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};