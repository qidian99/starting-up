import React, { PureComponent } from "react";
import { PieChart, Pie, Tooltip, Sector, Cell } from "recharts";
import { COLORS, renderLabelAsName, renderOuterLabelAsName } from "./default";

const data01 = [
  {
    name: "Idea",
    value: 20,
    description: "Every startups begins with an idea.",
  },
  {
    name: "Pitch",
    value: 20,
    description: "Pitch your idea to people that can help you make it happen.",
  },
  {
    name: "Funding",
    value: 20,
    description: "5 funding stages.",
  },
  {
    name: "Operation",
    value: 40,
    description: "How to scale your business.",
  },
];
const data02 = [
  { name: "Research", value: 50 },
  { name: "Develop", value: 50 },
  {
    name: "Building a design prototype",
    value: 30,
  },
  {
    name: "Build a minimal viable product (MVP)",
    value: 30,
  },
  {
    name: "Prepare demo slides and videos",
    value: 40,
  },
  { name: "Pre-seed Funding", value: 20 },
  { name: "Seed Funding", value: 20 },
  { name: "Series A Funding", value: 20 },
  { name: "Series B Funding", value: 20 },
  { name: "Series C Funding", value: 20 },
  { name: "Products", value: 40 },
  { name: "Human Resources", value: 40 },
  { name: "Business Models", value: 40 },
  { name: "Customer Services", value: 40 },
  { name: "Compaigns", value: 40 },
];

const getOuterCellColor = (index) => {
  let i = 0;
  if (index <= 1) i = 0;
  else if (index <= 4) i = 1;
  else if (index <= 9) i = 2;
  else if (index <= 14) i = 3;

  return COLORS[i];
};

const DoublePieChart = ({ outerData, innerData, active }) => {
  return (
    <PieChart width={800} height={800}>
      <Pie
        data={innerData}
        dataKey="value"
        cx={400}
        cy={400}
        outerRadius={120}
        fill="#8884d8"
        isAnimationActive={active}
        labelLine={false}
        label={renderLabelAsName}
        animationDuration={800}
      >
        {innerData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Pie
        data={outerData}
        dataKey="value"
        cx={400}
        cy={400}
        innerRadius={140}
        outerRadius={180}
        fill="#82ca9d"
        label={renderOuterLabelAsName}
        isAnimationActive={active}
      >
        {outerData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={getOuterCellColor(index)} />
        ))}
      </Pie>
      <Tooltip />
      {/* <Tooltip formatter={(val) => `${val}%`} /> */}
      {/* <Tooltip content={<CustomTooltip />} /> */}
    </PieChart>
  );
};

DoublePieChart.defaultProps = {
  innerData: data01,
  outerData: data02,
  active: true,
};

export default DoublePieChart;

