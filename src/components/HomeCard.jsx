import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const HomeCard = () => {
    return(
        <div className="homeCard container-fluid col-8 d-flex justify-content-center align-items-center rounded-2 flex-column" style={{height:"50vh"}}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Star_Wars_Logo..png/640px-Star_Wars_Logo..png" alt="Star_wars_logo" style={{height:"15vh"}}/>
            <p className="text-warning col-8 pt-5" style={{fontSize:"1.5em"}}>En una galaxia muy lejana, donde los destinos de héroes y villanos se entrelazan, surgen legendarios personajes, planetas desconocidos y 
                vehículos épicos. Este es tu portal a los secretos del universo de Star Wars, donde cada rincón guarda historias de valentía, traición y aventura.</p>
        </div>
    )
}