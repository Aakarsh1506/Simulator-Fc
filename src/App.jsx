import { useState } from "react";
import Logo from "./Pages/Logo";
import GroupCards from "./Pages/GroupCards";
import ThirdPlaceCards from "./Pages/ThirdPlaceCards";
import KnockoutBracket from "./Pages/KnockoutBracket";
import {
  useGroupLogic,
  groups,
} from "./Pages/GroupLogic";
import {
  useThirdPlaceLogic,
  getThirdPlaceTeams,
  areAllGroupsComplete,
} from "./Pages/ThirdPlaceLogic";
import { useKnockoutLogic } from "./Pages/KnockoutLogic";
import "./App.css";

const App = () => {
  const [page, setPage] = useState("groups"); // 'groups' | 'thirdPlace' | 'knockout'

  const { rankings, handleTeamClick, getTeamRank } = useGroupLogic();
  const {
    selectedOrder,
    handleThirdPlaceClick,
    getThirdPlaceStatus,
    getThirdPlaceRank,
  } = useThirdPlaceLogic();

  const allComplete = areAllGroupsComplete(groups, rankings);
  const thirdPlaceTeams = getThirdPlaceTeams(groups, rankings);
  const thirdPlaceComplete = selectedOrder.length === 8;

  const { matches, pickWinner, champion, thirdPlaceFinisher } = useKnockoutLogic(
    groups,
    rankings,
    thirdPlaceTeams,
    selectedOrder
  );

  return (
    <div className="app-shell">
      <Logo />

      {page === "groups" && (
        <>
          <GroupCards
            handleTeamClick={handleTeamClick}
            getTeamRank={getTeamRank}
          />
          <div className="continue-bar">
            <button
              className="continue-button"
              disabled={!allComplete}
              onClick={() => setPage("thirdPlace")}
            >
              {allComplete
                ? "Continue to 3rd Place Selection →"
                : "Rank all 12 groups to continue"}
            </button>
          </div>
        </>
      )}

      {page === "thirdPlace" && (
        <>
          <ThirdPlaceCards
            thirdPlaceTeams={thirdPlaceTeams}
            handleThirdPlaceClick={handleThirdPlaceClick}
            getThirdPlaceStatus={getThirdPlaceStatus}
            getThirdPlaceRank={getThirdPlaceRank}
          />
          <div className="continue-bar">
            <button
              className="continue-button"
              disabled={!thirdPlaceComplete}
              onClick={() => setPage("knockout")}
            >
              {thirdPlaceComplete
                ? "Continue to Round of 32 →"
                : "Pick 8 third-place teams to continue"}
            </button>
          </div>
        </>
      )}

      {page === "knockout" && (
        <KnockoutBracket
          matches={matches}
          pickWinner={pickWinner}
          champion={champion}
          thirdPlaceFinisher={thirdPlaceFinisher}
        />
      )}
    </div>
  );
};

export default App;