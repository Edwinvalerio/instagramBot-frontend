import React, { Component } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "4/18/2020",
    followers: Math.random() * 500 + 100,
    following: Math.random() * 500 + 100,
    amt: 2400,
  },
  {
    name: "4/18/2020",
    followers: Math.random() * 500 + 100,
    following: Math.random() * 500 + 100,
    amt: 2400,
  },
  {
    name: "4/18/2020",
    followers: Math.random() * 500 + 100,
    following: Math.random() * 500 + 100,
    amt: 2400,
  },
  {
    name: "4/18/2020",
    followers: Math.random() * 500 + 100,
    following: Math.random() * 500 + 100,
    amt: 2400,
  },
  {
    name: "4/18/2020",
    followers: Math.random() * 500 + 100,
    following: Math.random() * 500 + 100,
    amt: 2400,
  },
  {
    name: "4/18/2020",
    followers: Math.random() * 500 + 100,
    following: Math.random() * 500 + 100,
    amt: 2400,
  },
  {
    name: "4/18/2020",
    followers: Math.random() * 500 + 100,
    following: Math.random() * 500 + 100,
    amt: 2400,
  },
];
export default class Chart extends Component {
  render() {
    return (
      <div>
        <LineChart
          width={window.innerWidth}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="followers" stroke="#8884d8" />
          <Line type="monotone" dataKey="following" stroke="#82ca9d" />
        </LineChart>
      </div>
    );
  }
}
