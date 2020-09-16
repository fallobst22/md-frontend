import Spotify from "../components/Spotify";
import React from "react";

import './Home.css';
import Stats from "../components/Stats";

function Home() {
    return (
        <div className={"home"}>
            <div className={"header"}/>
            <div className={"middle-split"}>
                <Spotify/>
                <Stats className={"flex-grow-1"}/>
            </div>
        </div>
    );
}

export default Home