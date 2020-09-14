import React from 'react';
import './App.css';
import Jumbotron from "react-bootstrap/Jumbotron";
import {KeycloakProvider} from "@react-keycloak/web";

import keycloak from "./keycloak";
import Footer from "./Footer";

function App() {
    return (
        <KeycloakProvider keycloak={keycloak} initConfig={{
            onLoad: 'check-sso',
            promiseType: 'native',
            flow: 'standard',
            pkceMethod: 'S256',
            checkLoginIframe: false,
            silentCheckSsoRedirectUri: window.location.origin + '/silent-sso.html'
        }}>
            <div className={"content"}>
                <Jumbotron className={"header"} fluid={true}/>
                <iframe className={"data-frame"} title={"meissner-dev"} src={"https://meissner-dev.de/MarkusDope"}/>
                <Footer/>
            </div>
        </KeycloakProvider>
    );
}

export default App;
