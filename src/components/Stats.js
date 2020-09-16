import React from "react";
import PlayerStats from "./PlayerStats";
import Records from "./Records";

function Stats(props) {
    return (
        <div className={props.className}>
            <PlayerStats className={"mb-3"}/>
            <Records/>
        </div>
    );
}

export default Stats;