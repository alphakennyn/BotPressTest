import React, { useEffect, useState } from "react";
import MuiTreeView from "material-ui-treeview";

const DirectoryTree = ({ directoryItems }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(directoryItems);
  }, [directoryItems]);

  return (
    <div class="directory-tree">
      <MuiTreeView tree={items}/>
    </div>
  );
};

export default DirectoryTree;
