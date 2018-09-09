import React from "react";

class ScoreBoard extends React.Component {
    state = {
        miliseconds:0,
        minutes:0,
        seconds:0,
    };

    componentDidMount(){
        this.startTimer();
    }

    componentDidUpdate(){
        // if(this.props.start){
        //     this.startTimer();
        //
        // }
    }

    componentWillUnmount(){
        clearInterval(this.idInterval);
    }

    startTimer = () => {
        let minutes=0,
            seconds=0,
            miliseconds=0;

        this.idInterval = setInterval(() =>{
            miliseconds+=16;

            if(miliseconds>=1000){
                miliseconds=0;
                seconds++;
            }

            if(seconds === 60){
                seconds = 0;
                minutes ++;
            }
            this.setState({
                miliseconds:miliseconds,
                seconds: seconds,
                minutes: minutes,
            })
        },20)
    };


    render(){
        const{minutes, seconds, miliseconds} = this.state;


        return <div className="score-board">
            <p>{('0'+ minutes).slice(-2)}:{('0'+ seconds).slice(-2)}:{('0'+ miliseconds).slice(-2)}</p>
            <p>moves: {this.props.moves}</p>
        </div>
    }


}

export default ScoreBoard;