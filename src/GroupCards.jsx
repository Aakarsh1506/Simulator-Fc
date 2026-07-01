import "./GroupCards.css";
import { groups, countryCodes } from "./GroupLogic";

const GroupCards = ({ handleTeamClick, getTeamRank }) => {
  return (
    <div className="groups-wrapper">
      {Object.entries(groups).map(([letter, teams]) => (
        <div key={letter} className="group-cards">
          <div className="group-header">
            <p className="group-cards-title">Group {letter}</p>
          </div>
          <div className="group-ard-team">
            {teams.map((team) => {
              const rank = getTeamRank(letter, team, teams);
              const isAuto = rank === 4;
              const isSelected = rank !== null;

              return (
                <div
                  key={team}
                  className={`team-slot${isSelected ? " selected" : ""}${
                    isAuto ? " auto-selected" : ""
                  }`}
                  onClick={() => handleTeamClick(letter, team)}
                >
                  <span className="team-radio">{rank ?? ""}</span>
                  <img
                    src={`https://flagcdn.com/24x18/${countryCodes[team]}.png`}
                    alt={`${team} flag`}
                    className="team-flag"
                  />
                  <span className="team-name">{team}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupCards;