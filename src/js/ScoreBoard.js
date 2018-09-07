import React from "react";

class ScoreBoard extends React.Component {
    state = {
        timer:0,
        moves: this.props.moves,
    };

    componentDidMount(){
        if(this.props.start){
            this.idInterval = setInterval(() =>{
                
            })
        }
    }


    render(){
        return
    }


}

export default ScoreBoard;