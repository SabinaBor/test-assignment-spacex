import React from "react";
import { ISelectedLaunch } from "../types/launch-list.types";
import { LaunchItemFragment } from "../graphql/launch-list/LaunchFragment.generated";

interface ISelectedLaunchesContext {
  launches: ISelectedLaunch[];
  clickedLaunch: LaunchItemFragment;
}

export const SelectedLaunchesContext =
  React.createContext<ISelectedLaunchesContext>({
    launches: [],
    clickedLaunch: {},
  });

export function SelectedLaunchesContextProvider({
  children,
  launches,
  clickedLaunch,
}: {
  children: React.ReactNode;
  launches: ISelectedLaunch[];
  clickedLaunch: LaunchItemFragment;
}) {
  return (
    <SelectedLaunchesContext.Provider value={{ launches, clickedLaunch }}>
      {children}
    </SelectedLaunchesContext.Provider>
  );
}
