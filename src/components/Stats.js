import React from "react";
import PlayerStats from "./PlayerStats";
import Records from "./Records";

function Stats(props) {
    return (
        <div className={props.className}>
            <Records/>
            <PlayerStats className={"mb-3"}/>
        </div>
    );
}

export default Stats;