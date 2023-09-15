import React, { FC } from "react";
import { loaderClasses as classes } from "../../../configs/classNames";
import styles from "./style.module.scss";

export enum LoaderSize {
  sm = "sm",
  lg = "lg",
}

export enum LoaderColor {
  white = "white",
  primary = "primary",
}

interface ILoaderProps {
  size?: LoaderSize;
  color?: LoaderColor;
}

export const Loader: FC<ILoaderProps> = ({
  size = LoaderSize.lg,
  color = LoaderColor.primary,
}) => {
  return (
    <div className={[styles.loader, styles[classes.loader[size]]].join(" ")}>
      <div
        className={[
          styles[classes.base.main],
          styles[classes.base[color]],
        ].join(" ")}
      ></div>
    </div>
  );
};
