import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    valueGetter: (params) => params.getValue("game").id,
  },
  { field: "team_name", headerName: "Team", width: 130 },
  {
    field: "team",
    headerName: "Logo",
    width: 130,
    renderCell: (params) => {
      const logo = params.getValue("team").logo_url;
      return <img style={{ height: 40 }} src={logo} />;
    },
  },
  {
    field: "TOI",
    headerName: "TOI",
    // type: "number",
    width: 90,
    valueGetter: (params) => params.getValue("stat").TOI,
  },
  {
    field: "PTS",
    headerName: "PTS",
    width: 90,
    valueGetter: (params) => params.getValue("stat").PTS,
  },
  {
    field: "A",
    headerName: "A",
    width: 90,
    valueGetter: (params) => params.getValue("stat").A,
  },
  {
    field: "PM",
    headerName: "PM",
    width: 90,
    valueGetter: (params) => params.getValue("stat").PM,
  },
  {
    field: "PIM",
    headerName: "PIM",
    width: 90,
    sortable: false,
    valueGetter: (params) => params.getValue("stat").PIM,
  },
];

/**
 
{ id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
 */
const rows = [
  {
    id: 1,
    game: {
      id: 22522,
      date: "2020-11-13",
    },
    stat: {
      TOI: null,
      PTS: 1,
      A: 1,
      PIM: 2,
      PM: 1,
    },
    team_name: "Luleå HF",
    logo_url:
      "https://files.eliteprospects.com/layout/logos/lulea_old_2018.png",
    team: {
      id: 19181,
      logo_url:
        "https://files.eliteprospects.com/layout/logos/lulea_old_2018.png",
      name: "Luleå HF",
      country_name: "Sweden",
      flag_url: "https://files.eliteprospects.com/layout/flagsmedium/1.png",
    },
  },
];

export default function DataTable({ shl }) {
  //let rows = Array.isArray(shl) && shl.length > 0 ? shl : rows2;

  /* useEffect(() => {
    if (Array.isArray(shl) && shl.length > 0) {
      rows = shl;
    }
  }, [shl]); */
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
