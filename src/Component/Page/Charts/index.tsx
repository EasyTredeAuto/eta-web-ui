import React from "react"
import ReactApexChart from "react-apexcharts"
import { chartOptionsCandlestick, series } from "./options"


export default function Charts() {
  return (
    <div className="chart-box" style={{width: "40%"}} >
      <div id="chart">
        <ReactApexChart
         options={chartOptionsCandlestick}
         series={series}
         type="candlestick"
         height={350}
        />
      </div>
    </div>
  )
}
