import React from "react";

class ScoreBoard extends React.Component {
    state = {
        minutes:0,
        seconds:0,
    };

    componentDidMount(){

    }

    componentWillUnmount(){
        clearInterval(this.idInterval);
    }

    startTimer = () => {
        let minutes=0,
            seconds=0;
        this.idInterval = setInterval(() =>{
            seconds ++;
            if(seconds === 60){
                seconds = 0;
                minutes ++;
            }
            this.setState({
                seconds: seconds,
                minutes: minutes,
            })
        },1000)
    };


    render(){
        const{minutes, seconds, moves, start} = this.state;

        if(this.props.start){
            this.startTimer();
        }

        console.log(moves);
        console.log(start);

        return <div className="score-board">
            <p>{('0'+ minutes).slice(-2)}:{('0'+ seconds).slice(-2)}</p>
            <p>moves: {this.props.moves}</p>
        </div>
    }


}

export default ScoreBoard;