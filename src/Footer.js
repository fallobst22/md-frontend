import React from 'react';

import './Footer.css'
import {useKeycloak} from "@react-keycloak/web";

function Footer() {
    return (
        <div className={"footer"}>
            <LoginComponent/>
            <div className="impressum">
                <a href="https://datenschutz.elite12.de/">Impressum/Datenschutzerklärung</a>
            </div>
        </div>
    );
}

function LoginComponent() {

    const [keycloak] = useKeycloak();

    if (keycloak.authenticated) {
        return (
            <div>
                Eingeloggt als {keycloak.idTokenParsed.preferred_username}
            </div>
        );
    } else {
        return (
            <div>
                <span className={"login"} onClick={keycloak.login}>Login</span>
            </div>
        );
    }
}

export default Footer;