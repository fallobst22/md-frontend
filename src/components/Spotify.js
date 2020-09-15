import React from 'react';

import './Spotify.css'

function Spotify() {
    return (
        <div className={"spotify"}>
            <iframe title="spotify" src="https://open.spotify.com/embed/playlist/7MYB7DNEGeG1aFzX2Iaer6"
                    allow="encrypted-media"/>
        </div>
    );
}

export default Spotify;