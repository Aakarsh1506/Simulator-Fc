import "./KnockoutBracket.css";
import { countryCodes } from "./GroupLogic";
import { ROUND_LABELS } from "./KnockoutData";

const LEFT_R32 = [73, 74, 75, 77, 81, 82, 83, 84];
const RIGHT_R32 = [76, 78, 79, 80, 85, 86, 87, 88];
const LEFT_R16 = [89, 90, 93, 94];
const RIGHT_R16 = [91, 92, 95, 96];
const LEFT_QF = [97, 98];
const RIGHT_QF = [99, 100];
const LEFT_SF = [101];
const RIGHT_SF = [102];

const Flag = ({ team }) =>
  team ? (
    <img
      src={`https://flagcdn.com/24x18/${countryCodes[team]}.png`}
      alt={`${team} flag`}
      className="ko-flag"
    />
  ) : (
    <span className="ko-flag ko-flag-placeholder" />
  );

const TeamRow = ({ team, isWinner, disabled, onClick }) => (
  <div
    className={`ko-team${isWinner ? " ko-winner" : ""}${!team ? " ko-tbd" : ""}`}
    onClick={!disabled && team ? onClick : undefined}
  >
    <Flag team={team} />
    <span className="ko-team-name">{team ?? "TBD"}</span>
  </div>
);

const MatchCard = ({ match, pickWinner }) => (
  <div className="ko-match" data-match={match.id}>
    <TeamRow
      team={match.home}
      isWinner={match.winner === match.home}
      onClick={() => pickWinner(match.id, match.home)}
    />
    <TeamRow
      team={match.away}
      isWinner={match.winner === match.away}
      onClick={() => pickWinner(match.id, match.away)}
    />
  </div>
);

const RoundColumn = ({ label, matches, pickWinner, extraClass = "" }) => (
  <div className={`ko-round-column ${extraClass}`}>
    <div className="ko-round-header">{label}</div>
    <div className="ko-round-matches">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} pickWinner={pickWinner} />
      ))}
    </div>
  </div>
);

const ResultBlock = ({ team, label, icon, side = false }) => (
  <div className={`ko-result-block${side ? " ko-result-side" : ""}`}>
    <div className="ko-result-label">
      <span className="ko-result-icon">{icon}</span>
      {label}
    </div>
    <div className="ko-team ko-result-team">
      <Flag team={team} />
      <span className="ko-team-name">{team}</span>
    </div>
  </div>
);

const byIds = (matches, ids) =>
  ids.map((id) => matches.find((m) => m.id === id)).filter(Boolean);

const KnockoutBracket = ({ matches, pickWinner, champion, thirdPlaceFinisher }) => {
  const finalMatch = matches.filter((m) => m.round === "FINAL");
  const thirdMatch = matches.filter((m) => m.round === "THIRD");

  return (
    <div className="knockout-wrapper">
      <div className="ko-bracket-scroll">
        <RoundColumn label={ROUND_LABELS.R32} matches={byIds(matches, LEFT_R32)} pickWinner={pickWinner} />
        <RoundColumn label={ROUND_LABELS.R16} matches={byIds(matches, LEFT_R16)} pickWinner={pickWinner} />
        <RoundColumn label={ROUND_LABELS.QF} matches={byIds(matches, LEFT_QF)} pickWinner={pickWinner} />
        <RoundColumn label={ROUND_LABELS.SF} matches={byIds(matches, LEFT_SF)} pickWinner={pickWinner} />

        <div className="ko-center-column">
          <div className="ko-final-wrap">
            {champion && (
              <>
                <ResultBlock team={champion} label="Champions" icon="🏆" />
                <div className="ko-connector-v" />
              </>
            )}
            <RoundColumn label={ROUND_LABELS.FINAL} matches={finalMatch} pickWinner={pickWinner} />
          </div>

          <div className="ko-third-wrap">
            <RoundColumn
              label={ROUND_LABELS.THIRD}
              matches={thirdMatch}
              pickWinner={pickWinner}
              extraClass="ko-third-column"
            />
            {thirdPlaceFinisher && (
              <>
                <div className="ko-connector-h" />
                <ResultBlock team={thirdPlaceFinisher} label="3rd Place" icon="🥉" side />
              </>
            )}
          </div>
        </div>

        <RoundColumn label={ROUND_LABELS.SF} matches={byIds(matches, RIGHT_SF)} pickWinner={pickWinner} />
        <RoundColumn label={ROUND_LABELS.QF} matches={byIds(matches, RIGHT_QF)} pickWinner={pickWinner} />
        <RoundColumn label={ROUND_LABELS.R16} matches={byIds(matches, RIGHT_R16)} pickWinner={pickWinner} />
        <RoundColumn label={ROUND_LABELS.R32} matches={byIds(matches, RIGHT_R32)} pickWinner={pickWinner} />
      </div>
    </div>
  );
};

export default KnockoutBracket;