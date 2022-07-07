import React, { Component } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

function Pie3D({ data }) {
  const chartConfigs = {
    type: "pie3d",
    width: "100%",
    height: 400,
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Language",
        decimals: 0,
        pieRadius: "40%",
        theme: "fusion",
      },
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
}

export default Pie3D;
