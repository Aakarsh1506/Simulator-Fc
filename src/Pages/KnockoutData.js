// Official FIFA World Cup 2026 knockout stage bracket structure.
// Match numbers (73-104) and pairings match FIFA's published tournament regulations.
//
// Side reference types:
//   W   -> group winner            (rankings[group][0])
//   RU  -> group runner-up         (rankings[group][1])
//   T3  -> best-3rd-place team slotted in via the Annex C matrix (see ThirdPlaceMatrix.js)
//   MW  -> winner of an earlier match in this bracket
//   ML  -> loser of an earlier match (used only for the 3rd place play-off)

export const ROUND_LABELS = {
  R32: "Round of 32",
  R16: "Round of 16",
  QF: "Quarter-Finals",
  SF: "Semi-Finals",
  THIRD: "3rd Place Play-off",
  FINAL: "Final",
};

export const ROUND_ORDER = ["R32", "R16", "QF", "SF", "THIRD", "FINAL"];

export const MATCH_TEMPLATE = {
  // ---- Round of 32 ----
  73: { round: "R32", home: { type: "RU", group: "A" }, away: { type: "RU", group: "B" } },
  74: { round: "R32", home: { type: "W", group: "E" }, away: { type: "T3", anchor: "E" } },
  75: { round: "R32", home: { type: "W", group: "F" }, away: { type: "RU", group: "C" } },
  76: { round: "R32", home: { type: "W", group: "C" }, away: { type: "RU", group: "F" } },
  77: { round: "R32", home: { type: "W", group: "I" }, away: { type: "T3", anchor: "I" } },
  78: { round: "R32", home: { type: "RU", group: "E" }, away: { type: "RU", group: "I" } },
  79: { round: "R32", home: { type: "W", group: "A" }, away: { type: "T3", anchor: "A" } },
  80: { round: "R32", home: { type: "W", group: "L" }, away: { type: "T3", anchor: "L" } },
  81: { round: "R32", home: { type: "W", group: "D" }, away: { type: "T3", anchor: "D" } },
  82: { round: "R32", home: { type: "W", group: "G" }, away: { type: "T3", anchor: "G" } },
  83: { round: "R32", home: { type: "RU", group: "K" }, away: { type: "RU", group: "L" } },
  84: { round: "R32", home: { type: "W", group: "H" }, away: { type: "RU", group: "J" } },
  85: { round: "R32", home: { type: "W", group: "B" }, away: { type: "T3", anchor: "B" } },
  86: { round: "R32", home: { type: "W", group: "J" }, away: { type: "RU", group: "H" } },
  87: { round: "R32", home: { type: "W", group: "K" }, away: { type: "T3", anchor: "K" } },
  88: { round: "R32", home: { type: "RU", group: "D" }, away: { type: "RU", group: "G" } },

  // ---- Round of 16 ----
  89: { round: "R16", home: { type: "MW", match: 74 }, away: { type: "MW", match: 77 } },
  90: { round: "R16", home: { type: "MW", match: 73 }, away: { type: "MW", match: 75 } },
  91: { round: "R16", home: { type: "MW", match: 76 }, away: { type: "MW", match: 78 } },
  92: { round: "R16", home: { type: "MW", match: 79 }, away: { type: "MW", match: 80 } },
  93: { round: "R16", home: { type: "MW", match: 83 }, away: { type: "MW", match: 84 } },
  94: { round: "R16", home: { type: "MW", match: 81 }, away: { type: "MW", match: 82 } },
  95: { round: "R16", home: { type: "MW", match: 86 }, away: { type: "MW", match: 88 } },
  96: { round: "R16", home: { type: "MW", match: 85 }, away: { type: "MW", match: 87 } },

  // ---- Quarter-Finals ----
  97: { round: "QF", home: { type: "MW", match: 89 }, away: { type: "MW", match: 90 } },
  98: { round: "QF", home: { type: "MW", match: 93 }, away: { type: "MW", match: 94 } },
  99: { round: "QF", home: { type: "MW", match: 91 }, away: { type: "MW", match: 92 } },
  100: { round: "QF", home: { type: "MW", match: 95 }, away: { type: "MW", match: 96 } },

  // ---- Semi-Finals ----
  101: { round: "SF", home: { type: "MW", match: 97 }, away: { type: "MW", match: 98 } },
  102: { round: "SF", home: { type: "MW", match: 99 }, away: { type: "MW", match: 100 } },

  // ---- 3rd Place Play-off & Final ----
  103: { round: "THIRD", home: { type: "ML", match: 101 }, away: { type: "ML", match: 102 } },
  104: { round: "FINAL", home: { type: "MW", match: 101 }, away: { type: "MW", match: 102 } },
};

export const MATCH_IDS = Object.keys(MATCH_TEMPLATE).map(Number).sort((a, b) => a - b);