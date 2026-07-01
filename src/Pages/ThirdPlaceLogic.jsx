import { useState } from "react";

// Given groups + rankings from the group stage, extract each group's
// manually-picked 3rd place team (order[2] — the 3rd click, not the auto 4th).
export const getThirdPlaceTeams = (groups, rankings) => {
  return Object.entries(groups)
    .map(([letter, teams]) => {
      const order = rankings[letter] || [];
      const thirdPlaceTeam = order[2]; // 3rd manually-ranked team
      return thirdPlaceTeam ? { letter, team: thirdPlaceTeam } : null;
    })
    .filter(Boolean); // drop any group that isn't fully ranked yet
};

// Are all 12 groups fully ranked (3 manual picks each, so the 4th is derived)?
export const areAllGroupsComplete = (groups, rankings) => {
  return Object.keys(groups).every(
    (letter) => (rankings[letter] || []).length === 3
  );
};

export const useThirdPlaceLogic = () => {
  // Ordered array of team names the user has clicked to qualify, max length 8
  const [selectedOrder, setSelectedOrder] = useState([]);

  const handleThirdPlaceClick = (team) => {
    setSelectedOrder((prev) => {
      const alreadySelected = prev.includes(team);

      if (alreadySelected) {
        // Deselect, so the user can re-pick
        return prev.filter((t) => t !== team);
      }

      if (prev.length >= 8) {
        return prev; // 8 already chosen, ignore further clicks
      }

      return [...prev, team];
    });
  };

  // status: 'qualified' (blue), 'eliminated' (red, only once 8 are picked), or null (neutral)
  const getThirdPlaceStatus = (team) => {
    if (selectedOrder.includes(team)) return "qualified";
    if (selectedOrder.length === 8) return "eliminated";
    return null;
  };

  const getThirdPlaceRank = (team) => {
    const index = selectedOrder.indexOf(team);
    return index !== -1 ? index + 1 : null;
  };

  return {
    selectedOrder,
    handleThirdPlaceClick,
    getThirdPlaceStatus,
    getThirdPlaceRank,
  };
};