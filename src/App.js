import React from 'react';
import './App.css';
import Jumbotron from "react-bootstrap/Jumbotron";

function App() {
    return (
        <div>
            <Jumbotron className={"header"} fluid={true}/>
            <iframe className={"data-frame"} title={"meissner-dev"} src={"https://meissner-dev.de/MarkusDope"}/>
            <div className="impressum">
                <a href="https://datenschutz.elite12.de/">Impressum/Datenschutzerklärung</a>
            </div>
        </div>
    );
}

export default App;
