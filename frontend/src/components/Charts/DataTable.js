import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { ObjectID } from "bson";
import { withStyles } from "@material-ui/styles";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
  },
  { field: "name", headerName: "Team", width: 130 },
  {
    field: "url",
    headerName: "Logo",
    width: 130,
    renderCell: (params) => {
      const url = params.getValue("url");
      return <img style={{ height: "40px" }} src={url} />;
    },
  },
  {
    field: "GP",
    headerName: "GP",
    sortable: true,
    sortComparator: (v1, v2, row1, row2) =>
      row1.data.stat?.GP - row2.data.stat?.GP,
    type: "number",
    width: 90,
    valueGetter: (params) => params.getValue("stat").GP,
  },
  {
    field: "W",
    headerName: "W",
    width: 90,
    sortable: true,
    sortComparator: (v1, v2, row1, row2) =>
      row1.data.stat?.W - row2.data.stat?.W,
    type: "number",
    valueGetter: (params) => params.getValue("stat").W,
  },
  {
    field: "L",
    headerName: "L",
    width: 120,
    sortable: true,
    sortComparator: (v1, v2, row1, row2) =>
      row1.data.stat?.L - row2.data.stat?.L,
    type: "number",
    valueGetter: (params) => params.getValue("stat").L,
  },
  {
    field: "T",
    headerName: "T",
    width: 50,
    sortable: true,
    sortComparator: (v1, v2, row1, row2) =>
      row1.data.stat?.T - row2.data.stat?.T,
    type: "number",
    valueGetter: (params) =>
      params.getValue("stat").T ? params.getValue("stat").T : "-",
  },
  {
    field: "OTW",
    headerName: "OTW",
    width: 50,
    sortable: true,
    sortComparator: (v1, v2, row1, row2) =>
      row1.data.stat?.OTW - row2.data.stat?.OTW,
    type: "number",
    valueGetter: (params) => params.getValue("stat").OTW,
  },
  {
    field: "OTL",
    headerName: "OTL",
    width: 50,
    sortable: true,
    sortComparator: (v1, v2, row1, row2) =>
      row1.data.stat?.OTL - row2.data.stat?.OTL,
    type: "number",
    valueGetter: (params) => params.getValue("stat").OTL,
  },
  {
    field: "GF",
    headerName: "GF",
    width: 50,
    sortable: true,
    sortComparator: (v1, v2, row1, row2) =>
      row1.data.stat?.GF - row2.data.stat?.GF,
    type: "number",
    valueGetter: (params) => params.getValue("stat").GF,
  },
  {
    field: "GA",
    headerName: "GA",
    width: 50,
    sortable: true,
    sortComparator: (v1, v2, row1, row2) =>
      row1.data.stat?.GA - row2.data.stat?.GA,
    type: "number",
    valueGetter: (params) => params.getValue("stat").GA,
  },
  {
    field: "GD",
    headerName: "GD",
    width: 50,
    sortable: true,
    sortComparator: (v1, v2, row1, row2) =>
      row1.data.stat?.GD - row2.data.stat?.GD,
    type: "number",
    valueGetter: (params) => `${params.getValue("stat").GD}`,
  },
  {
    field: "position",
    headerName: "POS",
    width: 50,
    type: "number",
    sortable: true,
  },
];

const styles = (theme) => ({
  main: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    backgroundColor: "red",
  },
});

const sortModel = [
  {
    field: "GD",
    sort: "asc",
  },
];

class DataTable extends React.Component {
  componentDidMount() {
    console.log("GameLog componentDidMount", this.props);
  }
  componentWillReceiveProps(nextProps, nextContext) {
    console.log("GameLog componentWillReceiveProps", nextProps);
  }
  render() {
    let { shl } = this.props;
    shl = shl.map((row, i) => ({ ...row, id: i + 1 }));
    return (
      <div style={{ height: 600, width: "100%" }}>
        {shl.length > 1 && <DataGrid rows={shl} columns={columns} />}
        {shl.length < 2 && <p>Rows Length {shl.length}</p>}
      </div>
    );
  }
}

export default DataTable;
