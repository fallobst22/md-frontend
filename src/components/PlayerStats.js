import React, {useEffect, useState} from "react";

import '../views/Home.css';
import DataTable, {createTheme} from "react-data-table-component";

import './PlayerStats.css';
import CustomNumberFormat from "./CustomNumberFormat";
import WinrateBar from "./WinrateBar";

createTheme('custom-dark', {
    text: {
        primary: '#FFFFFF',
        secondary: 'rgba(255, 255, 255, 0.7)',
        disabled: 'rgba(0,0,0,.12)'
    },
    background: {
        "default": '#222222'
    },
    context: {
        background: '#E91E63',
        text: '#FFFFFF'
    },
    divider: {
        "default": 'rgba(81, 81, 81, 1)'
    },
    button: {
        "default": '#FFFFFF',
        focus: 'rgba(255, 255, 255, .54)',
        hover: 'rgba(255, 255, 255, .12)',
        disabled: 'rgba(255, 255, 255, .18)'
    },
    sortFocus: {
        "default": 'rgba(255, 255, 255, .54)'
    },
    selected: {
        "default": 'rgba(0, 0, 0, .7)',
        text: '#FFFFFF'
    },
    highlightOnHover: {
        "default": 'rgba(0, 0, 0, .7)',
        text: '#FFFFFF'
    },
    striped: {
        "default": 'rgba(255, 255, 255, .1)',
        text: '#FFFFFF'
    }
});

function PlayerStats(props) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    useEffect(() => {
        fetch("/api/stats/player")
            .then((res) => {
                if (!res.ok) throw Error(res.statusText);
                return res;
            })
            .then(res => res.json())
            .then(res => {
                setData(res);
            })
            .catch(reason => {
                alert("Error loading Player Stats: " + reason)
            })
            .finally(() => setLoading(false));
    }, []);

    const columns = [
        {
            name: "Name",
            selector: "playerName",
            sortable: true,
        },
        {
            name: "WinRate",
            selector: (data) => data.wins / (data.wins + data.loses),
            sortable: true,
            sortFunction: (e1, e2) => (e1.wins / (e1.wins + e1.loses)) - (e2.wins / (e2.wins + e2.loses)),
            cell: (data) => <WinrateBar data={data}/>
        },
        {
            name: "Wins",
            selector: "wins",
            sortable: true
        },
        {
            name: "Loses",
            selector: "loses",
            sortable: true,
        },
        {
            name: "Kills",
            selector: "kills",
            sortable: true,
        },
        {
            name: "Deaths",
            selector: "deaths",
            sortable: true,
        },
        {
            name: "Assists",
            selector: "assists",
            sortable: true,
        },
        {
            name: "KDA",
            selector: (data) => ((data.kills + data.assists) / data.deaths),
            format: (data) => <CustomNumberFormat>{(data.kills + data.assists) / data.deaths}</CustomNumberFormat>,
            sortable: true
        },
        {
            name: "Total Damage",
            selector: 'damage',
            sortable: true,
            format: (data) => <CustomNumberFormat>{data.damage}</CustomNumberFormat>,
        },
        {
            name: "DMG per Min",
            selector: (data) => data.damage / (data.gameDuration / 60),
            sortable: true,
            format: (data) => <CustomNumberFormat>{data.damage / (data.gameDuration / 60)}</CustomNumberFormat>,
        },
        {
            name: "Gold per Min",
            selector: (data) => data.gold / (data.gameDuration / 60),
            sortable: true,
            format: (data) => <CustomNumberFormat>{data.gold / (data.gameDuration / 60)}</CustomNumberFormat>,
        },
        {
            name: "CS per Min",
            selector: (data) => data.cs / (data.gameDuration / 60),
            sortable: true,
            format: (data) => <CustomNumberFormat>{data.cs / (data.gameDuration / 60)}</CustomNumberFormat>,
        },
    ]

    return (
        <DataTable
            title={"Player Stats"}
            columns={columns}
            data={data}
            keyField={"name"}
            striped={true}
            dense={true}
            defaultSortField={"playerName"}
            highlightOnHover={true}
            progressPending={loading}
            theme={"custom-dark"}
            className={props.className}
        />
    );
}

export default PlayerStats