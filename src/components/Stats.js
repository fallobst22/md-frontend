import React from "react";
import PlayerStats from "./PlayerStats";

function Stats(props) {
    return (
        <div className={props.className}>
            <PlayerStats/>
        </div>
    );
}

export default Stats;