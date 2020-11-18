import React from "react";

export const columns = [
  {
    field: "id",
    headerName: "#",
    width: 80,
  },
  { field: "name", headerName: "Team", width: 130 },
  {
    field: "url",
    headerName: "Logo",
    width: 120,
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
      row1.data?.stat?.GP - row2.data?.stat?.GP,
    type: "number",
    width: 80,
    valueGetter: (params) => params.getValue("stat").GP,
  },
  {
    field: "W",
    headerName: "W",
    width: 70,
    sortable: true,
    sortComparator: (v1, v2, row1, row2) =>
      row1.data?.stat?.W - row2.data?.stat?.W,
    type: "number",
    valueGetter: (params) => params.getValue("stat").W,
  },
  {
    field: "L",
    headerName: "L",
    width: 70,
    sortable: true,
    sortComparator: (v1, v2, row1, row2) =>
      row1.data?.stat?.L - row2.data?.stat?.L,
    type: "number",
    valueGetter: (params) => params.getValue("stat").L,
  },
  {
    field: "T",
    headerName: "T",
    width: 70,
    sortable: true,
    sortComparator: (v1, v2, row1, row2) =>
      row1.data?.stat?.T - row2.data?.stat?.T,
    type: "number",
    valueGetter: (params) =>
      params.getValue("stat").T ? params.getValue("stat").T : "-",
  },
  {
    field: "OTW",
    headerName: "OTW",
    width: 100,
    sortable: true,
    sortComparator: (v1, v2, row1, row2) =>
      row1.data?.stat?.OTW - row2.data?.stat?.OTW,
    type: "number",
    valueGetter: (params) => params.getValue("stat").OTW,
  },
  {
    field: "OTL",
    headerName: "OTL",
    width: 100,
    sortable: true,
    sortComparator: (v1, v2, row1, row2) =>
      row1.data?.stat?.OTL - row2.data?.stat?.OTL,
    type: "number",
    valueGetter: (params) => params.getValue("stat").OTL,
  },
  {
    field: "GF",
    headerName: "GF",
    width: 80,
    sortable: true,
    sortComparator: (v1, v2, row1, row2) =>
      row1.data?.stat?.GF - row2.data?.stat?.GF,
    type: "number",
    valueGetter: (params) => params.getValue("stat").GF,
  },
  {
    field: "GA",
    headerName: "GA",
    width: 80,
    sortable: true,
    sortComparator: (v1, v2, row1, row2) =>
      row1.data?.stat?.GA - row2.data?.stat?.GA,
    type: "number",
    valueGetter: (params) => params.getValue("stat").GA,
  },
  {
    field: "GD",
    headerName: "GD",
    width: 80,
    sortable: true,
    sortComparator: (v1, v2, row1, row2) =>
      row1.data?.stat?.GD - row2.data?.stat?.GD,
    type: "number",
    valueGetter: (params) => `${params.getValue("stat").GD}`,
  },
  {
    field: "position",
    headerName: "POS",
    width: 90,
    type: "number",
    sortable: true,
  },
];
