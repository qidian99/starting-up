import React from "react";
import DefaultTooltipContent from "recharts/lib/component/DefaultTooltipContent";

export const CHART_DEFAULT_PROPS = {
  duration: 600,
  trigger: "#frame0",
  isLast: false,
  width: 600,
  height: 300,
  limit: 100,
  title: null,
};

export const TRIGGER_OFFSET = 0.25; // To make the first chart show up

export const FADE_OUT_OFFSET = 0.15;
export const FADE_IN_OFFSET = 0.15;
export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#9C27B0"];

const getIntroOfPage = (label) => {
  // console.log(label);
  if (label === "Page A") {
    return "Page A is about men's clothing";
  }
  if (label === "Page B") {
    return "Page B is about women's dress";
  }
  if (label === "Page C") {
    return "Page C is about women's bag";
  }
  if (label === "Page D") {
    return "Page D is about household goods";
  }
  if (label === "Page E") {
    return "Page E is about food";
  }
  if (label === "Page F") {
    return "Page F is about baby food";
  }
};

export const DetailedTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(payload[0].name)}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};

export const CustomTooltip = (props) => {
  const { active, payload, label } = props;
  // payload[0] doesn't exist when tooltip isn't visible
  if (active) {
    // mutating props directly is against react's conventions
    // so we create a new payload with the name and value fields set to what we want
    const newPayload = [
      {
        // all your data which created the tooltip is located in the .payload property
        name: payload[0].payload.name,
        value: payload[0].payload.description,
        // you can also add "unit" here if you need it
      },
      ...payload,
    ];

    // we render the default, but with our overridden payload
    return <DefaultTooltipContent {...props} payload={newPayload} />;
  }

  // we just render the default
  return <DefaultTooltipContent {...props} />;
};




export const renderLabelPercentage = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  // ...rest
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  // console.log(rest)
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const RADIAN = Math.PI / 180;

export const renderLabelAsName = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  payload,
  ...rest
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  // console.log(rest)
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${payload.name}`}
    </text>
  );
};

export 
const renderOuterLabelAsName = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  payload,
  ...rest
}) => {
  const offset = 16;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  // console.log(rest)
  return (
    <text
      x={x}
      y={y + (y < cy ? -offset : offset)}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${payload.name}`}
    </text>
  );
};
