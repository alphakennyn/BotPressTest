import React, { useEffect, useState } from "react";
import MuiTreeView from "material-ui-treeview";

const DirectoryTree = ({ directoryItems, searchedDate, path }) => {
  const [items, setItems] = useState([]);
  const [initialSearchAt, setInitialiSearchAt] = useState("");

  useEffect(() => {
    setInitialiSearchAt(searchedDate);
    // return () => setInitialiSearchAt(null)
  }, []);

  useEffect(() => {
    setItems(directoryItems);
  }, [directoryItems]);

  return (
    <div class="directory-tree-container container min-width">
      <div class="display-column">
        <span className="directory-details">
          <b className="inline">Path: </b>
          <p className="inline">{path}</p>
        </span>
        <span className="directory-details">
          <b className="inline">Initial search: </b>
          <p className="inline">{initialSearchAt.toString()}</p>
        </span>
        <span className="directory-details">
          <b className="inline">Last updated: </b>
          <p className="inline">{searchedDate.toString()}</p>
        </span>
      </div>
      <div class="directory-tree">
        <MuiTreeView tree={items} />
      </div>
    </div>
  );
};

export default DirectoryTree;
