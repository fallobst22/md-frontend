import CustomNumberFormat from "./CustomNumberFormat";
import {ProgressBar} from "react-bootstrap";
import React from "react";

import './WinrateBar.css';

function WinrateBar(props) {
    const data = props.data;
    const winrate = data.wins / (data.wins + data.loses);

    return (
        <ProgressBar className={"winrate-bar"} title={(winrate * 100).toFixed(2) + '%'}>
            <ProgressBar
                variant="success"
                now={winrate * 100}
            />
            <ProgressBar
                variant="danger"
                now={(1 - winrate) * 100}
            />
            <div className={"winrate-label"}>
                <CustomNumberFormat suffix={"%"}>{winrate * 100}</CustomNumberFormat>
            </div>
        </ProgressBar>
    );
}

export default WinrateBar;