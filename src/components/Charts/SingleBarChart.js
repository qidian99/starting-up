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
import { startupExitData } from "./data";
import { CHART_DEFAULT_PROPS } from "./default";

const SingleBarChart = ({
  width,
  height,
  data,
  dataKey,
  margin,
  name,
  active,
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
      <Bar dataKey={dataKey} name={name || dataKey} fill="#8884d8" isAnimationActive={active} isUpdateAnimationActive={active} />
    </BarChart>
  );
};


SingleBarChart.defaultProps = {
  ...CHART_DEFAULT_PROPS,
  data: startupExitData,
  dataKey: "amount",
  name: "Amount",
  limit: 5,
  margin: { top: 5, right: 20, bottom: 5, left: 0 },
};


export default SingleBarChart
