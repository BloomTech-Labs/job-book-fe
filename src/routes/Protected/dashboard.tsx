import React, { useState, useEffect } from "react";
import axios from "axios";
import DashCard from "./card";

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://cors-anywhere.herokuapp.com/https://swapi.co/api/people")
      .then(res => {
        setUsers(res.data.results);
        console.log(res.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div
      style={{
        width: "94%",
        margin: "30px auto",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap"
      }}
    >
      {users.map(user => (
        <DashCard key={user.name} name={user.name} year={user.birth_year} />
      ))}
    </div>
  );
}

export default Dashboard;
