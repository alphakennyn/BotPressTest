import React, { useRef, useState } from "react";
import usePathsManager from "../../hooks/usePathsManager";

const PathInput = ({ submitHandler }) => {
    const [pathInput, setPathInput] = useState('');
    const inputEl = useRef();

    const [addPath, verifyPath] = usePathsManager();


  const inputHandler = (e) => {
    setPathInput(e.target.value);
  };

  const onClickHandler = () => {
    try {
      verifyPath(pathInput)
      addPath([pathInput])
      submitHandler(pathInput)
    } catch (error) {
      alert(error.message)
      setPathInput('')
      inputEl.current.value = ""
    }
  }

  return (
    <span id="path-input">
      <input type="text" ref={inputEl} onChange={inputHandler} />
      <button onClick={onClickHandler}>Submit</button>
    </span>
  );
};

export default PathInput;
