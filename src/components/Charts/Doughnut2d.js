import React, { Component } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

function Doughnut2d({ data }) {
  const chartConfigs = {
    type: "doughnut2d",
    width: "100%",
    height: 400,
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Start Rating",
        decimals: 0,
        pieRadius: "40%",
        showPercentValues: 0,
        showPercentInTooltip: 0,
        theme: "candy",
      },
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
}

export default Doughnut2d;
