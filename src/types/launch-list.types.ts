import { LaunchItemFragment } from "../graphql/launch-list/LaunchFragment.generated";

export interface IColumn {
  name: string;
  key: keyof LaunchItemFragment;
  styleName?: string;
  hasLink?: boolean;
}

export type ICustomValue = {
  [key in keyof LaunchItemFragment]: (obj: LaunchItemFragment) => string;
};

export interface ISelectedLaunch {
  id: string;
  rocketMass: number;
  missionName: string;
  launchYear: string;
}

export interface ICheckedList {
  checkedList: string[];
  allCheckedList: boolean;
  setCheckedList: (checked: CheckedTypes | string) => void;
}

export interface ITableProps {
  tableId: string;
  cols: IColumn[];
  rows: LaunchItemFragment[];
  page?: number;
  rowsPerPage?: number;
  isNumbered?: boolean;
  hasAction?: boolean;
  isSelectable?: boolean;
  customizableValues?: ICustomValue;
  footer?: React.ReactNode;
  checked?: ICheckedList;
  actionNode?: React.ReactNode;
  action?: (event: React.MouseEvent<HTMLElement>,row: LaunchItemFragment) => void
}

export enum CheckedTypes {
  all = "ALL",
  none = "NONE",
}

export interface IOption {
  value: string | number;
  name: string | number;
}

export interface IFilter {
    query: string;
    sort: string;
}