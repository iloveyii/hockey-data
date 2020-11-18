import React, { useEffect } from "react";
import { DataGrid, numberComparer } from "@material-ui/data-grid";
import { ObjectID } from "bson";
import { withStyles } from "@material-ui/styles";
import { styles } from "./styles";
import { columns } from "./columns";

const sortModel = [
  {
    field: "position",
    sort: "asc",
  },
];

class ShlGrid extends React.Component {
  render() {
    let { shl } = this.props;
    shl = shl.map((row, i) => ({ ...row, id: i + 1 }));
    return (
      <div style={{ height: 750, width: "100%" }}>
        <DataGrid rows={shl} columns={columns} />
      </div>
    );
  }
}

export default ShlGrid;
