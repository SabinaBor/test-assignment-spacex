import React, { FC } from "react";
import { modalClasses as classes } from "../../../configs/classNames";
import { classNames } from "../../../utils/joinClassNames";
import styles from "./style.module.scss";

interface IModalProps {
  children: React.ReactNode;
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export const Modal: FC<IModalProps> = ({ children, visible, setVisible }) => {
  let modalClasses = styles[classes.main];

  if (visible) {
    modalClasses = classNames(styles[classes.main], styles[classes.active]);
  }

  return (
    <div onClick={() => setVisible(false)} className={modalClasses}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles[classes.content]}
      >
        {children}
      </div>
    </div>
  );
};
