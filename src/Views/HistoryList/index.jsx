import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import Spinner from "../../components/Spinner";
import { HISTORY_QUERY } from "../../gql";
import AuthLayout from "../../layouts/AuthLayout";
import clsx from "clsx";
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
  useTheme,
  withStyles,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const columns = [
  { id: "name", label: "Game", minWidth: 170 },
  { id: "numCompanies", label: "# Companies", minWidth: 100 },
  {
    id: "width",
    label: "Width",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "height",
    label: "Height",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "numCycles",
    label: "# Cycles",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "finished",
    label: "Finished",
    minWidth: 170,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  header: {},
  container: {
    maxHeight: 440,
  },
}));

function cycleValueText(value) {
  return `Cycle ${value}`;
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    fontWeight: "bold",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const HistoryList = () => {
  const { loading: historyLoading, data: historyQueryResult } = useQuery(
    HISTORY_QUERY
  );

  const history = useHistory();

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  if (historyLoading) {
    return <Spinner />;
  }

  console.log(historyQueryResult);
  const rows = historyQueryResult.gameHistory;

  return (
    <AuthLayout>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        if (column.id === "action") {
                          return (
                            <StyledTableCell
                              key={column.id}
                              align={column.align}
                            >
                              <Button
                                color={row.finished ? "primary" : "secondary"}
                                onClick={() =>
                                  row.finished
                                    ? history.push(`/history/${row.id}`)
                                    : null
                                }
                              >
                                <Typography style={{ fontWeight: 'bold' }}>
                                  {row.finished ? "Replay" : "Go to"}
                                </Typography>
                              </Button>
                            </StyledTableCell>
                          );
                        }

                        const value = row[column.id];
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : typeof value === "boolean"
                              ? value
                                ? "True"
                                : "False"
                              : value}
                          </StyledTableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </AuthLayout>
  );

  // return <Spinner />;
};

export default HistoryList;
