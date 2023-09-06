import React from "react";
import { calculator } from "./Constants";
import Button from "./Button";

function CalcKeyPad({ onClick }) {
  return (
    <div className="buttons">
      {calculator?.map((obj,index) => {
        return (
          <Button key ={index} id={obj.id} onClick={() => onClick(obj)} className={obj.type}>
            {obj.display}
          </Button>
        );
      })}
    </div>
  );
}

export default CalcKeyPad;
