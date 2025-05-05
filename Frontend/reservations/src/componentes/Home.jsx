import React from "react";
import RoomGrid from "../pages/imagenes";
import '../stilos/home.css'
import Header from "./Headers";
import Banner from "./banner";


function Home() {

    return (
                <div>
                    
                    <Banner></Banner>
                    <RoomGrid></RoomGrid>
                </div>
    )
}

export default Home