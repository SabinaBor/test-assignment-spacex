import React, { ChangeEvent, FC } from "react";
import styles from "./style.module.scss";

interface ICheckboxProps {
  id: string;
  checked: boolean;
  label?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<ICheckboxProps> = ({
  id,
  checked,
  label,
  onChange,
}) => {
  return (
    <div className={styles.checkbox}>
      {!!label && <label htmlFor={id}>{label}</label>}
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
    </div>
  );
};
