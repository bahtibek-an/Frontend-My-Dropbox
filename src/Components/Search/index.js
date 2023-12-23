import React, { useState } from "react";
import datas from "../../data.json";

export function Search() {
  const [user, setUser] = useState("");
  const keys = ["firstName", "lastName", "city"];
  const search = (infos) => {
    return infos.filter((info) => {
      return keys.some((key) =>
        info[key].toLowerCase().includes(user.toLowerCase())
      );
    });
  };
  // console.log(search);
  return (
    <>
      <input
        type="text"
        value={user}
        onChange={(e) => {
          setUser(e.target.value);
        }}
      />
      <Table data={search(datas)} />
      {/* {datas
        .filter((data) => data.title.toLowerCase().includes(user))
        .map((d) => {
          return <li>{d.title}</li>;
        })} */}
    </>
  );
}

function Table({ data }) {
  return (
    <table style={{ border: "1px solid black" }} className="bg-light">
      <tr>
        <td>firstName</td>
        <td>lastName</td>
        <td>city</td>
      </tr>
      <tbody>
        {data.map((d) => {
          return (
            <>
              <tr>
                <td style={{ border: "1px solid black" }}>{d.firstName}</td>
                <td style={{ border: "1px solid black" }}>{d.lastName}</td>
                <td style={{ border: "1px solid black" }}>{d.city}</td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
}
