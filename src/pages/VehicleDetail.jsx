import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const VehicleDetail = () => {
    const { id } = useParams()
    const [vehicle, setVehicle] = useState(null)

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/vehicles/${id}`)
            .then((res) => res.json())
            .then((data) => setVehicle(data.result.properties))
            .catch((error) => console.error("Error fetching vehicle:", error));
    }, [id]);

    if (!vehicle) 
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", width: "100vw", backgroundColor: "#01040A" }}>
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );

    return (
        <div className="col-12 container-fluid d-flex justify-content-center align-items-center" style={{width:"100vw", backgroundColor:"#01040A", paddingTop:"70px", height:""}}>
            <div className="charBox text-light d-flex justify-content-center align-items-center flex-row" style={{height:"75vh", width:"75vw"}}>
                <div className="pe-5">
                    <img 
                        className="rounded-2 img-fluid" 
                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/vehicles/${id}.jpg`} 
                        alt={vehicle.name} 
                        style={{ maxHeight: "400px", maxWidth: "100%", objectFit: "cover" }}
                    />
                </div>
                <div className="rounded-2" style={{height:"400px", width:"290px", backgroundColor:"#241818"}}>
                    <div className="d-flex mt-4 ms-3">
                        <h2>{vehicle.name}</h2>
                    </div>
                    <div className="d-flex mt-5 ms-3 flex-column" style={{fontSize:"1.2em"}}>
                        <p>Capacity: {vehicle.cargo_capacity}</p>
                        <p>Class: {vehicle.vehicle_class}</p>
                        <p>Manufacturer: {vehicle.manufacturer}</p>
                        <p>Consumables: {vehicle.consumables}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};