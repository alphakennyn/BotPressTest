import React, { useEffect, useState } from "react";
import DirectoryTree from "../DirectoryTree";
import Loading from "../Loading";

const DirectoryBox = ({ viewingDirectoryList, isLoadingNewDirectory }) => {
  return (
    <div class="center">
      <div id="directory-box">
        {isLoadingNewDirectory && <Loading />}
        {viewingDirectoryList.map((directory) => (
          <DirectoryTree
            directoryItems={directory.data}
            searchedDate={directory.searchedDate}
            path={directory.path}
          />
        ))}
      </div>
    </div>
  );
};

export default DirectoryBox;
