import React, { useEffect, useState } from "react";
import "./css/calculator.css";
import ResultComponent from "./components/Result";
import CalcKeyPad from "./components/CalcKeyPad";
import History from "./components/History";
import Button from "./components/Button";

function App() {
  const [result, setResult] = useState("0");
  const [showHistory, setShowHistory] = useState(false);
  const [finalResult  , setFinalResult] = useState('')
  const [count  , setCount] = useState(0);

  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      setHistory(JSON.parse(localStorage.getItem("history")));
    } catch (error) {
      console.error("errror::", error);
    }
  }, [localStorage.getItem('history')]);

  

  const onClick = (butttonObj) => {
    // 
    if(count==1) {
      setFinalResult('')
      setResult('0')
      setCount(0)
    }
    if (butttonObj.id === "equal") {
      calculate();
    } else if (butttonObj.id === "C") {
  
      reset();
    } else if (butttonObj.id === "CE" || butttonObj.id === "backclear") {
      handleCe(result)
    } else {
      if(['/','*' ,'-' ,'+'].includes(result[result.length-1]) || !parseInt(result)) {
        if(butttonObj.value =='0') {
          return 
        } else {
          setResult(result + butttonObj.value);
        }
      } else {
        setResult(result + butttonObj.value);
      }
 
     }
    setShowHistory(false);
  };

  const calculate = () => {
    var checkResult = "";
    setCount(1)
    if (result?.includes("--")) {
      checkResult = result.replace("--", "+");
    } else {
      checkResult = result;
    }

    try {
      // checkResult =cleanNum(checkResult)
      const result = (eval(checkResult.substring(1)) || "0") + "";
      setFinalResult(result)
      // setResult(result);
      const history = JSON.parse(localStorage.getItem("history")) || [];
      history.push({ id: result, value: checkResult });
      localStorage.setItem("history", JSON.stringify(history));
      
    } catch (e) {
      console.log(e)
      // setResult("error");
      setFinalResult('error')
    }
  };

  const reset = () => {
    setResult("0");
    setFinalResult('')
  };

  const backspace = () => {

    const updatedResult  =  (result+"").substring(0, result.length - 1)
    if(updatedResult.length===0) {
      setResult(0)
    }
else {
  setResult(updatedResult)
}
  };

  const handleHistory = () => {
    localStorage.removeItem("history");
    setHistory([])
  };


  function handleCe (s) {
      for (let i =  s.length-1;i>0;i--){
        if(['*', '-','+', '/'].includes(s[i])) {
          setResult(s.substring(0,i));
          return ;
        }
      }
  }
  return (
      <div className="calculator-body">
        <h1>Solvative Calculator Project</h1>
        <Button
          buttonText={'Clear History'}
          onClick={handleHistory}
          className= "historybutton"
        />
        <ResultComponent result={finalResult}  operations={result}/>
        <CalcKeyPad onClick={onClick} />
        {<History history = {history} />}
    </div>
  );
}

export default App;
