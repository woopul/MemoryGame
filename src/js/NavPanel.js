import React from "react";

class LevelButton extends React.Component {

    handleClick = () => {
        if (typeof this.props.LevelButtonClicked === 'function') {
            this.props.LevelButtonClicked(this.props.level);
        }
    };

    render() {
        const {level} = this.props;
        return <div onClick={e => this.handleClick({level})} className="nav_button"><span>{level.toUpperCase()}</span>
        </div>
    }
}


class NavPanel extends React.Component {

    handleButtonClick = levelClicked => {
        if (typeof this.props.buttonClicked === 'function') {
            this.props.buttonClicked(levelClicked);
        }
    };

    render() {
        return <div className="nav_panel">
            <LevelButton LevelButtonClicked={this.handleButtonClick} level="easy"/>
            <LevelButton LevelButtonClicked={this.handleButtonClick} level="medium"/>
            <LevelButton LevelButtonClicked={this.handleButtonClick} level="hard"/>
        </div>
    }
}

export default NavPanel