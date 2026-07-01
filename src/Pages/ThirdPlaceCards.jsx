import "./ThirdPlaceCards.css";
import { countryCodes } from "./GroupLogic";

const ThirdPlaceCards = ({
  thirdPlaceTeams,
  handleThirdPlaceClick,
  getThirdPlaceStatus,
  getThirdPlaceRank,
}) => {
  return (
    <div className="third-place-wrapper">
      <div className="third-place-header-bar">
        <h2>Best 3rd Place Teams — Pick 8 to Qualify for Round of 32</h2>
      </div>
      <div className="third-place-grid">
        {thirdPlaceTeams.map(({ letter, team }) => {
          const status = getThirdPlaceStatus(team);
          const rank = getThirdPlaceRank(team);

          return (
            <div
              key={team}
              className={`third-slot${status ? ` ${status}` : ""}`}
              onClick={() => handleThirdPlaceClick(team)}
            >
              <span className="third-radio">{rank ?? ""}</span>
              <img
                src={`https://flagcdn.com/24x18/${countryCodes[team]}.png`}
                alt={`${team} flag`}
                className="third-flag"
              />
              <span className="third-name">{team}</span>
              <span className="third-group-tag">Grp {letter}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThirdPlaceCards;