import React, { useState } from "react";
import "./App.css";

function App() {
  // State variables
  const [shape, setShape] = useState("circle");
  const [shapeTemplate, setShapeTemplate] = useState(null); // Store the template
  const [deleteShapeId, setDeleteShapeId] = useState(""); // State for the delete shape ID

  // Handle sending the shape type to the backend
  const handleSendShape = async () => {
    const shapeData = shape;  // Send only the shape type

    try {
      const response = await fetch("http://localhost:8080/shapes/receiveShape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shapeData),  // Send shape type to backend
      });
      if (response.ok) {
        const data = await response.json();  // Get the template response
        setShapeTemplate(data);
        alert(`Shape template for ${shape} received.`);
      } else {
        alert("Failed to send shape.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle creating the shape by sending filled data
  const handleCreateShape = async () => {
    // Fill the shape template with the user's input
    const shapeDetails = {
      type: shapeTemplate.type,
      properties: {
        ...shapeTemplate.properties,
      },
    };
    try {
      const response = await fetch("http://localhost:8080/shapes/createShape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shapeDetails),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data);  // Show success message
      } else {
        alert("bad response");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  // Handle deleting a shape by its ID
  const handleDeleteShape = async () => {
    const shapeId = deleteShapeId.trim(); // Get the shape ID from the textbox

    if (!shapeId) {
      alert("Please enter a shape ID to delete.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/shapes/deleteShapeById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( shapeId ),  // Send shapeId as a JSON object
      });

      if (response.ok) {
        alert(`Shape with ID '${shapeId}' deleted successfully.`);
        setDeleteShapeId("");  // Clear the textbox after successful delete
      } else {
        alert("Failed to delete shape.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting shape.");
    }
  };

  return (
    <div className="App">
      <h1>Shape Selector App</h1>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="shapeSelect">Choose a shape: </label>
        <select
          id="shapeSelect"
          value={shape}
          onChange={(e) => setShape(e.target.value)}  // Set state when the user selects a shape
        >
          <option value="circle">Circle</option>
          <option value="rectangle">Rectangle</option>
          <option value="triangle">Triangle</option>
        </select>
      </div>

      <div>
        <h2>Fill Shape Properties</h2>
        {shapeTemplate && (
          <div>
            {Object.keys(shapeTemplate.properties).map((key) => (
              <div key={key}>
                <label htmlFor={key}>{key}: </label>
                <input
                  id={key}
                  type="text"
                  value={shapeTemplate.properties[key] || ""}
                  onChange={(e) => {
                    setShapeTemplate({
                      ...shapeTemplate,
                      properties: {
                        ...shapeTemplate.properties,
                        [key]: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={handleSendShape}>Send Shape</button>
      <button onClick={handleCreateShape}>Create Shape</button>

      <div style={{ marginTop: "20px" }}>
        <h2>Delete Shape by ID</h2>
        <input
          type="text"
          value={deleteShapeId}
          onChange={(e) => setDeleteShapeId(e.target.value)} // Update delete shape ID
          placeholder="Enter shape ID to delete"
        />
        <button onClick={handleDeleteShape}>Delete Shape</button>
      </div>
    </div>
  );
}

export default App;
