import { useState } from "react";

function Button({ colour, index, bgColour, setBgColour}) {
    const [isHovered, setIsHovered] = useState(false); //Only to add shadow effect on buttons
    
    const onMouseEnter =()=>{
        setIsHovered(true)
    }

    const onMouseLeave =()=>{
        setIsHovered(false)
    }

    const changeColour =()=>{
        setBgColour(colour)
    }

    return (
            <button
                key={index}
                className="colour"
                id={colour}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={changeColour}
                style={{ backgroundColor: colour, boxShadow: isHovered? `5px 5px 5px ${colour}`:'none'}}
            >
            </button>
    );
}

export default Button;
