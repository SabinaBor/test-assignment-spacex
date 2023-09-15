import React, { FC } from "react";
import { ISelectedLaunch } from "../../../types/launch-list.types";
import {
  calculateEnergyConsumptionForLaunch,
  toExponential,
} from "../../../utils/calculateEnergyConsumption";

interface ILaunchCalculationItemProps {
  launch: ISelectedLaunch;
  className: string;
}

export const LaunchCalculationItem: FC<ILaunchCalculationItemProps> = ({
  launch,
  className,
}) => {
  return (
    <div className={className}>
      <p>
        For the single launch with the mission name:{" "}
        <strong>{launch.missionName}</strong>
      </p>
      <p>
        energy consumption =
        <strong>
          {toExponential(
            calculateEnergyConsumptionForLaunch(launch.rocketMass)
          )}
        </strong>
        Joules
      </p>
    </div>
  );
};
