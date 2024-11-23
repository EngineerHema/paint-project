import logo from './logo.svg';
import './App.css';
import Portait from './portrait.js'
import ToolBar from './toolBar.js'
import { useState } from "react";



function App() {
  const [bgColour, setBgColour] = useState("white")
  const [borderColour, setBorderColour] = useState("black") // Not used yet
  return (
    <div className="App">
      <ToolBar bgColour={bgColour} setBgColour={setBgColour}/>
      <Portait bgColour={bgColour} setBgColour={setBgColour}/>
    </div>
  );
}

export default App;
