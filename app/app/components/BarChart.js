"use client";

import React from "react";
import Highcharts from "highcharts";
import {useEffect} from "react";

export default function BarChart({data}) {
  let categories = [];
  let series = [];

  for (let key in data) {
    categories.push(data[key].name);
    series.push(data[key].amount);
  }

  useEffect(() => {
    Highcharts.chart("basic-bar-chart", {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Accrued expenses by Account Group'
      },
      xAxis: {
        categories: categories
      },
      yAxis: [{
        min: 0,
        title: {
          text: 'Expends (MXN)'
        }
      }],
      legend: {
        shadow: false
      },
      tooltip: {
        shared: true
      },
      plotOptions: {
        column: {
          grouping: false,
          shadow: false,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Amount',
        color: 'rgba(165,170,217,1)',
        data: series,
        pointPadding: 0.3,
        pointPlacement: -0.2
      }]
    });
  }, []);

  return <div id="basic-bar-chart" className="w-full  shadow-md"></div>;
}