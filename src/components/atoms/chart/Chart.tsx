import React, { FC } from "react";
import styles from "./style.module.scss";
import Chart from "react-apexcharts";

type ApexType =
  | "area"
  | "line"
  | "bar"
  | "pie"
  | "donut"
  | "radialBar"
  | "scatter"
  | "bubble"
  | "heatmap"
  | "candlestick"
  | "boxPlot"
  | "radar"
  | "polarArea"
  | "rangeBar"
  | "rangeArea"
  | "treemap"
  | undefined;

interface IChartProps {
  options?: ApexCharts.ApexOptions;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  type: ApexType;
}

export const BaseChart: FC<IChartProps> = ({ options, series, type }) => {
  const defaultOptions = {};

  return (
    <div className={styles.chart}>
      <Chart options={options || defaultOptions} series={series} type={type} />
    </div>
  );
};
