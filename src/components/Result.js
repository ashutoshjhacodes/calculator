import React from "react";

function Result({ result , operations }) {
  return (
    <div className="result">
      <p>{operations}</p>
      <p>{result}</p>
    </div>
  );
}

export default Result;