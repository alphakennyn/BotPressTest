import React, { useState } from "react";

const PathInput = ({ submitHandler }) => {
    const [pathInput, setPathInput] = useState('');

  const inputHandler = (e) => {
    setPathInput(e.target.value);
  };

  return (
    <span id="path-input">
      <input type="text" onChange={inputHandler} />
      <button onClick={() => submitHandler(pathInput)}>Submit</button>
    </span>
  );
};

export default PathInput;
