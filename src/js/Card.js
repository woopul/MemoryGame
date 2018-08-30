import React from "react";

class Card extends React.Component {
    state = {
        frontFaceImgSrc: `../../pictures/${this.props.img}.svg`,
        isFlipped: false,
    };

    handleClick = () => {
        //if clicked - set isFlipped on true , send this' card id up to the board component
        //If cards with this id are matched or card is flipped - function is no longer executed
        if (this.props.matched === false || this.state.isFlipped === false) {
            this.setState({
                isFlipped: true,
            });

            if (typeof this.props.cardClicked === 'function') {
                this.props.cardClicked(this.props.id, this.props.index);
            }
        }
    };

    //add className to card depends if it's clicked - class flip - turns the card
    toggleCardOnClick = () => {
        const {img, matched} = this.props;
        const {frontFaceImgSrc, isFlipped} = this.state;
        let className = '';

        if(this.props.flipBack){
            setTimeout(()=>{
                this.setState({
                    isFlipped:false,
                });
                className  = 'card'
            }, 1000);

        } else if( matched || isFlipped ){

            className = 'card flip'
        } else {
            className = 'card'
        }

        return (
            <div onClick={this.handleClick} className={className}>
                <img className='front_face' src={frontFaceImgSrc} alt={img + " logo"}/>
                <img className='back_face' src="../../pictures/react.svg" alt="react"/>
            </div>
        )
    };

    componentDidMount () {

    }

    render() {
        return this.toggleCardOnClick();
    }
}

export default Card