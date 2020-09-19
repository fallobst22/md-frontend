import React from "react";

function ChampionImage(props) {
    const {championId, ...imgprops} = props;

    return (
        <img className={"championImage"} src={"/api/static/champion/image/" + championId} {...imgprops}
             alt={"champion-image-" + championId}/>
    );
}

function SummonerSpellImage(props) {
    const {spellId, ...imgprops} = props;

    return (
        <img className={"summonerSpellImage"} src={"/api/static/summonerSpell/image/" + spellId} {...imgprops}
             alt={"summoner-spell-image-" + spellId}/>
    );
}

function ItemImage(props) {
    const {itemId, ...imgprops} = props;

    if (itemId) {
        return (
            <img className={"itemImage"} src={"/api/static/item/image/" + itemId} {...imgprops}
                 alt={"summoner-spell-image-" + itemId}/>
        );
    } else {
        return (
            <div className={"d-inline-block itemImage item-empty align-middle"}/>
        );
    }
}

export {ChampionImage, SummonerSpellImage, ItemImage};