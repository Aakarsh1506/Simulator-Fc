import { useState } from "react";
import Logo from "./Logo";
import GroupCards from "./GroupCards";
import ThirdPlaceCards from "./ThirdPlaceCards";
import {
  useGroupLogic,
  groups,
} from "./GroupLogic";
import {
  useThirdPlaceLogic,
  getThirdPlaceTeams,
  areAllGroupsComplete,
} from "./ThirdPlaceLogic";
import "./App.css";

const App = () => {
  const [page, setPage] = useState("groups"); // 'groups' | 'thirdPlace'

  const { rankings, handleTeamClick, getTeamRank } = useGroupLogic();
  const {
    handleThirdPlaceClick,
    getThirdPlaceStatus,
    getThirdPlaceRank,
  } = useThirdPlaceLogic();

  const allComplete = areAllGroupsComplete(groups, rankings);
  const thirdPlaceTeams = getThirdPlaceTeams(groups, rankings);

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
        <ThirdPlaceCards
          thirdPlaceTeams={thirdPlaceTeams}
          handleThirdPlaceClick={handleThirdPlaceClick}
          getThirdPlaceStatus={getThirdPlaceStatus}
          getThirdPlaceRank={getThirdPlaceRank}
        />
      )}
    </div>
  );
};

export default App;