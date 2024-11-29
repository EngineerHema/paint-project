import { Line } from "react-konva";
export default function LineShape({dimensions, bgColour,handleShapeClick}){
    const  points  = dimensions.points;
    
      const newShape = {
        points: points,
        stroke: bgColour.current,
        strokeWidth: 2,
        lineCap: "round", 
        lineJoin: "round", 
  
      };
      return(
        <Line
        {...newShape}
        onClick={handleShapeClick}
      />
      );
}