import React, { FC } from "react";
import Table from "@mui/joy/Table";
import { ITableProps, CheckedTypes } from "../../../types/launch-list.types";
import { Checkbox } from "../../atoms/checkbox";
import { classNames } from "../../../utils/joinClassNames";
import { tableClasses as classes } from "../../../configs/classNames";
import styles from "./style.module.scss";

export const CustomizedTable: FC<ITableProps> = (props: ITableProps) => {
  const {
    tableId,
    cols,
    rows,
    customizableValues,
    isSelectable,
    isNumbered,
    hasAction,
    footer,
    page,
    rowsPerPage,
    checked,
    actionNode,
    action
  } = props;

  function returnStyleName(styleName: string | undefined): string {
    return !!styleName ? styles[styleName] : '';
  }

  function checkUncheckAll() {
    if (!!checked) {
      const checkedType = !checked?.allCheckedList ? CheckedTypes.all : CheckedTypes.none;
      checked.setCheckedList(checkedType);
    }
  }

  function isInCheckedList(id: string | undefined | null) {
    if (!!checked && !!id) {
      return checked.checkedList.includes(id);
    }
    return false;
  }

  return (
    <Table id={tableId} className={styles[classes.main]} variant="outlined" aria-label="customized-table">
      <thead>
        <tr>
          {
            isSelectable &&
            <th className={classNames(styles[classes.column], styles[classes.narrow])}>
              <Checkbox
                id={`${tableId}AllCheckboxId`}
                checked={!!checked?.allCheckedList}
                onChange={checkUncheckAll} />
            </th>
          }
          {
            isNumbered &&
            <th className={classNames(styles[classes.column], styles[classes.narrow])}>#</th>
          }
          {cols.map(col =>
            <th key={col.key} className={classNames(styles[classes.column], returnStyleName(col.styleName))}>
              {col.name}
            </th>
          )}
          {
            hasAction &&
            <th className={classNames(styles[classes.column], styles[classes.date])}>Action</th>
          }
        </tr>
      </thead>
      <tbody>
        {
          rows.map((row, index) => {
            return (
              <tr key={row.id} onClick={() => { if (!!row.id && isSelectable) { checked?.setCheckedList(row.id) } }}>
                {
                  isSelectable &&
                  <td>
                    <Checkbox
                      id={`${tableId}CheckboxId${index}`}
                      checked={isInCheckedList(row.id)}
                      onChange={() => { if (!!row.id) { checked?.setCheckedList(row.id) } }}
                    />
                  </td>
                }
                {isNumbered && <td>{(index + 1 + ((page || 0) * (rowsPerPage || 0)))}</td>}
                {cols.map(col => {
                  return (
                    <td
                      key={row.id + col.key}
                      className={classNames(styles[classes.row], returnStyleName(col.styleName))}
                    >
                      {customizableValues?.[col.key] ?
                        customizableValues?.[col.key]?.(row) :
                        (row[col.key] || 'No data')}
                    </td>
                  )
                })}
                {
                  hasAction &&
                  <td className={classNames(styles[classes.row], styles[classes.date])}>
                    <div
                      className={styles[classes.button]}
                      onClick={(event: React.MouseEvent<HTMLElement>) => { if (action) action(event, row) }}
                    >
                      {actionNode}
                    </div>
                  </td>
                }
              </tr>
            )
          })
        }
      </tbody>
      {footer}
    </Table>
  );
};
