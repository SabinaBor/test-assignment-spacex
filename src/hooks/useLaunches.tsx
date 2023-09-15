import React, { useMemo } from "react";
import { GetLaunchesQuery } from "../graphql/launch-list/LaunchList.generated";
import { IFilter } from "../types/launch-list.types";

// A function that returns launches sorted by properties
export const useSortedLaunches = (
  data: GetLaunchesQuery | undefined,
  filter: IFilter
) => {
  const sortedLaunches = useMemo(() => {
    if (!data || !data.launches) {
      return [];
    }
    if (filter.sort === "upcoming") {
      return [...data?.launches].sort((a, b) => {
        if (
          typeof a?.upcoming !== "boolean" ||
          typeof b?.upcoming !== "boolean"
        ) {
          return 0;
        }
        return +b.upcoming - +a.upcoming;
      });
    } else if (filter.sort !== "default") {
      return [...data?.launches].sort((a, b) => {
        return (
          +(filter.sort === "launch_date_utc_new") *
          (new Date(b?.launch_date_utc).getTime() -
            new Date(a?.launch_date_utc).getTime())
        );
      });
    }
    return data?.launches;
  }, [data, filter]);

  return [sortedLaunches];
};

// A function that returns launches sorted by properties and filtered by search query
export const useSortedAndSearchedLaunches = (
  data: GetLaunchesQuery | undefined,
  filter: IFilter
) => {
  const [sortedLaunches] = useSortedLaunches(data, filter);

  const sortedAndSearchedLaunches = useMemo(() => {
    return sortedLaunches.filter((launch) =>
      launch?.mission_name?.toLowerCase().includes(filter.query.toLowerCase())
    );
  }, [filter.query, sortedLaunches]);

  return [sortedAndSearchedLaunches];
};

// A function that returns launches sorted by properties, filtered by search query and paginated
export const useLaunches = (
  data: GetLaunchesQuery | undefined,
  filter: IFilter,
  page: number,
  rowsPerPage: number
) => {
  const [sortedAndSearchedLaunches] = useSortedAndSearchedLaunches(
    data,
    filter
  );

  const launches = useMemo(
    () =>
      sortedAndSearchedLaunches.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [sortedAndSearchedLaunches, rowsPerPage, page]
  );
  return [launches];
};

// A function that returns total of visible launches
export const useTotalLaunches = (
  data: GetLaunchesQuery | undefined,
  filter: IFilter
) => {
  const [sortedAndSearchedLaunches] = useSortedAndSearchedLaunches(
    data,
    filter
  );
  const total: number = useMemo(
    () => sortedAndSearchedLaunches.length,
    [sortedAndSearchedLaunches]
  );
  return [total];
};

// A function that returns all ids of visible launches
export const useAllLaunchesIds = (
  data: GetLaunchesQuery | undefined,
  filter: IFilter
) => {
  const [sortedAndSearchedLaunches] = useSortedAndSearchedLaunches(
    data,
    filter
  );
  const allLaunchesIds = useMemo(
    () => sortedAndSearchedLaunches.map((launch) => launch?.id || ""),
    [sortedAndSearchedLaunches]
  );

  return [allLaunchesIds];
};
