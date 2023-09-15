import { IColumn } from "../types/launch-list.types";

export const columns: IColumn[] = [
  {
    name: "Mission name",
    key: "mission_name",
    styleName: "main",
    hasLink: true,
  },
  {
    name: "Launch date",
    key: "launch_date_utc",
    styleName: "date",
  },
  {
    name: "Rocket name",
    key: "rocket",
    styleName: "date",
  },
  {
    name: "Upcoming",
    key: "upcoming",
    styleName: "date",
  },
  {
    name: "Details",
    key: "details",
    styleName: "inline",
  },
];

// Properties which values we want to present in a formatted way in the table
export const customizableKeys = ["launch_date_utc", "rocket", "upcoming"];
