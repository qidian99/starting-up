import React, { PureComponent } from "react";
import { PieChart, Pie, Tooltip, Sector, Cell } from "recharts";
import { COLORS, renderLabelAsName, renderOuterLabelAsName } from "./default";

const GappedPieChart = ({ data, active }) => {
  console.log({ data });
  return (
    <PieChart width={600} height={600}>
      <Pie
        data={data}
        cx={300}
        cy={300}
        innerRadius={120}
        outerRadius={160}
        fill="#8884d8"
        paddingAngle={10}
        dataKey="value"
        isAnimationActive={active}
        label={renderOuterLabelAsName}
        animationDuration={800}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};


GappedPieChart.defaultProps = {
  data: [
    { name: "Subscription-based", value: 25 },
    { name: "Platform-based", value: 25 },
    { name: "Ad-based", value: 25 },
    { name: "Transaction-based", value: 25 },
  ],
  active: true,
};

export default GappedPieChart;

const RADIAN = Math.PI / 180;
