import { useEffect, useState } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import * as axios from "axios";

export default function Display({ color, loading }) {
  const [collection, setCollection] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/1.0.0/groups?color=${color}`)
      .then((result) => {
        if (result?.data) {
          setCollection(result.data);
        }
      });
  }, [color, loading]);

  const renderTree = (category, nodes) => (
    <TreeItem key={category} nodeId={category} label={category}>
      {!Array.isArray(nodes)
        ? Object.entries(nodes).map(([newCategory, newNodes]) =>
            renderTree(newCategory, newNodes)
          )
        : nodes.map((item) => (
            <TreeItem key={item + "1"} nodeId={item + "1"} label={item} />
          ))}
    </TreeItem>
  );

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{
        height: "100%",
        flexGrow: 1,
        width: "100%",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {Object.entries(collection).map(([category, list]) =>
        renderTree(category, list)
      )}
    </TreeView>
  );
}
