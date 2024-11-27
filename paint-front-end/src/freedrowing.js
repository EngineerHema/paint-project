import { Line } from "react-konva";
export default function LineShape({dimensions, bgColour}){
    const  points  = dimensions.points;
    
      const newShape = {
        points: points,
        stroke: bgColour.current,
        strokeWidth: 2,
        lineCap: "round", 
        lineJoin: "round", 
        draggable: true,
      };
      return(
        <Line
        {...newShape}

      />
      );
}