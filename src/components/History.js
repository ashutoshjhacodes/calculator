import React, { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    try {
      setHistory(JSON.parse(localStorage.getItem("history")));
    } catch (error) {
      console.error("errror::", error);
    }
  }, []);
  console.log(history);
  return (
    <div className="history">
      <h2>Past Records or History </h2>
      {history && history.length >= 1 ? (
        history?.map((value) => {
          return <div>{`  ${value.value} =  ${value.id}`}</div>;
        })
      ) : (
        <div>No History Found</div>
      )}
    </div>
  );
}

export default History;