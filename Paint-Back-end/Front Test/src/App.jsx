import React, { useState } from "react";
import "./App.css";

function App() {
  // State variables
  const [shape, setShape] = useState("circle");
  const [shapeTemplate, setShapeTemplate] = useState(null); // Store the template
  const [deleteShapeId, setDeleteShapeId] = useState(""); // State for the delete shape ID
  const [saveString, setSaveString] = useState(""); // State for the string to save

  // Handle sending the shape type to the backend
  const handleSendShape = async () => {
    const shapeData = shape; // Send only the shape type

    try {
      const response = await fetch("http://localhost:8080/shapes/receiveShape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shapeData), // Send shape type to backend
      });
      if (response.ok) {
        const data = await response.json(); // Get the template response
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
    try {
      const response = await fetch("http://localhost:8080/shapes/createShape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shapeTemplate), // Send the updated shape template
      });
      console.log(shapeTemplate);
      if (response.ok) {
        const data = await response.json();
        alert(data); // Show success message
      } else {
        alert("Bad response");
      }
    } catch (error) {
      alert(error);
      console.error(error);
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
        body: JSON.stringify(shapeId), // Send shapeId as a JSON object
      });
      console.log(shapeId);

      if (response.ok) {
        console.log(response.ok);
        alert(`Shape with ID '${shapeId}' deleted successfully.`);
        setDeleteShapeId(""); // Clear the textbox after successful delete
      } else {
        alert("Failed to delete shape.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting shape.");
    }
  };

  // Handle saving a string to the backend
  const handleSaveString = async () => {
    if (!saveString.trim()) {
      alert("Please enter a string to save.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/shapes/saveString", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveString ), // Send the string to backend
      });

      if (response.ok) {
        alert("String saved successfully.");
      } else {
        alert("Failed to save string.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving string.");
    }
  };

  // Handle load button (just alert for now)
  const handleLoad = async () => {
    if (!saveString.trim()) {
      alert("Please enter a string to save.");
      return;
    }
    fetch('http://localhost:8080/shapes/loadString', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(saveString),
  })
      .then(response => response.json())
      .then(data => {
          console.log("Shapes data:", data);
      })
      .catch(error => {
          console.error("Error loading shapes:", error);
      });
  }

  return (
    <div className="App">
      <h1>Shape Selector App</h1>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="shapeSelect">Choose a shape: </label>
        <select
          id="shapeSelect"
          value={shape}
          onChange={(e) => setShape(e.target.value)} // Set state when the user selects a shape
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
            {Object.keys(shapeTemplate).map((key) =>
              key !== "type" ? ( // Skip the "type" key
                <div key={key}>
                  <label htmlFor={key}>{key}: </label>
                  <input
                    id={key}
                    type="text"
                    value={shapeTemplate[key] || ""}
                    onChange={(e) => {
                      setShapeTemplate({
                        ...shapeTemplate,
                        [key]: e.target.value,
                      });
                    }}
                  />
                </div>
              ) : null
            )}
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

      {/* Save and Load Section */}
      <div style={{ marginTop: "20px" }}>
        <h2>Save and Load</h2>
        <input
          type="text"
          value={saveString}
          onChange={(e) => setSaveString(e.target.value)} // Update save string
          placeholder="Enter string to save"
        />
        <button onClick={handleSaveString}>Save</button>
        <button onClick={handleLoad}>Load</button>
      </div>
    </div>
  );
}

export default App;
