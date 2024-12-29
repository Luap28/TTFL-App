import { useState } from "react";

function ListGroup() {
  const [selectedIndexEast, setSelectedIndexEast] = useState(-1);
  const [selectedIndexWest, setSelectedIndexWest] = useState(-1);

  const eastFranchises = [
    "Boston Celtics",
    "Philadelphia Sixers",
    "New York Knicks",
    "Miami Heat",
    "Indiana Pacers",
    "Cleveland Cavaliers",
    "Orlando Magic",
    "Atlanta Hawks",
    "Chicago Bulls",
    "Charlotte Hornets",
    "Detroit Pistons",
    "Washington Wizards",
    "Brooklyn Nets",
    "Milwaukee Bucks",
    "Toronto Raptors",
  ];

  const westFranchises = [
    "Dallas Mavericks",
    "Golden State Warriors",
    "Denver Nuggets",
    "Memphis Grizzlies",
    "New Orleans Pelicans",
    "San Antonio Spurs",
    "Houston Rockets",
    "Phoenix Suns",
    "Los Angeles Lakers",
    "Los Angeles Clippers",
    "Sacramento Kings",
    "Portland Trail Blazers",
    "Utah Jazz",
    "Oklahoma City Thunder",
    "Minnesota Timberwolves",
  ];

  const handleClick = () => {
    getEastTeams();
  };

  return (
    <>
      <h1>Franchises NBA de la conférence est</h1>
      <ul className="list-group">
        {eastFranchises.map((franchise, index) => (
          <li
            className={
              selectedIndexEast === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={franchise}
            onClick={() => {
              setSelectedIndexEast(index);
              setSelectedIndexWest(-1);
              handleClick();
            }}
          >
            {franchise}
          </li>
        ))}
      </ul>
      <h1>Franchises NBA de la conférence ouest</h1>
      <ul className="list-group">
        {westFranchises.map((franchise, index) => (
          <li
            className={
              selectedIndexWest === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={franchise}
            onClick={() => {
              setSelectedIndexWest(index);
              setSelectedIndexEast(-1);
            }}
          >
            {franchise}
          </li>
        ))}
      </ul>
    </>
  );
}

function getEastTeams() {
  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      let teamsResponse = JSON.parse(xhr.response);
      let eastFranchises2 = [];

      console.log(teamsResponse);
      let eastfranchiseNumber = 0;
      for (let i = 0; eastfranchiseNumber < 15; i++) {
        if (
          teamsResponse.response[i].leagues.standard.conference === "East" &&
          teamsResponse.response[i].allStar == false
        ) {
          console.log(teamsResponse.response[i].name);
          eastFranchises2.push(teamsResponse.response[i].name);
          eastfranchiseNumber++;
        }
      }
      console.log(eastFranchises2);
      return eastFranchises2;
    }
  });

  xhr.open("GET", "https://api-nba-v1.p.rapidapi.com/teams");
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "b6d5cd0b13msh507ad1ae09a10e1p175aabjsne78bd1c239ff"
  );
  xhr.setRequestHeader("x-rapidapi-host", "api-nba-v1.p.rapidapi.com");

  xhr.send(data);
}

export default ListGroup;
