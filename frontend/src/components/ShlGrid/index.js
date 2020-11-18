import React, { useEffect } from "react";
import { DataGrid, numberComparer } from "@material-ui/data-grid";
import { ObjectID } from "bson";
import { withStyles } from "@material-ui/styles";
import { styles } from "./styles";
import { columns } from "./columns";
import { logs } from "./mock";

const sortModel = [
  {
    field: "position",
    sort: "asc",
  },
];

class ShlGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: logs };
  }

  setForm = (props) => {
    const { shl } = props;
    if (shl && Array.isArray(shl) && shl.length > 0) {
      console.log("SHL");
      const data = shl.map((row, i) => ({ ...row, id: i + 1 }));
      this.setState({ data });
    }
  };

  componentDidMount() {
    this.setForm(this.props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setForm(nextProps);
  }
  render() {
    const { data } = this.state;

    return (
      <div style={{ minHeight: 750, width: "100%", overflow: "auto" }}>
        <DataGrid rows={data} columns={columns} />
      </div>
    );
  }
}

export default ShlGrid;
