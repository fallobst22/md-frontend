import React from "react";

import './Home.css';
import Stats from "../components/Stats";

function Home() {
    return (
        <div className={"home"}>
            <div className={"header"}/>
            <Stats className={"flex-grow-1"}/>
        </div>
    );
}

export default Home