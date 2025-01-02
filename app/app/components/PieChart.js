"use client";

import React from 'react';
import Highcharts from 'highcharts';
import {useEffect} from "react";

export default function PieChart({data}) {
  let series = []

  for (let key in data) {
    series.push([data[key].name, data[key].amount])
  }

  useEffect(() => {
    Highcharts.chart('pie-chart', {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Distribution of expenses by account group'
      },
      series: [
        {
          name: 'Account Groups',
          data: series
        }
      ]
    })
  }, [])

  return (
    <div id="pie-chart" className="w-full shadow-md"></div>
  )
}