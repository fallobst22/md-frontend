import React, {useEffect, useState} from "react";

import './Records.css';
import Card from "react-bootstrap/Card";
import CustomNumberFormat from "./CustomNumberFormat";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spinner from "react-bootstrap/Spinner";

const titlemappings = {
    loading: "Loading...",
    kills: "Highest Kills",
    cs: "Highest CS",
    kda: "Highest KDA",
    gold: "Highest Gold",
    assists: "Highest Assists",
    deaths: "Highest Deaths",
    visionScore: "Highest Vision Score",
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
    const [data, setData] = useState({
        'Loading...': []
    });

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
            });
    }, []);

    const breakpoints = [
        {
            breakpoint: 1800,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            }
        },
        {
            breakpoint: 1450,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 1100,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]

    return (
        <Slider autoplay autoplaySpeed={5000} className={"record-slider"} dots infinite={Object.keys(data).length >= 5}
                slidesToShow={5} slidesToScroll={5} responsive={breakpoints} speed={1000}>
            {Object.entries(data).map(record => <Record key={record[0]} data={record}/>)}
        </Slider>
    );
}

function Record(props) {
    const [key, record] = props.data;

    return (
        <Card className={"record-card"}>
            <Card.Header>{titlemappings.hasOwnProperty(key) ? titlemappings[key] : key}</Card.Header>
            <Card.Body className={record.length ? "" : "text-center"}>
                {record.length ?
                    record.map(data => <RecordEntry key={data.matchId + data.player} {...data} />)
                    :
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                }
            </Card.Body>
            <Card.Footer/>
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
        <span>
            [{lanemappings[props.lane] || props.lane}]&nbsp;
            {props.player} auf {props.champion}:&nbsp;
            {value}
        </span>
    );
}

export default Records;