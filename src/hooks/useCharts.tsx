import React, { useMemo } from "react";
import { defaultOptions } from "../configs/chartOptions";
import { ISelectedLaunch } from "../types/launch-list.types";
import { thousandSeparator } from "../utils/thousandSeparator";
import { calculateEnergyConsumptionForLaunch } from "../utils/calculateEnergyConsumption";

// Creates options for the first bar graph
export const useBarOptionsFirst = (launches: ISelectedLaunch[]) => {
  const options: ApexCharts.ApexOptions = useMemo(
    () =>
      defaultOptions(
        "Energy consumption of every launch",
        "Mission name",
        launches.map((launch) => launch.missionName),
        function (value) {
          return value?.toExponential(7);
        }
      ),
    [launches]
  );
  return [options];
};

// Creates options for the second bar graph
export const useBarOptionsSecond = (launches: ISelectedLaunch[]) => {
  const options: ApexCharts.ApexOptions = useMemo(
    () =>
      defaultOptions(
        "Rocket mass used for a launch",
        "Mission name",
        launches.map((launch) => launch.missionName),
        function (value) {
          return thousandSeparator(value);
        }
      ),
    [launches]
  );
  return [options];
};

// Creates an object that contains total energy consumption per a year
export const useEnergyOverYears = (launches: ISelectedLaunch[]) => {
  const energyOverYears: { [key in string]: number } = useMemo(() => {
    const result: { [key in string]: number } = {};

    launches.forEach((launch) => {
      const calculatedEnergy = calculateEnergyConsumptionForLaunch(
        launch.rocketMass
      );
      result[launch.launchYear] = result[launch.launchYear]
        ? result[launch.launchYear] + calculatedEnergy
        : calculatedEnergy;
    });
    return result;
  }, [launches]);

  return [energyOverYears];
};

// Creates options for the line chart
export const useLineChartOptions = (launches: ISelectedLaunch[]) => {
  const [energyOverYears] = useEnergyOverYears(launches);
  const options: ApexCharts.ApexOptions = useMemo(
    () =>
      defaultOptions(
        "Total energy consumption of all launches in a year",
        "Launch year",
        Object.keys(energyOverYears),
        function (value) {
          return value?.toExponential(7);
        }
      ),
    [energyOverYears]
  );
  return [options];
};

// Creates series for the first bar graph
export const useEnergySeries = (launches: ISelectedLaunch[]) => {
  const series = useMemo(() => {
    return [
      {
        name: "Energy consumption",
        data: launches.map((launch) =>
          calculateEnergyConsumptionForLaunch(launch.rocketMass)
        ),
      },
    ];
  }, [launches]);
  return [series];
};

// Creates series for the second bar graph
export const useMassSeries = (launches: ISelectedLaunch[]) => {
  const series = useMemo(() => {
    return [
      {
        name: "Rocket mass",
        data: launches.map((launch) => launch.rocketMass),
      },
    ];
  }, [launches]);
  return [series];
};

// Creates series for the line chart
export const useYearSeries = (launches: ISelectedLaunch[]) => {
  const [energyOverYears] = useEnergyOverYears(launches);
  const series = useMemo(
    () => ({
      name: "Energy consumption",
      data: Object.values(energyOverYears),
    }),
    [energyOverYears]
  );
  return [series];
};
