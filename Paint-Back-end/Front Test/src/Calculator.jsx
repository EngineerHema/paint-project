import Button from './Button.jsx'
import React, { useState } from 'react';
import axios from 'axios';

function Calculator(){

  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const equals = () => {
    axios.post('http://localhost:8080/calculate', { expression })
      .then(response => {
        setResult(response.data.result);
      })
      .catch(error => {
        console.error('Error evaluating the expression:', error);
        setResult('Error');
      });
  };

  function handleClick(symbol)  {
  switch(symbol){
    case '=':
      equals();
      break;

    case 'C':
      setExpression('');
      setResult('');
      break;

    case 'CE':
        setExpression('');
        setResult('');
        break;

    case 'DEL':
      setExpression((prev) => prev.slice(0, -1));
        break;

    case '%':
      if(result!='') {setExpression(result + '/100');setResult('');}
      else setExpression((prev) => prev + '/100');     
      break;
    case '1/x':
      if(result!='') {setExpression('1/');setResult('');}
      else setExpression((prev) => prev + '1/');
        break;
    case '√x':
      if(result!='') {setExpression('sqrt(');setResult('');}
      else setExpression((prev) => prev + 'sqrt(');
        break;
    case 'x²':
      if(result!='') {setExpression('^2');setResult('');}
      else setExpression((prev) => prev + '^2');
            break;
    case '÷':
      if(result!='') {setExpression(result + '/');setResult('');}
      else setExpression((prev) => prev + '/');          break;
    case 'x':
      if(result!='') {setExpression(result + '*');setResult('');}
      else setExpression((prev) => prev + '*');          break;
    case '(':
      setExpression((prev) => prev + '(');
        break;
    case ')':
      setExpression((prev) => prev + ')');
        break;
    case 'e':
      setExpression((prev) => prev + '2.71828');
        break;
    case '+':
      if(result!='') {setExpression(result + '+');setResult('');}
      else setExpression((prev) => prev + '+');          break;   
    case '-':
      if(result!='') {setExpression(result + '-');setResult('');}
      else setExpression((prev) => prev + '-');          break;         
    case '+/-':
      setExpression((prev) => '-'+prev);
        break;
    case 'ANS':
      setExpression('');
      setExpression((prev) => prev + result);
      setResult('');
        break;
    default:
      if(result!=''){
        setExpression('');
        setResult('');
      }
      setExpression((prev) => prev + symbol);
        break;
  }
  };




return(
    <div className = "calc-wrapper">
         <div className = "screen">
            <div className = "expression"><h1>{expression}</h1></div>
            <div className = "result"><h2>{result}</h2></div>
        </div> 
        <div className="control">
        {[
          { symbol: '%' ,color:"#b03892"},
          { symbol: 'CE' , color:"#e84850"},
          { symbol: 'C' , color:"#e84850"},
          { symbol: 'DEL' , color:"#e84850"},
          { symbol: '1/x' ,color:"#b03892"},
          { symbol: 'x²', color:"#b03892" },
          { symbol: '√x', color:"#b03892"},
          { symbol: '÷', color:"#b03892"},
          { symbol: '7' },
          { symbol: '8' },
          { symbol: '9' },
          { symbol: 'x' ,color:"#b03892"},
          { symbol: '4' },
          { symbol: '5' },
          { symbol: '6' },
          { symbol: '-' ,color:"#b03892"},
          { symbol: '1' }, 
          { symbol: '2' },
          { symbol: '3' }, 
          { symbol: '+' ,color:"#b03892"},
          { symbol: '+/-'}, 
          { symbol: '0' },
          { symbol: '.' }, 
          { symbol: '=' ,color:"#b03892"},
          { symbol: '('}, 
          { symbol: ')' },
          { symbol: 'e' }, 
          { symbol: 'ANS' ,color:"#b03892"}
        ].map((btn, index) => (
          <Button
            key={index}
            symbol={btn.symbol}
            color={btn.color}
            onClick={handleClick}
          />
        ))}

        </div>
    </div>
);

}


export default Calculator