import React from 'react'
import '../scss/main.scss'
// import
import Board from './Board'


class LevelButton extends React.Component {

    handleClick = level => {
        console.log(level);
    };

    render() {
        const {level} = this.props;
        return <div onClick={e => this.handleClick({level})} className="nav_button"><span>{level.toUpperCase()}</span>
        </div>
    }
}



class NavPanel extends React.Component {

    render() {
        return <div className="nav_panel">
            <LevelButton level="easy"/>
            <LevelButton level="medium"/>
            <LevelButton level="hard"/>
        </div>
    }
}




class Game extends React.Component {

    render() {
        return <div className="game_field">
            <NavPanel />
            <Board/>
        </div>
    }
}


class App extends React.Component {

    render() {
        const particle = () => {
            particlesJS("particles-js", {
                "particles": {
                    "number": {"value": 95, "density": {"enable": true, "value_area": 800}},
                    "color": {"value": "#ffffff"},
                    "shape": {
                        "type": "circle",
                        "stroke": {"width": 0, "color": "#000000"},
                        "polygon": {"nb_sides": 5},
                        "image": {"src": "img/github.svg", "width": 100, "height": 100}
                    },
                    "opacity": {
                        "value": 0.2,
                        "random": false,
                        "anim": {"enable": false, "speed": 1, "opacity_min": 0.1, "sync": false}
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {"enable": false, "speed": 40, "size_min": 0.1, "sync": false}
                    },
                    "line_linked": {"enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1},
                    "move": {
                        "enable": true,
                        "speed": 6,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {"enable": false, "rotateX": 600, "rotateY": 1200}
                    }
                },
                "interactivity": {
                    "detect_on": "window",
                    "events": {
                        "onhover": {"enable": true, "mode": "repulse"},
                        "onclick": {"enable": false, "mode": "push"},
                        "resize": true
                    },
                    "modes": {
                        "grab": {"distance": 400, "line_linked": {"opacity": 1}},
                        "bubble": {"distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3},
                        "repulse": {"distance": 200, "duration": 0.4},
                        "push": {"particles_nb": 4},
                        "remove": {"particles_nb": 2}
                    }
                },
                "retina_detect": true
            });
        }
        particle();
        return (
            <Game/>
        );
    }
}

export default App
