import React from "react";

class Card extends React.Component {


    handleClick = () => {
        //if clicked - set isFlipped on true , send this' card id up to the board component
        //If cards with this id are matched or card is flipped - function is no longer executed

        const {className, matched} = this.props;
        const flipped = className === 'card flip';

        if (matched === false && flipped === false) {

            if (typeof this.props.cardClicked === 'function') {
                this.props.cardClicked(this.props.id, this.props.index);
            }
        }
    };


    render() {

        const frontFaceImgSrc = `../../pictures/${this.props.img}.svg`;

        return (
            <div onClick={this.handleClick} className={this.props.className}>
                <img className='front_face' src={frontFaceImgSrc} alt={this.props.img + " logo"}/>
                <div className='back_face_container'><img className='back_face' src="../../pictures/react7.svg" alt="react"/></div>
            </div>
        )
    };
}

export default Card