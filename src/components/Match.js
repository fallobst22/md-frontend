import React, {useState} from "react";

import {Col, Container, Row} from "react-bootstrap";
import Autosuggest from 'react-autosuggest';
import ChampionImage from "./ChampionImage";

import './Match.css';

function Match(props) {
    return (
        <Container fluid>
            <Row>
                <Col xs={6} className={"team blueTeam"}>
                    {props.data.blueTeam.map((participant) => <Player key={participant.participantId} data={participant}
                                                                      playerMappings={props.playerMappings}
                                                                      setPlayerMapping={props.setPlayerMapping}
                                                                      knownPlayers={props.data.knownPlayers}/>)}
                </Col>
                <Col xs={6} className={"team redTeam"}>
                    {props.data.redTeam.map((participant) => <Player key={participant.participantId} data={participant}
                                                                     playerMappings={props.playerMappings}
                                                                     setPlayerMapping={props.setPlayerMapping}
                                                                     knownPlayers={props.data.knownPlayers}/>)}
                </Col>
            </Row>
        </Container>
    );
}

function Player(props) {
    return (
        <Row>
            <Col xs={2}><ChampionImage championId={props.data.championId}/></Col>
            <Col className={"playerInputContainer"}><PlayerInput playerMappings={props.playerMappings}
                                                                 participantId={props.data.participantId}
                                                                 setPlayerMapping={props.setPlayerMapping}
                                                                 knownPlayers={props.knownPlayers}/></Col>
            <Col xs={2}
                 className={"kda"}>{props.data.stats.kills}/{props.data.stats.deaths}/{props.data.stats.assists}</Col>
        </Row>
    );
}

function PlayerInput(props) {
    const playerMappings = props.playerMappings;
    const value = playerMappings.hasOwnProperty(props.participantId) ? playerMappings[props.participantId] : "";

    const onChange = (event, {newValue}) => {
        props.setPlayerMapping(props.participantId, newValue);
    };

    const [suggestions, setSuggestions] = useState([]);

    const onSuggestionsFetchRequested = ({value}) => {
        if (!value) setSuggestions(props.knownPlayers);

        const search = value.trim().toLowerCase();

        setSuggestions(props.knownPlayers.filter(value => value.toLowerCase().includes(search)));
    }

    const onSuggestionsClearRequested = () => {
        setSuggestions(props.knownPlayers);
    }

    const getSuggestionValue = (suggestion) => {
        return suggestion;
    }

    const renderSuggestion = (suggestion) => {
        return (
            <div className="ac-entry">
                <span className="ac-title">{suggestion}</span>
            </div>
        );
    }

    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{value, onChange, placeholder: "Spielernamen eingeben", className: "form-control"}}
        />
    );
}

export default Match;