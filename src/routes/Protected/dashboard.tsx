import React, { useState, useEffect } from "react";
import axios from "axios";
import { DashCard } from "./card";
import { Starwars } from "../../../index";

interface StarwarsArr extends Array<Starwars> {}

const Dashboard = () => {
  const [users, setUsers] = useState<StarwarsArr>();

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
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        paddingTop: "50px"
      }}
    >
      {users &&
        users.map(user => (
          <DashCard key={user.name} Name={user.name} Year={user.birth_year} />
        ))}
    </div>
  );
};

export default Dashboard;
