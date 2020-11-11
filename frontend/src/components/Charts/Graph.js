import React, { useEffect } from "react";
import { drawChart, data, chartMultiLine } from "./functions";

export default function Graph({ id, type, title, average, icon }) {
  useEffect(() => {
    drawChart(id, data, title);
  }, []);

  return (
    <div className="col-md-4">
      <div className="card card-chart">
        <div className={"card-header card-header-" + type}>
          <div className="ct-chart" id={id + "Chart"}></div>
        </div>
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <p className="card-category">
            <span className={"text-" + type} style={{ fontSize: "30px" }}>
              <i className={"fa " + icon} aria-hidden="true"></i>
              <span className="ml-2" id={id}>
                {average.value}
              </span>
              <small>{" " + average.unit}</small>
            </span>
          </p>
        </div>
        <div className="card-footer">
          <div className="stats">
            <i className="material-icons">access_time</i> Updating
          </div>
        </div>
      </div>
    </div>
  );
}
