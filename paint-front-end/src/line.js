import { Line } from "react-konva";
export default function LineShape({dimensions, bgColour, handleShapeClick, id, handleCreateShape}){
    const  points  = dimensions.points;
    
      const newShape = {
        id,
        points: points,
        stroke: bgColour.current,
        strokeWidth: 2,
        lineCap: "round", 
        lineJoin: "round", 
  
      };

      const onPointerUp = (e) => {
        const shapeNode = e.target; // Access the shape node (Konva Rect)
        handleCreateShape(shapeNode); // Pass the Konva node to handleCreateShape
      };

      return(
        <Line
        {...newShape}
        onClick={handleShapeClick}
        onPointerUp={onPointerUp}
      />
      );
}