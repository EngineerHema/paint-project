//import logo from './logo.svg';
import './App.css';
import Portait from './portrait.js'
import ToolBar from './toolBar.js'
import { useRef } from "react";


function App() {
  const bgColour = useRef("white")
  const shapeType = useRef(null);
  //const [borderColour, setBorderColour] = useState("black") // Not used yet
  return (
    <div className="App">
      <ToolBar bgColour={bgColour}  shapeType={shapeType}/>
      <Portait bgColour={bgColour}  shapeType={shapeType}/>
    </div>
  );
}

export default App;
