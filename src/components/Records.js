import React, {useEffect, useState} from "react";
import CardDeck from 'react-bootstrap/CardDeck';

import './Records.css';
import Card from "react-bootstrap/Card";
import CustomNumberFormat from "./CustomNumberFormat";

const titlemappings = {
    kills: "Highest Kills",
    cs: "Highest CS",
    kda: "Highest KDA",
    gold: "Highest Gold",
    assists: "Highest Assists",
    deaths: "Highest Deaths"
}

const lanemappings = {
    "JUNGLE": "Jungle",
    "BOTTOM": "Botlane",
    "BOT": "Botlane",
    "TOP": "Toplane",
    "MID": "Midlane",
    "MIDDLE": "Midlane",
}

function Records(props) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        fetch("/api/stats/records")
            .then((res) => {
                if (!res.ok) throw Error(res.statusText);
                return res;
            })
            .then(res => res.json())
            .then(res => {
                setData(res.records);
            })
            .catch(reason => {
                alert("Error loading Records: " + reason)
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null;

    let rows = [];
    let entries = Object.entries(data);

    while (entries.length) {
        rows.push(entries.splice(0, 4));
    }

    return rows.map((row, index) =>
        <CardDeck key={index} className={"m-1 mb-4"}>
            {row.map(record => <Record key={record[0]} data={record}/>)}
        </CardDeck>
    );
}

function Record(props) {
    const [key, record] = props.data;

    return (
        <Card>
            <Card.Header>{titlemappings.hasOwnProperty(key) ? titlemappings[key] : key}</Card.Header>
            <Card.Body>
                {record.map(data => <RecordEntry key={data.matchId + data.player} {...data} />)}
            </Card.Body>
        </Card>
    );
}

function RecordEntry(props) {

    const value =
        <span className={"recordValue"}>
            {isNaN(props.value) ?
                props.value :
                <CustomNumberFormat>{props.value}</CustomNumberFormat>
            }
        </span>
    ;

    return (
        <div>
            [{lanemappings[props.lane] || props.lane}]&nbsp;
            {props.player} auf {props.champion}:&nbsp;
            {value}
        </div>
    );
}

export default Records;