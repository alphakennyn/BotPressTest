import React, { useRef, useState } from "react";
import usePathsManager from "../../hooks/usePathsManager";

const INIT_PATH_INPUT = {
  pathInput0: "",
};

const PathInput = ({ submitHandler }) => {
  const [pathInputs, setPathInputs] = useState(INIT_PATH_INPUT);

  const [addPath, verifyPath] = usePathsManager();

  const inputHandler = (e) => {
    setPathInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
  };

  const cleanUpInput = (path) => {
    return path.replace(/\s/g, "");
  };

  const onClickHandler = () => {
    try {
      const cleanedPaths = Object.values(pathInputs).map((pathInput) => {
        const cleanedPath = cleanUpInput(pathInput);
        verifyPath(cleanedPath);
        return cleanedPath;
      });

      cleanedPaths.forEach(async (cleanedPath) => {
        console.log(cleanedPath);
        await submitHandler(cleanedPath);
      });

      addPath(cleanedPaths);
    } catch (error) {
      alert(error.message);
      setPathInputs(INIT_PATH_INPUT);
    }
  };

  const removeLastRow = () => {
    const lastKey = Object.keys(pathInputs).pop();
    const newMap = { ...pathInputs };
    delete newMap[lastKey];

    setPathInputs(newMap);
  };

  const addNewRow = () => {
    setPathInputs((prevInputs) => ({
      ...prevInputs,
      [`pathInput${Object.keys(prevInputs).length}`]: "",
    }));
  };

  return (
    <div class="vertical-margin min-width">
      <div class="display-column">
        {Object.keys(pathInputs).map((key) => (
          <input
            className="margin-btn-space input-box"
            key={key}
            name={key}
            type="text"
            onChange={inputHandler}
          />
        ))}
      </div>
      <div id="btn-group">
        <span>
          <button onClick={removeLastRow}>Remove</button>
          <button onClick={addNewRow}>Add</button>
        </span>
        <button onClick={onClickHandler}>Submit</button>
      </div>
    </div>
  );
};

export default PathInput;
