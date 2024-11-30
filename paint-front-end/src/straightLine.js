import { Line } from "react-konva";

export default function StraightLineShape({dimensions, bgColour, handleShapeClick, id}) {
   
    const points = [dimensions.x1, dimensions.y1, dimensions.x2,  dimensions.y2];

    const newShape = {
        type:"Straight line",
        points: points,
        stroke: bgColour.current,
        strokeWidth: 7,
        lineCap: "round",
        lineJoin: "round",
        id
    };

    return (
        <Line {...newShape}
        onClick={handleShapeClick}
        />
        
    );
}
