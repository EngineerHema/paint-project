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
  const [filePath, setFilePath] = useState('');

 

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
  const shapeId = selectedShape?.attrs?.id;

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


const undo = async () => {
  const prevShapes = shapes;
  try {
    setShapes([]);

    const response = await fetch("http://localhost:8080/shapes/undo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      
      const updatedShapes = data.map(shape =>
        prototype.clone(shape?.type, shape, shape.x, shape.y, (e) => handleShapeClick(e.target), shape.id)
      );
      
      // Update the shapes state
      setShapes(updatedShapes);
      console.log("Undo successful!");
    } else {
      // If the response is not ok, revert to previous shapes
      setShapes(prevShapes);
      alert("Failed to undo action.");
    }
  } catch (error) {
    // In case of an error, revert to previous shapes
    setShapes(prevShapes);
    console.error("Error during undo:", error);
    alert("Error during undo operation.");
  }

  setSelectedShape(null); // Reset selected shape after undo
};


const redo = async () => {
  const prevShapes = shapes;
  try {
    setShapes([]);

    const response = await fetch("http://localhost:8080/shapes/redo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      
      const updatedShapes = data.map(shape =>
        prototype.clone(shape?.type, shape, shape.x, shape.y, (e) => handleShapeClick(e.target), shape.id)
      );
      
      // Update the shapes state
      setShapes(updatedShapes);
      console.log("redo successful!");
    } else {
      // If the response is not ok, revert to previous shapes
      setShapes(prevShapes);
      alert("Failed to redo action.");
    }
  } catch (error) {
    // In case of an error, revert to previous shapes
    setShapes(prevShapes);
    console.error("Error during redo:", error);
    alert("Error during undo operation.");
  }

  setSelectedShape(null); // Reset selected shape after undo
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




const saveFile = async (format) => {
  if (!format) {
    console.error('Invalid format:', format);
    return;
  }

  try {
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: `shapes.${format}`,
      types: [
        {
          description: format === 'json' ? 'JSON Files' : 'XML Files',
          accept: {
            [format === 'json' ? 'application/json' : 'application/xml']: [`.${format}`]
          }
        }
      ]
    });

    const writable = await fileHandle.createWritable();

    if (format === 'json') {
      // Fetch JSON data from backend
      const response = await fetch("http://localhost:8080/shapes/saveString", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched JSON data:", data);
        
        // Convert JSON data to a string and write to the file
        const jsonData = JSON.stringify(data, null, 2);
        await writable.write(jsonData);
      } else {
        console.error("Failed to fetch JSON data.");
      }
    } else if (format === 'xml') {
      // Generate XML data from shapes
      let xmlData = '<?xml version="1.0" encoding="UTF-8"?>\n<shapes>\n';

      shapes.forEach((shape) => {
        xmlData += `  <shape type="${shape.type}" color="${shape.color}">\n`;
      
        // Handle circle type
        if (shape.type === 'circle') {
          xmlData += `    <x>${shape.x}</x>\n    <y>${shape.y}</y>\n    <radius>${shape.radius}</radius>\n`;
        }
        // Handle rectangle type
        else if (shape.type === 'rectangle') {
          xmlData += `    <x>${shape.x}</x>\n    <y>${shape.y}</y>\n    <width>${shape.width}</width>\n    <height>${shape.height}</height>\n`;
        }
        // Handle line type
        else if (shape.type === 'line') {
          xmlData += `    <x1>${shape.x1}</x1>\n    <y1>${shape.y1}</y1>\n    <x2>${shape.x2}</x2>\n    <y2>${shape.y2}</y2>\n`;
        }
        // Handle ellipse type
        else if (shape.type === 'ellipse') {
          xmlData += `    <cx>${shape.cx}</cx>\n    <cy>${shape.cy}</cy>\n    <rx>${shape.rx}</rx>\n    <ry>${shape.ry}</ry>\n`;
        }
        // Handle square type (which is a rectangle with equal width and height)
        else if (shape.type === 'square') {
          xmlData += `    <x>${shape.x}</x>\n    <y>${shape.y}</y>\n    <side>${shape.side}</side>\n`;
        }
        // Handle triangle type
        else if (shape.type === 'triangle') {
          xmlData += `    <x1>${shape.x1}</x1>\n    <y1>${shape.y1}</y1>\n    <x2>${shape.x2}</x2>\n    <y2>${shape.y2}</y2>\n    <x3>${shape.x3}</x3>\n    <y3>${shape.y3}</y3>\n`;
        }
        // Handle straight line type
        else if (shape.type === 'straight-line') {
          xmlData += `    <x1>${shape.x1}</x1>\n    <y1>${shape.y1}</y1>\n    <x2>${shape.x2}</x2>\n    <y2>${shape.y2}</y2>\n`;
        }
      
        xmlData += '  </shape>\n';
      });
      
      xmlData += '</shapes>';
      
      await writable.write(xmlData);
      
    }

    await writable.close();
    alert(`Shapes saved as ${format.toUpperCase()}!`);
    setFilePath(`File saved to: ${fileHandle.name}`);
  } catch (error) {
    console.error(`Error saving shapes as ${format.toUpperCase()}:`, error);
    setFilePath('Error saving file');
  }
};


const load = async (format) => {
  if (!format) {
    console.error('Invalid format:', format);
    return;
  }

  try {
    // Open file picker
    const fileHandle = await window.showOpenFilePicker({
      types: [
        {
          description: format === 'json' ? 'JSON Files' : 'XML Files',
          accept: {
            [format === 'json' ? 'application/json' : 'application/xml']: [`.${format}`]
          }
        }
      ]
    });

    // Get the file from the handle
    const file = await fileHandle[0].getFile();
    const text = await file.text();

    if (format === 'json') {
      // Parse JSON data
      const jsonData = JSON.parse(text);
      console.log('Loaded JSON data:', jsonData);
      
      const updatedShapes = jsonData.map(shape =>{
        return prototype.clone(shape?.type, shape, shape.x, shape.y, (e) => handleShapeClick(e.target), shape.id)
    });
      console.log(updatedShapes);
      // Update the shapes state
      setShapes(updatedShapes);
      

      
      
      // You can now use the jsonData in your application
    } 

  } catch (error) {
    console.error('Error loading file:', error);
  }
};




  ////////////////////////////////////////////
  useEffect(() => {
    if (selectedShape && transformerRef.current && shapeType.current === "_MODE_") {
      transformerRef.current.nodes([selectedShape]); // Apply transformer to selected shape
      transformerRef.current.getLayer().batchDraw();
      selectedShape.draggable(true);
  
     
      selectedShape.on('dragend', () => {
        console.log('Drag finished');
        handleCreateShape(selectedShape); // Handle the shape after drag ends
      });

      selectedShape.on('transformend', () => {
        console.log('Editing finished');
        handleCreateShape(selectedShape);

      });
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]); 
      transformerRef.current.getLayer().batchDraw();
      if (selectedShape){
        selectedShape.draggable(false);
        handleCreateShape(selectedShape);
      }
    } else if (shapeType.current !== "_MODE_") {
      selectedShape && selectedShape.draggable(false);
    }
  
    // Cleanup the event listener when the component is unmounted or when selectedShape changes
    return () => {
      if (selectedShape) {
        selectedShape.off('transformend');
      }
    };
  
  }, [selectedShape, shapeType]);

 //////////////////////////////////////////////////
 useEffect(() => {
  const handleKeyDown = (e) => {
    
    if (e.key === "Delete") { 
      handleDelete(selectedShape);
    }
    
    if (e.ctrlKey) {
      if (e.key === "c") { 
        handleCopy();
      } else if (e.key === "x") { 
        handleCut();
      } else if (e.key === "v") { 
        handlePaste();
      } else if (e.key === "m") {
        redo();
      } else if (e.key === "z") {
        undo();
      }else if (e.key === "s") {
        e.preventDefault();
        saveFile("json");
      }else if (e.key === "l") {
        e.preventDefault();
        load("json");
      }
    }
    else if  (e.altKey && e.key === 's'){
      e.preventDefault();
      saveFile("xml");
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
