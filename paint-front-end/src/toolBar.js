import './toolBar.css';
import Button  from './button';



const Colours = [
    "red",
    "green",
    "blue",
    "yellow",
    "white",
    "black"
];

export default function ToolBar({bgColour, setBgColour}){
    return(
        <div className='tool-bar' draggable = 'True'>
            {Colours.map((colour, index) => (
            <Button colour={colour} index={index}
            bgColour={bgColour} setBgColour={setBgColour}/>
        ))}


        </div>
    );
}