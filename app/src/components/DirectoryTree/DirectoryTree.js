import React, { useEffect, useState } from "react";
import MuiTreeView from "material-ui-treeview";

const DirectoryTree = ({ directoryItems, searchedDate, updatedDate }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(directoryItems);
  }, [directoryItems]);

  return (
    <div class="directory-tree-container">
      <span className="directory-details">
        <b className="inline">Searched date: </b>
        <p className="inline">{searchedDate.toString()}</p>
      </span>
      <div class="directory-tree">
        <MuiTreeView tree={items} />
      </div>
    </div>
  );
};

export default DirectoryTree;
