import React, { useCallback, useState } from "react";
import { Box, makeStyles } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

import { ReactComponent as CompanyIcon } from "../../../assets/buildings.svg";
import { ReactComponent as RegionIcon } from "../../../assets/tiles.svg";
import { generateRegionRows } from "../../../util/game";

const useStyles = makeStyles((theme) => ({
  table: {
    border: "1px solid black",
  },
  row: {
    display: "flex",
  },
  cell: {
    flex: 1 / 9,
    height: 66,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
    backgroundColor: "#F2F2F2",
  },
  icon: {
    width: 60,
    height: 60,
  },
  popover: {
    minWidth: 300,
  },
  popoverHeader: {
    backgroundColor: theme.palette.primary.main,
  },
  popoverHeaderText: {
    color: "#FFF",
    fontWeight: "bold",
  },
}));

const Terrian = ({ width, height, regions, counts }) => {
  const classes = useStyles();

  return (
    <table className={classes.table}>
      <tbody>
        {Array(width)
          .fill(null)
          .map((_, row) => {
            return (
              <TerrianRow
                key={`Terrian-${row}`}
                row={row}
                height={height}
                regions={regions.slice(row * height, (row + 1) * height)}
                counts={counts.slice(row * height, (row + 1) * height)}
              />
            );
          })}
      </tbody>
    </table>
  );
};

const TerrianRow = ({ row, height, regions, counts }) => {
  const classes = useStyles();
  return (
    <tr className={classes.row}>
      {Array(height)
        .fill(null)
        .map((_, column) => (
          <td className={classes.cell} key={`TerrianRow-${row}-${column}`}>
            <Region
              row={row}
              column={column}
              region={regions[column]}
              count={counts[column]}
            />
          </td>
        ))}
    </tr>
  );
};

export const Region = ({ row, column, count, region }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const IconComponent = (count === 0 || count === undefined) ? RegionIcon : CompanyIcon;

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? `tile-${row}-${column}` : undefined;

  return (
    <React.Fragment>
      <IconButton
        aria-describedby={id}
        className={classes.icon}
        onClick={handleClick}
      >
        <IconComponent className={classes.icon} />
      </IconButton>
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
        <RegionInfo region={region} count={count} />
      </Popover>
    </React.Fragment>
  );
};

const RegionInfo = ({ region, count }) => {
  const rows = generateRegionRows(region);
  const classes = useStyles();

  let header = null;

  if (count !== 0 && count !== undefined) {
    header = (
      <TableRow key={"count"} className={classes.popoverHeader}>
        <TableCell
          component="th"
          scope="row"
          className={classes.popoverHeaderText}
        >
          Active users
        </TableCell>
        <TableCell align="right" className={classes.popoverHeaderText}>
          {count}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.popover} aria-label="popover table">
        <TableBody>
          {header}
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const sampleRegion = {
  population: 100,
  conversionRate: 0.01,
  leavingRate: 0.0125,
  revenue: 1,
  cost: 10,
  growth: 2,
};

const sampleCounts = Array(81).fill(0);
sampleCounts[40] = 10;

Terrian.defaultProps = {
  width: 9,
  height: 9,
  regions: Array(81).fill(sampleRegion),
  counts: sampleCounts,
};

TerrianRow.defaultProps = {
  user: 0,
};

RegionInfo.defaultProps = {
  region: {},
};

export default Terrian;
