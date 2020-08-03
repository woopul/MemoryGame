import React from "react";
import gameState from "../gameState";
import {view} from "react-easy-state";

const LevelButton = ({ level }) => {

    const handleClick = () => {
        gameState.choosenLevel = level;
    };

    return  (
    <div onClick={handleClick} className="nav_button">
        <span>{level.toUpperCase()}</span>
    </div>
    )
}

const NavPanel = () => {
        return (
        <div className="nav_panel">
                <LevelButton  level="easy"/>
                <LevelButton  level="medium"/>
                <LevelButton  level="hard"/>
        </div>
       )
}
export default view(NavPanel);
