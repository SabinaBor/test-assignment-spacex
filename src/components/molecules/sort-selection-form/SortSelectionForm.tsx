import React, { FC } from "react";
import { sortSelectionFormClasses as classes } from "../../../configs/classNames";
import { IFilter } from "../../../types/launch-list.types";
import { sortOptions as options } from "../../../configs/sortAndPaginationValues";
import Input from "@mui/joy/Input";
import { CustomizedSelect } from "../../atoms/select";
import styles from "./style.module.scss";

interface ISortSelectionFormProps {
  filter: IFilter;
  setFilter: (filter: IFilter) => void;
}

export const SortSelectionForm: FC<ISortSelectionFormProps> = ({
  filter,
  setFilter,
}) => {
  const defaultOption = {
    name: "Sort by",
    value: "default",
  };

  return (
    <div className={styles[classes.main]}>
      <Input
        value={filter.query}
        onChange={(event) =>
          setFilter({ ...filter, query: event.target.value })
        }
        placeholder="Search"
      />
      <CustomizedSelect
        options={options}
        value={filter.sort}
        onChange={(_, newValue) => {
          setFilter({ ...filter, sort: newValue || "" });
        }}
        defaultOption={defaultOption}
      />
    </div>
  );
};
