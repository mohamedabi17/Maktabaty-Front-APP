import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import "./Progress.css";

function Progress() {
  const [users, setUsers] = useState([]);
  const [OrderCount, setOrderCount] = useState([]);
  const [Count, setCount] = useState([]);

  const LoadGraph = () => {
    axios.get(`http://127.0.0.1:8000/users`).then((response) => {
      setUsers(response.data);
      let OrdersCount = [];
      users.map((user) => {
        axios.get(`http://127.0.0.1:8000/users/${user.id}`).then((response) => {
          if (response.data) {
            OrdersCount.push(response.data.length); //ashfa 3la hady
          }
        });
      });
      setCount(OrdersCount);

      let Data = [];
      for (let i = 0; i < users.length; i = i + 1) {
        let User_idd = users[i].id;
        let nbr = Count[i];
        Data.push({ user_id: User_idd, orders_by_user_ID: nbr });
      }
      setOrderCount(Data);
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      {window.addEventListener("keydown", (event) => {
        LoadGraph();
      })}

      {/* <Button onClick={LoadGraph()}>Load Curve</Button> */}
      <h1>Orders Progress</h1>
      <h5>
        <b>Hint</b> : Press Any Key to See the Progress of Users Orders{" "}
      </h5>
      <div className="App" id="prog">
        {OrderCount ? (
          <BarChart
            width={500}
            height={300}
            data={OrderCount}
            margin={{
              top: 50,
              right: 30,
              left: 0,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis
              dataKey="user_id"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="orders_by_user_ID"
              fill="#8884d8"
              background={{ fill: "#eee" }}
            />
          </BarChart>
        ) : (
          LoadGraph()
        )}
        {window.removeEventListener("keydown", (event) => {})}
      </div>
    </div>
  );
}

export default Progress;
