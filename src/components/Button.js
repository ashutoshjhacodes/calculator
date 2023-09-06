import React from "react";
const Button = (props) => {
  const { onClick, buttonText, className, children } = props;
  return (
    <button className={className} onClick={onClick}>
      {children || buttonText}
    </button>
  );
};

export default Button;

