import { useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { HISTORY_QUERY, MY_COMPANIES_QUERY } from "../../gql";
import MainLayout from "../../layouts/MainLayout";
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
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { COMPANY_ACTIONS } from "../../util/company";
import { simpleGameStrategies, STRATEGY_TIPS } from "starting-up-common";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const columns = [
  { id: "name", label: "Company Name", minWidth: 160 },
  { id: "strategy", label: "Strategy", align: "center" },
  {
    id: "createdAt",
    label: "Date Created",
    align: "center",
    format: (value) => moment(value).format("LL"),
  },
  {
    id: "default",
    label: "Default",
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

const CompanyList = () => {
  const { loading: companiesLoading, data: companiesQueryResult } = useQuery(
    MY_COMPANIES_QUERY
  );

  // console.log(companiesQueryResult);

  const history = useHistory();

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const companyState = useSelector((state) => state.company);
  const dispatch = useDispatch();

  const activeCompanyId = _.get(companyState, ["active", "id"]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  if (companiesLoading) {
    return <Spinner />;
  }

  // console.log(companiesQueryResult);
  const rows = companiesQueryResult.myCompanies;

  return (
    <MainLayout>
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
                        if (column.id === "default") {
                          const isDefault = row.id === activeCompanyId;
                          return (
                            <StyledTableCell
                              key={column.id}
                              align={column.align}
                            >
                              <Button
                                fullWidth
                                variant="contained"
                                // style={{ textTransform: "none" }}
                                color={"primary"}
                                disabled={isDefault}
                                onClick={async () => {
                                  await dispatch({
                                    type: COMPANY_ACTIONS.SET_ACTIVE_COMPANY,
                                    company: row,
                                  });
                                }}
                              >
                                <Typography>
                                  {isDefault ? "YES" : "Set as Default"}
                                </Typography>
                              </Button>
                            </StyledTableCell>
                          );
                        }

                        if (column.id === "strategy") {
                          const isDefault = row.id === activeCompanyId;
                          return (
                            <StyledTableCell
                              key={column.id}
                              align={column.align}
                            >
                              <StrategyButton strategy={row.strategy} />
                            </StyledTableCell>
                          );
                        }

                        const value = row[column.id];
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            {column.format
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
    </MainLayout>
  );

  // return <Spinner />;
};

export const StrategyButton = ({ strategy, title }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  const id = "game-status-button";

  // console.log({ strategy, simpleGameStrategies });
  return (
    <>
      <Button onClick={handleClick} variant="contained" color="primary">
        {title}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Paper style={{ width: 300, maxHeight: 600, overflow: "auto" }}>
          <List>
            {simpleGameStrategies.map((s, index) => (
              <ListItem
                button
                key={"strategy" + index}
                onClick={() => window.open(STRATEGY_TIPS[index].link)}
              >
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary={s} secondary={strategy[s]} />
                <Tooltip title={STRATEGY_TIPS[index].text} aria-label="info">
                  <InfoOutlinedIcon />
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popover>
    </>
  );
};

StrategyButton.defaultProps = {
  strategy: {
    preseed: 0.4,
    seed: 0.3,
    seriesA: 0.2,
    seriesB: 0.1,
    seriesC: 0.0,
  },
  title: "Show"
};

export default CompanyList;
