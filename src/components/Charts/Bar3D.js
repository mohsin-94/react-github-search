import React, { Component } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

function Bar3D({ data }) {
  const chartConfigs = {
    type: "Bar3d",
    width: "100%",
    height: 400,
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Most Forked",
        decimals: 0,
        // pieRadius: "50%",
        yaxisname: "Starts",
        xaxisname: "Repos",
        theme: "fusion",
      },
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
}

export default Bar3D;
