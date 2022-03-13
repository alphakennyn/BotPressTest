import React, { useState } from "react";

const PathInput = ({ submitHandler }) => {
    const [pathInput, setPathInput] = useState('');

  const inputHandler = (e) => {
    setPathInput(e.target.files);
  };

  const clickHandler = () => {

    // validate pathInput regex

    submitHandler(pathInput)
  }

  return (
    <span id="path-input">
      <input type="text" onChange={inputHandler} />
      <button onClick={clickHandler}>Submit</button>
    </span>
  );
};

export default PathInput;
