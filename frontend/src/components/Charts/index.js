import React from "react";
import Graph from "./Graph";
import Stats from "./Stats";
import Table from "./Table";
import DataTable from "./DataTable";
import { Header } from "../../Layouts";
import { withStyles } from "@material-ui/styles";
import { Container, Paper, Button } from "@material-ui/core";
import models from "../../store";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

const drawerWidth = 240;
const query =
  "{ logs { game { id  date } stat {   TOI   PTS   A   PIM   PM } team {   id   logo_url   name   country_name   flag_url } }}";

const data = {
  days: {
    1: {
      average: {
        temperature: 22,
        co2: 688,
        humidity: 27,
        pressure: 1001,
      },
    },
    2: {
      average: {
        temperature: 28,
        co2: 935,
        humidity: 31,
        pressure: 1040,
      },
    },
    25: {
      average: {
        temperature: 21,
        co2: 837,
        humidity: 29,
        pressure: 1010,
      },
    },
  },
};

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
});

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shl: [],
      stats: {
        usage: {
          door: { onTime: 0 },
          stove: { onTime: 0 },
          television: { onTime: 0 },
          light: { onTime: 0 },
        },
        average: {
          temperature: { value: 32, unit: "°C" },
          co2: { value: 954, unit: "mol" },
          humidity: { value: 26, unit: "g.m-3" },
          pressure: { value: 840, unit: "pas" },
        },
        days: {
          1: {
            average: {
              temperature: 26,
              co2: 1208,
              humidity: 24,
              pressure: 1202,
            },
          },
          2: {
            average: {
              temperature: 1,
              co2: 1453,
              humidity: 39,
              pressure: 1320,
            },
          },
        },

        weeks: {
          41: {
            average: {
              temperature: 40,
              co2: 960,
              humidity: 25,
              pressure: 589,
            },
          },
          42: {
            average: {
              temperature: 27,
              co2: 700,
              humidity: 34,
              pressure: 1083,
            },
          },
          43: {
            average: {
              temperature: 22,
              co2: 598,
              humidity: 29,
              pressure: 1019,
            },
          },
          44: {
            average: {
              temperature: 18,
              co2: 1019,
              humidity: 32,
              pressure: 1050,
            },
          },
          45: {
            average: {
              temperature: 20,
              co2: 892,
              humidity: 30,
              pressure: 1046,
            },
          },
        },
      },
    };
  }

  setForm(props) {
    const { stats, game_logs } = props;
    if (stats && stats.days && stats.weeks && stats.average) {
      this.setState({ stats });
    }
    if (game_logs && Object.keys(game_logs).length > 0) {
      Object.keys(game_logs).map((key) => {
        const log = game_logs[key];
        window.log = log;
        if (log.req.method == "POST" && window.log.res) {
          console.log("GameLog has response", key, window.log.res);
        }
      });
    }
  }

  componentDidMount() {
    const { login, users, readAction, createAction } = this.props;
    createAction({ query });
    if (login) {
      const user = users.find((u) => u.email === login.email);
      if (user && user.id) {
        readAction({ suffix: "/" + user.id + "/stats" });
        // const interval = 1000 * 60 * 10; // 10 min
        const interval = 1000 * 300;
        this.intID = setInterval(() => {
          console.log("READ Sensor data");
          readAction({ suffix: "/" + user.id + "/stats" });
        }, interval);
      }
    }
    this.setForm(this.props);
  }

  componentWillUnmount() {
    // clearInterval(this.intID);
  }

  componentWillReceiveProps(nextProps, nextConext) {
    this.setForm(nextProps);
  }

  render() {
    const { classes } = this.props;
    const { average, usage } = this.state.stats;
    const { temperature, co2, humidity, pressure } = average;
    let { door, stove, television, light } = usage;
    door = door && door.onTime ? door.onTime : 0;
    stove =
      stove && stove.onTime
        ? new Date(stove.onTime * 1000).toISOString().substr(11, 8)
        : "";
    television =
      television && television.onTime
        ? new Date(television.onTime * 1000).toISOString().substr(11, 8)
        : "";
    light =
      light && light.onTime
        ? new Date(light.onTime * 1000).toISOString().substr(11, 8)
        : "";
    return (
      <div className={classes.main}>
        <Header />

        <Container maxWidth="lg" style={{ marginTop: 20 }}>
          <div className="row">
            <Stats
              type="warning"
              icon="fa-windows"
              subicon="date_range"
              title="Door"
              subtitle="Door open frequency"
              data={door}
            />
            <Stats
              type="success"
              icon="fa-fire"
              subicon="warning"
              title="Stove"
              subtitle="Kitchen usage"
              data={stove}
            />
            <Stats
              type="danger"
              icon="fa-television"
              subicon="local_offer"
              title="TV"
              subtitle="TV on time"
              data={television}
            />
            <Stats
              type="info"
              icon="fa-lightbulb-o"
              subicon="update"
              title="Light"
              subtitle="Light on off"
              data={light}
            />
          </div>
          <div className="row">
            <Graph
              title="Temperature"
              type="success"
              id="temperature"
              average={temperature}
              icon="fa-thermometer-half"
            />
            <Graph
              title="Pressure"
              type="warning"
              id="pressure"
              average={pressure}
              icon="fa-flag"
            />
            <Graph
              title="Humidity"
              type="danger"
              id="humidity"
              average={humidity}
              icon="fa-tint"
            />
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="card">
                <div className={"card-header card-header-info"}>
                  <h4 className="card-title">Data table</h4>
                </div>
                <div className="card-body table-responsive">
                  <DataTable shl={this.state.shl} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

Charts.defaultProps = {
  average: {
    temperature: { value: 32, unit: "°C" },
    co2: { value: 954, unit: "mol" },
    humidity: { value: 26, unit: "g.m-3" },
    pressure: { value: 840, unit: "pas" },
  },
};

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = (state) => ({
  stats:
    state.sensor_datas.list.length > 0 ? state.sensor_datas.list[0] : undefined,
  login: state.logins.list.length > 0 ? state.logins.list[0] : undefined,
  users: state.users.list.length > 0 ? state.users.list : [],
  game_logs: state.game_logs.actions,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{readAction: UserReadAction}}
 */
const mapActionsToProps = {
  readAction: models.sensor_datas.actions.read,
  createAction: models.game_logs.actions.create,
};

export default withRouter(
  withStyles(styles)(connect(mapStateToProps, mapActionsToProps)(Charts))
);
