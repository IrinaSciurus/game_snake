import React from "react";

function Food(props){
    const {dot} = props;
       const style = {
        left: `${dot[0]}%`,
        top: `${dot[1]}%`
    }
    return(
        <div className="snakeFood" style={style}>
        </div>
    )
}
export default Food;