import { useState } from "react";

export const countryCodes = {
  Mexico: "mx", "South Africa": "za", "South Korea": "kr", Czechia: "cz",
  Switzerland: "ch", Canada: "ca", "Bosnia and Herzegovina": "ba", Qatar: "qa",
  Brazil: "br", Morocco: "ma", Scotland: "gb-sct", Haiti: "ht",
  USA: "us", Australia: "au", Paraguay: "py", Turkiye: "tr",
  Germany: "de", "Ivory Coast": "ci", Ecuador: "ec", Curacao: "cw",
  Netherlands: "nl", Japan: "jp", Sweden: "se", Tunisia: "tn",
  Belgium: "be", Egypt: "eg", Iran: "ir", "New Zealand": "nz",
  Spain: "es", "Cabo Verde": "cv", Uruguay: "uy", "Saudi Arabia": "sa",
  France: "fr", Norway: "no", Senegal: "sn", Iraq: "iq",
  Argentina: "ar", Algeria: "dz", Austria: "at", Jordan: "jo",
  Colombia: "co", Portugal: "pt", "DR Congo": "cd", Uzbekistan: "uz",
  England: "gb-eng", Croatia: "hr", Ghana: "gh", Panama: "pa",
};

export const groups = {
  A: ["Mexico", "South Africa", "South Korea", "Czechia"],
  B: ["Switzerland", "Canada", "Bosnia and Herzegovina", "Qatar"],
  C: ["Brazil", "Morocco", "Scotland", "Haiti"],
  D: ["USA", "Australia", "Paraguay", "Turkiye"],
  E: ["Germany", "Ivory Coast", "Ecuador", "Curacao"],
  F: ["Netherlands", "Japan", "Sweden", "Tunisia"],
  G: ["Belgium", "Egypt", "Iran", "New Zealand"],
  H: ["Spain", "Cabo Verde", "Uruguay", "Saudi Arabia"],
  I: ["France", "Norway", "Senegal", "Iraq"],
  J: ["Argentina", "Algeria", "Austria", "Jordan"],
  K: ["Colombia", "Portugal", "DR Congo", "Uzbekistan"],
  L: ["England", "Croatia", "Ghana", "Panama"],
};

export const useGroupLogic = () => {
  const [rankings, setRankings] = useState({});

  const handleTeamClick = (letter, team) => {
    setRankings((prev) => {
      const currentOrder = prev[letter] || [];
      const alreadySelected = currentOrder.includes(team);

      if (alreadySelected) {
        const newOrder = currentOrder.filter((t) => t !== team);
        return { ...prev, [letter]: newOrder };
      }

      if (currentOrder.length >= 3) {
        return prev;
      }

      return { ...prev, [letter]: [...currentOrder, team] };
    });
  };

  const getTeamRank = (letter, team, teams) => {
    const order = rankings[letter] || [];
    const manualIndex = order.indexOf(team);

    if (manualIndex !== -1) return manualIndex + 1;

    if (order.length === 3) {
      const remaining = teams.find((t) => !order.includes(t));
      if (remaining === team) return 4;
    }

    return null;
  };

  return { rankings, handleTeamClick, getTeamRank };
};