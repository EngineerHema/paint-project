import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import shapeFactory from "./shapeFactory";
import Prototype from "./prototype";
import Konva from 'konva';


import { v4 as uuidv4 } from 'uuid';

// Create a factory instance
const factory = new shapeFactory();
const prototype = new Prototype();

export default function Portrait({ bgColour, shapeType }) {
  const stageRef = useRef();
  const dimensions = useRef(null);
  const transformerRef = useRef();
  const [copiedShape, setCopiedShape] = useState(null); 
  const [isCut, setIsCut] = useState(false); 
  const [shapes, setShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
 

  const onPointerDown = (e) => {
    const stage = stageRef.current;

    if (e.target === stage && shapeType.current === "_MODE_") {
      setSelectedShape(null);
      return;
    }

    if (!shapeType?.current) return;
    const { x, y } = stage.getPointerPosition();
    if (shapeType.current === "Line") {
      dimensions.current = { points: [x, y] };
    } else {
      dimensions.current = { x1: x, y1: y, x2: x, y2: y };
    }
  };

// Create shape and set it as the current shape
const onPointerMove = () => {
  if (!dimensions?.current || !shapeType?.current) return;

  const stage = stageRef.current;
  const { x, y } = stage.getPointerPosition();

  // Update dimensions based on the shape type (e.g., Line, Rectangle, etc.)
  if (shapeType.current === "Line") {
    dimensions.current = { points: [...dimensions.current.points, x, y] };
  } else {
    dimensions.current = { ...dimensions.current, x2: x, y2: y };
  }

  // Create the shape and set it as currentShape (Konva node)
  const newShape = factory.createShape(
    shapeType?.current, // Shape type ('Rect', 'Line', etc.)
    dimensions.current,  // Shape dimensions
    bgColour,            // Background color
    (e) => handleShapeClick(e.target), // Click handler
    uuidv4(),             // Unique ID
    handleCreateShape
  );

  setCurrentShape(newShape); // Set the created shape as current shape
};

// Handle pointer up and send shape data to backend
const onPointerUp = () => {
  if (currentShape !== null) {
    // Add the current shape (Konva node) to the shapes array
    setShapes((prevShapes) => [...prevShapes, currentShape]);
    console.log(currentShape)

    // Send shape data to the backend
    //handleCreateShape(currentShape); // Pass the Konva node to backend

    // Reset current shape and dimensions for the next shape
    setCurrentShape(null);
    dimensions.current = null;
  }
};


// Function to send shape data to backend
const handleCreateShape = async (shapeNode) => {
  try {
    // Send the Konva node attributes to the backend
    const shapeData = shapeNode.attrs; // Get the attributes of the Konva node

    const response = await fetch("http://localhost:8080/shapes/createShape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shapeData), // Send the shape attributes
    });

    if (response.ok) {
      const data = await response.json();
      alert("Shape created successfully: " + data); // Show success message
    } else {
      alert("Bad response");
    }
  } catch (error) {
    alert("Error: " + error.message);
    console.error(error);
  }
};

const handleDelete = async () => {
  const shapeId = selectedShape.attrs.id

  if (!shapeId) {
    alert("Please enter a shape ID to delete.");
    return;
  }

  const prevShapes = shapes;
  try {
    setShapes([]);
    const response = await fetch("http://localhost:8080/shapes/deleteShapeById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shapeId), // Send shapeId as a JSON object
    }).then(response => response.json())
    .then(data => {
      const updatedShapes = data.map(shape =>
        prototype.clone(shape?.type, shape, shape.x, shape.y, (e) => handleShapeClick(e.target), shape.id)
      );
    setShapes(updatedShapes);
    })
    .catch(error => {
      setShapes(prevShapes);
        console.error("Error loading shapes:", error);
    });
    console.log(shapeId);

    if (response.ok) {
      console.log(response.ok);
      alert(`Shape with ID '${shapeId}' deleted successfully.`);
    } else {
      alert("Failed to delete shape.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
  setSelectedShape(null);
};


  const handleShapeClick = (node) => {
    console.log('Shape clicked:', node);
    setSelectedShape(node); 
  };
  //for copy , cut , past  //////////////////////////////////////
  const handleCopy = () => {
   console.log(selectedShape);
    if (selectedShape) {
      setCopiedShape(
        {...selectedShape.attrs}
      );
      setSelectedShape(null)
    }
  };


  const handleCut = () => {
    if (selectedShape) {
    handleDelete(selectedShape);
    handleCopy(selectedShape);
    }
  };

  const handlePaste = () => {
    console.log(copiedShape)
    if (copiedShape) {

      const stage =stageRef.current;
      const {x,y}=stage.getPointerPosition(); 
      const newShape = prototype.clone(copiedShape?.type,copiedShape, x, y, (e) => handleShapeClick(e.target), uuidv4);
      ;
      


      setShapes([...shapes, newShape]);
  }
};
  ////////////////////////////////////////////
  useEffect(() => {
    if (selectedShape &&  transformerRef.current && shapeType.current === "_MODE_") {
      transformerRef.current.nodes([selectedShape]); // Apply transformer to selected shape
      transformerRef.current.getLayer().batchDraw();
      selectedShape.draggable(true);
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]); 
      transformerRef.current.getLayer().batchDraw();
      if (selectedShape) selectedShape.draggable(false);
    } else if (shapeType.current !== "_MODE_") {
      selectedShape && selectedShape.draggable(false);
    }
  }, [selectedShape, shapeType]);

 //////////////////////////////////////////////////
 useEffect(() => {
  const handleKeyDown = (e) => {
    
    if (e.key === "Delete") { 
      handleDelete();
    }
    
    else if (e.ctrlKey) {
      if (e.key === "c") { 
        handleCopy();
      } else if (e.key === "x") { 
        handleCut();
      } else if (e.key === "v") { 
        handlePaste();
      }
      
    }
  };
  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [selectedShape, shapes, copiedShape, isCut]);

  return (
    <div className="portrait">
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <Layer>
    {shapes.map((shape, i) => {
      // Make sure each shape is a valid Konva element
      return <React.Fragment key={i}>{shape}</React.Fragment>
    })}

          {currentShape && React.cloneElement(currentShape, { draggable: false })}
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
    </div>
  );
}
