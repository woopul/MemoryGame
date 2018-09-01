import React from "react";

class LevelButton extends React.Component {

    handleClick = () => {
        if (typeof this.props.LevelButtonClicked === 'function') {
            this.props.LevelButtonClicked(this.props.level);
        }
    };

    render() {
        const {level} = this.props;
        return <div onClick={this.handleClick} className="nav_button"><span>{level.toUpperCase()}</span>
        </div>
    }
}

class NavPanel extends React.Component {

    render() {
        return <div className="nav_panel">
                <LevelButton LevelButtonClicked={this.props.levelChoosed} level="easy"/>
                <LevelButton LevelButtonClicked={this.props.levelChoosed} level="medium"/>
                <LevelButton LevelButtonClicked={this.props.levelChoosed} level="hard"/>

        </div>
    }
}

export default NavPanel