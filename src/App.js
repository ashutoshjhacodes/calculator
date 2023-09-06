import React, { useEffect, useState } from "react";
import "./css/calculator.css";
import ResultComponent from "./components/Result";
import CalcKeyPad from "./components/CalcKeyPad";
import History from "./components/History";
import Button from "./components/Button";

function App() {
  const [result, setResult] = useState("0");
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    localStorage.removeItem("history");
  }, []);



  const cleanNum = (str) => str.replace(/\d*(\.\d+)?/g, n => n && +n);

  const onClick = (butttonObj) => {
    if (butttonObj.id === "equal") {
      calculate();
    } else if (butttonObj.id === "C") {
      reset();
    } else if (butttonObj.id === "CE" || butttonObj.id === "backclear") {
      backspace();
    } else {
      setResult(result + butttonObj.value);

     }
    setShowHistory(false);
  };

  const calculate = () => {
    var checkResult = "";
    if (result?.includes("--")) {
      checkResult = result.replace("--", "+");
    } else {
      checkResult = result;
    }

    try {
      checkResult =cleanNum(checkResult)
      setResult(eval(checkResult) || "0");
      const result = (eval(checkResult) || "0") + "";
      const history = JSON.parse(localStorage.getItem("history")) || [];
      history.push({ id: result, value: checkResult });
      localStorage.setItem("history", JSON.stringify(history));
    } catch (e) {
      console.log(e)
      setResult("error");
    }
  };

  const reset = () => {
    setResult("0");
  };

  const backspace = () => {
    console.log(typeof result);
    const updatedResult  =  (result+"").substring(0, result.length - 1)
    if(updatedResult.length===0) {
      setResult(0)
    }
else {
  setResult(updatedResult)
}
  };

  const handleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
      <div className="calculator-body">
        <h1>Solvative Calculator Project</h1>
        <Button
          buttonText={showHistory ? "Hide History" : "Show History"}
          onClick={handleHistory}
          className= "historybutton"
        />
        <ResultComponent result={result} />
        <CalcKeyPad onClick={onClick} />
        {showHistory && <History />}
    </div>
  );
}

export default App;
