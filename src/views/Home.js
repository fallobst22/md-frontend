import Jumbotron from "react-bootstrap/Jumbotron";
import Spotify from "../components/Spotify";
import React from "react";

import './Home.css';

function Home() {
    return (
        <div className={"home"}>
            <Jumbotron className={"header"} fluid={true}/>
            <div className={"middle-split"}>
                <iframe className={"data-frame"} title={"meissner-dev"} src={"https://meissner-dev.de/MarkusDope"}/>
                <Spotify/>
            </div>
        </div>
    );
}

export default Home