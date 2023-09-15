import React, { FC, useEffect, useState, useCallback } from "react";
import styles from "./style.module.scss";
import { useGetLaunchesQuery } from "../../../graphql/launch-list/LaunchList.generated";
import { LaunchItemFragment } from "../../../graphql/launch-list/LaunchFragment.generated";
import { CustomizedTable } from "../../molecules/table";
import { columns, customizableKeys } from "../../../configs/launchListValues";
import { ICustomValue, CheckedTypes, ISelectedLaunch, IFilter } from "../../../types/launch-list.types";
import { TableFooter } from "../../molecules/table-footer";
import { launchListClasses as classes } from "../../../configs/classNames";
import Button from '@mui/joy/Button';
import moment from "moment";
import { SortSelectionForm } from "../../molecules/sort-selection-form";
import { useAllLaunchesIds, useLaunches, useTotalLaunches } from "../../../hooks/useLaunches";
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import IconButton from "@mui/joy/IconButton";

interface ILaunchListProps {
  setLoading: (loading: boolean) => void;
  setSelectedLaunches: (value: ISelectedLaunch[]) => void;
  setClickedLaunch: (value: LaunchItemFragment) => void;
}

export const LaunchList: FC<ILaunchListProps> = ({ setLoading, setSelectedLaunches, setClickedLaunch }) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [filter, setFilter] = useState<IFilter>({
    query: "",
    sort: "default"
  });

  const { data, loading } = useGetLaunchesQuery();
  const [launches] = useLaunches(data, filter, page, rowsPerPage);
  const [totalLaunches] = useTotalLaunches(data, filter);
  const [allLaunchesIds] = useAllLaunchesIds(data, filter);

  const changeLoading = useCallback((loading: boolean) => setLoading(loading), [setLoading]);
  const formatRocketName = (launch: LaunchItemFragment): string => launch?.rocket?.rocket_name || "";
  const formatIsUpcoming = (launch: LaunchItemFragment): string => `${!!launch?.upcoming}`;
  const formatLaunchDate = (launch: LaunchItemFragment): string => moment(launch.launch_date_utc).format("L");

  const customizableValues: ICustomValue = {};
  customizableKeys.forEach(key => {
    if (key === 'rocket') {
      customizableValues[key] = formatRocketName;
    }
    if (key === "launch_date_utc") {
      customizableValues[key] = formatLaunchDate;
    }
    if (key === 'upcoming') {
      customizableValues[key] = formatIsUpcoming;
    }
  });

  useEffect(() => {
    changeLoading(loading);
  }, [loading, changeLoading]);

  // Changing sort or typing into the search input initializes page state
  useEffect(() => {
    setPage(0);
  }, [filter])

  // Processing checked and unchecked launches
  function checkUncheckAll(checked: CheckedTypes | string): void {
    if (checked === CheckedTypes.all) {
      setCheckedList(allLaunchesIds);
    } else if (checked === CheckedTypes.none) {
      setCheckedList([]);
    } else if (checkedList.includes(checked)) {
      setCheckedList(checkedList.filter(str => str !== checked));
    } else {
      setCheckedList([...checkedList, checked]);
    }
  }

  // Retrieve only required properties for calculations from launches array
  function getRocketMasses() {
    if (!data || !data.launches) {
      return [];
    }

    const result: ISelectedLaunch[] = data.launches
      .filter(launch => !!launch && !!launch.id ? checkedList.includes(launch.id) : false)
      .map(launch => ({
        id: !!launch && !!launch.id ? launch.id : "",
        rocketMass: launch?.rocket?.rocket?.mass?.kg ? +launch.rocket.rocket.mass.kg : 0,
        missionName: !!launch && !!launch.mission_name ? launch.mission_name : "",
        launchYear: !!launch && !!launch.launch_date_utc ?
          new Date(launch.launch_date_utc).getFullYear().toString() :
          ""
      }));
    setSelectedLaunches(result);
  }

  // If no data, show message
  if ((!data || !data.launches || !data.launches.length) && !loading) {
    return (
      <div className={styles[classes.error]}>No launches found</div>
    )
  }

  return (
    <>
      {!loading &&
        <div className={styles[classes.main]}>
          <div className={styles[classes.button]}>
            <Button variant="solid" disabled={!checkedList.length} onClick={getRocketMasses}>
              Calculate energy consumption
            </Button>
          </div>
          <SortSelectionForm filter={filter} setFilter={setFilter} />
          <CustomizedTable
            tableId="LaunchesTable"
            cols={columns}
            rows={launches as LaunchItemFragment[]}
            page={page}
            rowsPerPage={rowsPerPage}
            customizableValues={customizableValues}
            isNumbered
            isSelectable
            hasAction
            checked={{
              checkedList: checkedList,
              setCheckedList: (checked: CheckedTypes | string) => checkUncheckAll(checked),
              allCheckedList: checkedList.length === totalLaunches
            }}
            footer={
              launches.length ?
                <TableFooter
                  colspan={columns.length + 3} // isSelectable, hasAction and isNumbered add three extra columns
                  total={totalLaunches}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  page={page}
                  setPage={setPage}
                />
                : ''
            }
            actionNode={
              <IconButton
                size="sm"
                color="neutral"
                disabled={page === 0}
                sx={{ bgcolor: "background.surface" }}
              >
                <LaunchOutlinedIcon />
              </IconButton>
            }
            action={
              (event: React.MouseEvent<HTMLElement>, row: LaunchItemFragment) => {
                setClickedLaunch(row);
              }
            }
          />
          {!launches.length && <div className={styles[classes.error]}>No launches found</div>}
        </div>
      }
    </>
  );
};
