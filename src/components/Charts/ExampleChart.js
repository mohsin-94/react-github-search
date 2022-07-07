import React, { Component } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
const charts = {
  caption: "Language",
  theme: "fusion",
};

function ExampleChart() {
  const data = [
    {
      label: "Venezuela",
      value: "290",
    },
    {
      label: "Saudi",
      value: "260",
    },
    {
      label: "Canada",
      value: "180",
    },
    {
      label: "Iran",
      value: "140",
    },
    {
      label: "Russia",
      value: "115",
    },
    {
      label: "UAE",
      value: "100",
    },
    {
      label: "US",
      value: "30",
    },
    {
      label: "China",
      value: "30",
    },
  ];
  const chartConfigs = {
    type: "pie3d",
    width: 600,
    height: 400,
    dataFormat: "json",
    dataSource: {
      charts,
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
}

export default ExampleChart;
