import React from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { selectClasses as classes } from "../../../configs/classNames";
import styles from "./style.module.scss";

interface ISelectProps<T> {
  value: T;
  options: IOption[];
  onChange: (event: any, newValue: T | null) => void;
  defaultOption?: IOption;
}

interface IOption {
  value: string | number;
  name: string | number;
}

export function CustomizedSelect<T extends string | number>(
  props: ISelectProps<T>
) {
  return (
    <Select
      className={styles[classes.main]}
      onChange={(event: any, newValue: T | null) =>
        props.onChange(event, newValue)
      }
      value={props.value}
    >
      {!!props.defaultOption ? (
        <Option
          key={props.defaultOption.value}
          value={props.defaultOption.value}
          disabled
        >
          {props.defaultOption.name}
        </Option>
      ) : (
        ""
      )}
      {props.options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.name}
        </Option>
      ))}
    </Select>
  );
}
