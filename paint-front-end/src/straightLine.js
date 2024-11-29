import { Line } from "react-konva";

export default function StraightLineShape({dimensions, bgColour, handleShapeClick}) {
   
    const points = [dimensions.x1, dimensions.y1, dimensions.x2,  dimensions.y2];

    const newShape = {
        points: points,
        stroke: bgColour.current,
        strokeWidth: 2,
        lineCap: "round",
        lineJoin: "round",
    };

    return (
        <Line {...newShape}
        onClick={handleShapeClick}
        />
        
    );
}
