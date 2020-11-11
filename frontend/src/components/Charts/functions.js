export function drawChart(elementId, d, label) {
  let labels = [];

  let max = 0;
  var series0 = [];
  d.forEach((data) => {
    max = max > data[elementId] ? max : data[elementId];
    series0.push(data[elementId]);
    labels.push(data[elementId]);
  });
  var series = [series0];
  const dataTemperatureChart = {
    labels: labels,
    series: series,
  };

  const optionsTemperatureChart = {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 0,
    high: max + 10, // we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    showArea: false, // Shows a light shade area below line
    showLine: true, // Shows a prominant line
    showPoint: true, // Marks edges as points
    fullWidth: true,
  };

  var ds = new Chartist.Line(
    "#" + elementId + "Chart",
    dataTemperatureChart,
    optionsTemperatureChart
  );
  let historySeries = [];
}

export const data = [
  {
    color: "#f6cdc7",
    eco2: 1497,
    heading: "80.00",
    humidity: 37,
    pressure: 1362,
    temperature: 1200,
  },
  {
    color: "#aab0d0",
    eco2: 708,
    heading: "91.00",
    humidity: 34,
    pressure: 665,
    temperature: 450,
  },
  {
    color: "#fb4710",
    eco2: 681,
    heading: "8.00",
    humidity: 24,
    pressure: 999,
    temperature: 2400,
  },
  {
    color: "#435ffc",
    eco2: 452,
    heading: "210.00",
    humidity: 34,
    pressure: 1297,
    temperature: 750,
  },
  {
    color: "#6217a9",
    eco2: 1011,
    heading: "348.00",
    humidity: 29,
    pressure: 637,
    temperature: 1100,
  },
];

/**
 * Format data to series, numeric array of arrays
 * @param {*} data array of sensor data - days | weeks
 */
function formatData(data, length = 4) {
  const keys7 = data ? Object.keys(data).slice(0, length) : [];
  const temperatures = [];
  const co2 = [];
  const humidity = [];
  const pressure = [];

  keys7.forEach((k) => {
    temperatures.push(data[k]["average"]["temperature"]);
    co2.push(data[k]["average"]["co2"]);
    humidity.push(data[k]["average"]["humidity"]);
    pressure.push(data[k]["average"]["pressure"]);
  });
  const series = [
    temperatures.slice(0, length),
    co2.slice(0, length),
    humidity.slice(0, length),
    pressure.slice(0, length),
  ];
  console.log("formatData : ", series, data);
  return series;
}

export function chartMultiLine(elementId, data) {
  const series = formatData(data.days, 7);

  let labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  labels = labels.slice(0, series[0].length);
  var chart = new Chartist.Line(
    "#" + elementId,
    {
      labels: labels,
      series: series,
    },
    {
      low: 0,
      showArea: true,
      showPoint: false,
      fullWidth: true,
      plugins: [
        Chartist.plugins.legend({
          legendNames: ["Temperature", "CO2", "Humidity", "Pressure"],
        }),
      ],
    }
  );

  chart.on("draw", function (data) {
    if (data.type === "line" || data.type === "area") {
      data.element.animate({
        d: {
          begin: 2000 * data.index,
          dur: 2000,
          from: data.path
            .clone()
            .scale(1, 0)
            .translate(0, data.chartRect.height())
            .stringify(),
          to: data.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint,
        },
      });
    }
  });
}

export function chartBar(elementId, data) {
  const LENGHT = 4;
  let labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
  if (data && data.weeks) {
    labels = Object.keys(data.weeks).map((weekNumber) => "Week " + weekNumber);
  }
  labels = labels.slice(0, LENGHT);
  const series = formatData(data.weeks, labels.length);
  console.log("formatData series: ", data, series);

  new Chartist.Bar(
    "#" + elementId,
    {
      labels: labels,
      series: series,
    },
    {
      // Default mobile configuration
      fullWidth: true,
      plugins: [
        Chartist.plugins.legend({
          legendNames: ["Temperature", "CO2", "Humidity", "Pressure"],
        }),
      ],
      stackBars: true,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value
            .split(/\s+/)
            .map(function (word) {
              return word[0];
            })
            .join("");
        },
      },
      axisY: {
        offset: 20,
      },
    },
    [
      // Options override for media > 400px
      [
        "screen and (min-width: 400px)",
        {
          reverseData: true,
          horizontalBars: true,
          axisX: {
            labelInterpolationFnc: Chartist.noop,
          },
          axisY: {
            offset: 60,
          },
        },
      ],
      // Options override for media > 800px
      [
        "screen and (min-width: 800px)",
        {
          stackBars: false,
          seriesBarDistance: 10,
        },
      ],
      // Options override for media > 1000px
      [
        "screen and (min-width: 1000px)",
        {
          reverseData: false,
          horizontalBars: false,
          seriesBarDistance: 15,
        },
      ],
    ]
  );
}
