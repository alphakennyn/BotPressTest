import React, { useEffect, useState } from "react";
import DirectoryTree from "../DirectoryTree";

const DirectoryBox = ({ viewingDirectoryList = [] }) => {
    console.log(viewingDirectoryList)

  return (
    viewingDirectoryList.length > 0 ? (
      <div id="directory-box">
        {viewingDirectoryList.map((directory) => (
          <DirectoryTree directoryItems={directory} />
        ))}
      </div>
    ) : ''
  );
};

export default DirectoryBox;
