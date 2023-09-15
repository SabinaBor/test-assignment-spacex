import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { SelectedLaunchesContext } from "../../../context/SelectedLaunchesContext";
import { calculateEnergyConsumptionForMany } from "../../../utils/calculateEnergyConsumption";
import { LaunchCalculationItem } from "../../molecules/launch-calculation-item";
import { ChartsList } from "../charts-list";
import Button from "@mui/joy/Button";
import { classNames } from "../../../utils/joinClassNames";
import { calculationSectionClasses as classes } from "../../../configs/classNames";
import styles from "./style.module.scss";

interface ICalculationSectionProps {
  visible: boolean;
}

export const CalculationSection: FC<ICalculationSectionProps> = ({
  visible,
}) => {
  const { launches } = useContext(SelectedLaunchesContext);
  const [graphsVisible, setGraphsVisible] = useState<boolean>(false);
  const rocketMasses = useMemo(
    () => launches.map((launch) => launch.rocketMass),
    [launches]
  );

  useEffect(() => {
    if (!visible) {
      setGraphsVisible(false);
    }
  }, [visible]);

  return (
    <div className={styles[classes.main]}>
      <p className={styles[classes.title]}>Estimated energy consumption</p>
      <p className={styles[classes.text]}>
        User selected {launches.length} launches to compare:
      </p>
      <p className={styles[classes.text]}>
        Total estimated energy consumption for the selected launches is
        (Joules):
      </p>
      <p className={styles[classes.result]}>
        {calculateEnergyConsumptionForMany(rocketMasses)}
      </p>
      <div className={styles[classes.button]}>
        <Button
          variant="solid"
          onClick={() => setGraphsVisible(!graphsVisible)}
        >
          {!graphsVisible ? "See graph" : "Hide graph"}
        </Button>
      </div>
      <div
        className={classNames(
          styles[classes.graphs],
          graphsVisible ? styles[classes.active] : ""
        )}
      >
        <ChartsList rocketMasses={rocketMasses} />
      </div>
      {launches.map((launch) => (
        <LaunchCalculationItem
          key={launch.id}
          className={styles[classes.launchItem]}
          launch={launch}
        />
      ))}
    </div>
  );
};
