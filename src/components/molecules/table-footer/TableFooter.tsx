import React, { FC } from "react";
import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { CustomizedSelect } from "../../atoms/select";
import { rowsPerPageOptions } from "../../../configs/sortAndPaginationValues";
import { tableClasses as classes } from "../../../configs/classNames";
import styles from "./style.module.scss";

interface ITableFooterProps {
  colspan: number;
  total: number;
  rowsPerPage: number;
  setRowsPerPage: (value: number) => void;
  page: number;
  setPage: (value: number) => void;
}

export const TableFooter: FC<ITableFooterProps> = ({
  colspan,
  total,
  rowsPerPage,
  page,
  setRowsPerPage,
  setPage,
}) => {
  function labelDisplayedRows({
    from,
    to,
    count,
  }: {
    from: number;
    to: number;
    count: number;
  }) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
  }

  const getLabelDisplayedRowsTo = () => {
    if (total === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? total
      : Math.min(total, (page + 1) * rowsPerPage);
  };

  function handleRowsPerPageChange(newValue: number | null) {
    setRowsPerPage(newValue || 0);
    setPage(0);
  }

  return (
    <tfoot className={styles[classes.footer]}>
      <tr>
        <td colSpan={colspan}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "flex-end",
            }}
          >
            <FormControl orientation="horizontal" size="sm">
              <FormLabel>Rows per page:</FormLabel>
              <CustomizedSelect
                options={rowsPerPageOptions}
                onChange={(_, newValue) => {
                  handleRowsPerPageChange(newValue);
                }}
                value={rowsPerPage}
              />
            </FormControl>
            <Typography textAlign="center" sx={{ minWidth: 80 }}>
              {labelDisplayedRows({
                from: total === 0 ? 0 : page * rowsPerPage + 1,
                to: getLabelDisplayedRowsTo(),
                count: total === -1 ? -1 : total,
              })}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                size="sm"
                color="neutral"
                variant="outlined"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
                sx={{ bgcolor: "background.surface" }}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
              <IconButton
                size="sm"
                color="neutral"
                variant="outlined"
                disabled={
                  total !== -1
                    ? page >= Math.ceil(total / rowsPerPage) - 1
                    : false
                }
                onClick={() => setPage(page + 1)}
                sx={{ bgcolor: "background.surface" }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </Box>
          </Box>
        </td>
      </tr>
    </tfoot>
  );
};
