import React from 'react';

import './Footer.css'
import {useKeycloak} from "@react-keycloak/web";
import {Link} from "react-router-dom";
import RoleComponent from "./RoleComponent";

function Footer() {
    return (
        <div className={"footer"}>
            <LoginComponent/>
            <RoleComponent role={"manager"}>
                <Link className={"text-center"} to={"/import"}>Match importieren</Link>
            </RoleComponent>
            <a className={"text-center"} href={"https://meissner-dev.de/MarkusDope"}>Old Stats</a>
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