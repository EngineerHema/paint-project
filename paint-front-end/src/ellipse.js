import { Ellipse } from "react-konva";

export default function EllipseShape({ dimension, bgColour, handleShapeClick ,id}) {
    const dx = dimension.x2 - dimension.x1;
    const dy = dimension.y2 - dimension.y1;
    console.log(dimension);

    const width = Math.abs(dx);  
    const height = Math.abs(dy); 
    const newShape = {
        type: "Ellipse",
        x: dimension.x1 + width / 2,  
        y: dimension.y1 + height / 2, 
        width: width,
        height: height,
        fill: bgColour.current,
        stroke: "black",
        strokeWidth: 2,
        id:String(id)
    };

    return (
        <Ellipse
            {...newShape}
            onClick={handleShapeClick}
        />
    );
}
