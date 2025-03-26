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
        <div className="col-12 container-fluid d-flex justify-content-center align-items-center" style={{ width: "100vw", backgroundColor: "#01040A", paddingTop: "70px" }}>
            <div className="charBox text-light d-flex justify-content-center align-items-center flex-row" style={{ height: "75vh", width: "75vw" }}>

                <div className="contBox d-flex align-items-center justify-content-center position-relative" 
                    style={{ height: "550px", width: "430px", overflow: "hidden" }}>

                    <img 
                        className="img-fluid" 
                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/vehicles/${id}.jpg`} 
                        alt={vehicle.name} 
                        style={{ height: "500px", width: "375px", objectFit: "cover" }}
                    />

                    <div className="d-flex justify-content-center align-items-center text-dark position-absolute w-100" 
                        style={{ height: "70px", bottom: "0", backgroundColor:"#001427" }}>
                        <h2 className="m-0 text-light">{vehicle.name}</h2>
                    </div>
                </div>

                <div className="contBox d-flex align-items-center justify-content-center ms-4" style={{ height: "550px", width: "430px", objectFit: "cover" }}>
                <div className="" style={{ height: "500px", width: "375px", backgroundColor:"#001427" }}>
                    <div className="d-flex mt-5 ms-5 me-5 flex-column" style={{ fontSize: "1.2em" }}>
                        <p>{
                        vehicle.name} is equipped with {vehicle.consumables} of consumables, has a cargo capacity of {vehicle.cargo_capacity}, and can carry {vehicle.passengers} 
                        passengers. It boasts a maximum atmospheric speed of {vehicle.max_atmosphering_speed} and requires a crew of {vehicle.crew}. Measuring {vehicle.length} 
                        meters in length, it costs {vehicle.cost_in_credit} credits. Manufactured by {vehicle.manufacturer}, it belongs to the {vehicle.vehicle_class} class.
                        </p>
                    </div>
                </div>
                </div>

            </div>
        </div>
    );
};

