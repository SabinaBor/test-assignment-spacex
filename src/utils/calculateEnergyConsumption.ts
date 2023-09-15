import { MASS_FUEL, ENERGETIC_VALUE_OF_FUEL } from "../configs/constants";

// Get the total mass of fuel required for a launch to LEO
function calculateTotalMassToLEO(rocketMass: number) {
  return rocketMass / MASS_FUEL;
}

// Get the energy consumption value for one launch
export function calculateEnergyConsumptionForLaunch(rocketMass: number) {
  return calculateTotalMassToLEO(rocketMass) * ENERGETIC_VALUE_OF_FUEL;
}

// Formats number to exponential
export function toExponential(num: number) {
  return num.toExponential(7).replace("+", "");
}

// Get the energy consumption value for many launches
export function calculateEnergyConsumptionForMany(rocketMasses: number[]) {
  return toExponential(
    rocketMasses.reduce(
      (acc, curr) => acc + calculateEnergyConsumptionForLaunch(curr),
      0
    )
  );
}
