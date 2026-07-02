import { useState, useMemo } from "react";
import { MATCH_TEMPLATE, MATCH_IDS } from "./KnockoutData";
import { annexC, ANNEX_C_COL_ORDER } from "./ThirdPlaceMatrix";

// Build the group-letter -> qualifying-3rd-place-team map, and the Annex C
// anchor map (which anchor match gets which group's 3rd place team) for the
// exact set of 8 groups the user picked to qualify.
const buildThirdPlaceContext = (thirdPlaceTeams, selectedOrder) => {
  const thirdPlaceByGroup = {};
  thirdPlaceTeams.forEach(({ letter, team }) => {
    if (selectedOrder.includes(team)) thirdPlaceByGroup[letter] = team;
  });

  const qualGroups = Object.keys(thirdPlaceByGroup).sort();
  const key = qualGroups.join("");
  const row = annexC[key];

  const annexMap = {};
  if (row) {
    ANNEX_C_COL_ORDER.forEach((anchor, i) => {
      annexMap[anchor] = row[i];
    });
  }

  return { thirdPlaceByGroup, annexMap, isComplete: qualGroups.length === 8 && !!row };
};

const resolveSide = (side, { rankings, thirdPlaceByGroup, annexMap, picks, resolved }) => {
  switch (side.type) {
    case "W":
      return rankings[side.group]?.[0] ?? null;
    case "RU":
      return rankings[side.group]?.[1] ?? null;
    case "T3": {
      const group = annexMap[side.anchor];
      return group ? thirdPlaceByGroup[group] ?? null : null;
    }
    case "MW":
      return picks[side.match] ?? null;
    case "ML": {
      const ref = resolved[side.match];
      const winner = picks[side.match];
      if (!winner || !ref?.home || !ref?.away) return null;
      return winner === ref.home ? ref.away : ref.home;
    }
    default:
      return null;
  }
};

// Walks every match in bracket order, resolving home/away teams and
// dropping any stored pick that's no longer valid for that matchup
// (e.g. the user changed an earlier winner).
const resolveBracket = (rawPicks, ctx) => {
  const resolved = {};
  const picks = { ...rawPicks };

  MATCH_IDS.forEach((id) => {
    const tmpl = MATCH_TEMPLATE[id];
    const home = resolveSide(tmpl.home, { ...ctx, picks, resolved });
    const away = resolveSide(tmpl.away, { ...ctx, picks, resolved });
    resolved[id] = { home, away };

    if (picks[id] && picks[id] !== home && picks[id] !== away) {
      delete picks[id];
    }
  });

  return { resolved, picks };
};

export const useKnockoutLogic = (groups, rankings, thirdPlaceTeams, selectedOrder) => {
  const [rawPicks, setRawPicks] = useState({});

  const thirdPlaceContext = useMemo(
    () => buildThirdPlaceContext(thirdPlaceTeams, selectedOrder),
    [thirdPlaceTeams, selectedOrder]
  );

  const { resolved, picks } = useMemo(() => {
    if (!thirdPlaceContext.isComplete) return { resolved: {}, picks: {} };
    return resolveBracket(rawPicks, { rankings, ...thirdPlaceContext });
  }, [rawPicks, rankings, thirdPlaceContext]);

  const matches = useMemo(
    () =>
      MATCH_IDS.map((id) => ({
        id,
        round: MATCH_TEMPLATE[id].round,
        home: resolved[id]?.home ?? null,
        away: resolved[id]?.away ?? null,
        winner: picks[id] ?? null,
      })),
    [resolved, picks]
  );

  const pickWinner = (matchId, team) => {
    const match = resolved[matchId];
    if (!match) return;
    if (team !== match.home && team !== match.away) return;

    setRawPicks((prev) => {
      if (prev[matchId] === team) {
        const next = { ...prev };
        delete next[matchId]; // click again to undo
        return next;
      }
      return { ...prev, [matchId]: team };
    });
  };

  const champion = matches.find((m) => m.id === 104)?.winner ?? null;
  const thirdPlaceFinisher = matches.find((m) => m.id === 103)?.winner ?? null;

  return {
    isReady: thirdPlaceContext.isComplete,
    matches,
    pickWinner,
    champion,
    thirdPlaceFinisher,
  };
};