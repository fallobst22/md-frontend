import React from "react";

function ChampionImage(props) {
    const {championId, ...imgprops} = props;

    return (
        <img className={"championImage"} src={"/api/static/champion/image/" + championId} {...imgprops}
             alt={"champion-image-" + championId}/>
    );
}

export default ChampionImage;