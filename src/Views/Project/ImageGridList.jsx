import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  ChartController,
  DoublePieChart,
  SingleBarChart,
  StackedBarChart,
} from "../../components/Charts";
import ActionButton from "../../components/Charts/ActionButton";
import {
  startupDollarValueData,
  startupExitData,
} from "../../components/Charts/data";
import PersistentDrawer from "../../components/DrawerMenu/PersistentDrawer";
import { INTRODUCTION_FRAMES } from "./frames";
import Visualizer from "../../components/Charts/Visualizer";
import VisualizationController from "../../components/Charts/VisualizationContoller";
import GappedPieChart from "../../components/Charts/GappedPieChart";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  makeStyles,
} from "@material-ui/core";

import { Info, StarBorder } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    backgroundColor: theme.palette.primary.main,
    width: (props) => props.width,
    padding: 3,
  },
  titleBar: {
    background: (props) =>
      props.titlePosition === "top"
        ? "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
          "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
        : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
          "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  gridListTile: {
    boxSizing: "content-box",
  },
  icon: {
    color: "white",
  },
}));

const ImageGridList = ({
  data,
  cols,
  width,
  containerHeight,
  cellHeight,
  titlePosition,
}) => {
  const classes = useStyles({ titlePosition, width, cellHeight });

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={cellHeight}
        spacing={3}
        className={classes.gridList}
        cols={cols}
        style={{ height: containerHeight }}
      >
        {data.map((tile) => (
          <GridListTile
            key={tile.img}
            cols={tile.cols || 1}
            rows={tile.rows || 1}
          >
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              titlePosition={titlePosition}
              actionIcon={
                <IconButton
                  aria-label={`star ${tile.title}`}
                  className={classes.icon}
                >
                  <Info />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

ImageGridList.defaultProps = {
  data: [],
  cols: 2,
  titlePosition: "top",
  width: 500,
  cellHeight: 200,
  containerHeight: null,
};

export default ImageGridList;
