import './toolBar.css';
import Button from './button';

const shapes = [
   null,
  'Rectangle',
  'Circle'
];

const Colours = [
  "red",
  "green",
  "blue",
  "yellow",
  "white",
  "black"
];

export default function ToolBar({ bgColour, shapeType }) {

  const handleShapeSelect = (event) => {
    shapeType.current = event.target.value;
    console.log(event.target.value);
  };

  return (
    <div className='tool-bar' draggable={false}>
      {Colours.map((colour, index) => (
        <Button
          colour={colour}
          index={index}
          key={index}
          bgColour={bgColour}
        />
      ))}

      <div className='shapes'>
        <select
          id='shape-select'
          value={shapeType?.current} // Assumes shapeType is a ref
          onChange={handleShapeSelect}
          
        >
          {shapes.map((shape, index) => (
            <option key={index} value={shape}>
            {shape !== null ? shape : '_MODE_'}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
