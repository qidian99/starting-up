import React from "react";

import {
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { startupDollarValueData } from "./data";
import { CHART_DEFAULT_PROPS } from "./default";

const StackedBarChart = ({
  width,
  height,
  margin,
  data,
  colors,
  dataKeys,
  names,
}) => {

  return (
    <BarChart
      width={width}
      height={height}
      data={data}
      margin={margin}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {
        dataKeys.map((key, index) => <Bar key={key} name={names[index] || key} dataKey={key} stackId={key} fill={colors[index % colors.length]} />)
      }
    </BarChart>
  );
};

StackedBarChart.defaultProps = {
  ...CHART_DEFAULT_PROPS,
  data: startupDollarValueData,
  dataKeys: ["total"],
  names: ["Total"],
  colors: ["#9c27b0", "#8884d8", "#82ca9d"],
  limit: 5,
  margin: {
    top: 20,
    right: 30,
    left: 20,
    bottom: 5,
  }
}

export default StackedBarChart
