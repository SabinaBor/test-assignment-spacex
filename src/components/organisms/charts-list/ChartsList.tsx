import React, { FC, useContext } from "react";
import { BaseChart } from "../../atoms/chart";
import { SelectedLaunchesContext } from "../../../context/SelectedLaunchesContext";
import styles from "./style.module.scss";
import {
  useBarOptionsFirst,
  useBarOptionsSecond,
  useEnergySeries,
  useLineChartOptions,
  useMassSeries,
  useYearSeries,
} from "../../../hooks/useCharts";

interface IChartsListProps {
  rocketMasses: number[];
}

export const ChartsList: FC<IChartsListProps> = ({ rocketMasses }) => {
  const { launches } = useContext(SelectedLaunchesContext);

  const [options] = useBarOptionsFirst(launches);
  const [optionsSecond] = useBarOptionsSecond(launches);
  const [lineChartOptions] = useLineChartOptions(launches);
  const [energySeries] = useEnergySeries(launches);
  const [massSeries] = useMassSeries(launches);
  const yearSeries = useYearSeries(launches);

  return (
    <div className={styles.charts}>
      <BaseChart type="bar" series={energySeries} options={options} />
      <BaseChart type="bar" series={massSeries} options={optionsSecond} />
      <BaseChart type="line" series={yearSeries} options={lineChartOptions} />
    </div>
  );
};
