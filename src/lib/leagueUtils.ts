import { rules } from '../data/rules';
import { Season, PlayerStats, AllTimeStats, Player, Match, Week } from '../types';

/**
 * Points mapping by rank (courts).
 */
export const getPointsForRank = (rank: number): number => {
  const { championship, court2, court3, court4 } = rules.points;

  // Helper to safely index readonly literal objects
  const safeLookup = (obj: any, key: number) => {
    return (obj && (obj as any)[key]) ? (obj as any)[key] : 0;
  };

  // Champ Court (1-4)
  if (rank <= 4) return safeLookup(championship, rank);
  
  // Court 2 (5-8)
  if (rank <= 8) return safeLookup(court2, rank - 4);

  // Court 3 (9-12)
  if (rank <= 12) return safeLookup(court3, rank - 8);

  // Court 4 (13-16)
  if (rank <= 16) return safeLookup(court4, rank - 12);

  return 0;
};

/**
 * Compute per-week aggregates from matches.
 */
const aggregatesFromWeek = (week: Week): Record<string, PlayerStats> => {
  const agg: Record<string, PlayerStats> = {};

  const ensure = (pid: string) => {
    if (!agg[pid]) {
      agg[pid] = {
        id: pid,
        points: 0,
        wins: 0,
        losses: 0,
        pointsWon: 0,
        pointsLost: 0,
        diff: 0,
        appearances: 0,
        champCourt: 0,
        weeklyRanks: []
      };
    }
  };

  if (!week.matches) return agg;

  week.matches.forEach((m: Match) => {
    const { team1, team2, score1, score2 } = m;
    const team1Won = score1 > score2;
    const team2Won = score2 > score1;

    // Ensure all player entries exist and increment appearance
    team1.forEach(pid => { ensure(pid); agg[pid].appearances += 1; });
    team2.forEach(pid => { ensure(pid); agg[pid].appearances += 1; });

    // Points and diff
    team1.forEach(pid => {
      agg[pid].pointsWon += score1;
      agg[pid].pointsLost += score2;
      agg[pid].diff += (score1 - score2);
      if (team1Won) agg[pid].wins += 1;
      if (team2Won || score1 === score2) agg[pid].losses += 1;
    });
    team2.forEach(pid => {
      agg[pid].pointsWon += score2;
      agg[pid].pointsLost += score1;
      agg[pid].diff += (score2 - score1);
      if (team2Won) agg[pid].wins += 1;
      if (team1Won || score1 === score2) agg[pid].losses += 1;
    });
  });

  return agg;
};


/**
 * Compute final positions for a week based on round 3 court assignments.
 * Returns null if week is not eligible (missing round 3/court metadata or not completed).
 */
export const calculateWeekFinalPositions = (week: Week) => {
  if (!week.isCompleted || !week.matches) return null;

  // Ensure round 3 has matches for courts 1..4 (require full metadata)
  const round3Matches = week.matches.filter(m => m.round === 3 && typeof m.court === 'number');
  const courtsPresent = new Set(round3Matches.map(m => m.court));
  const requiredCourts = [1, 2, 3, 4];
  for (const c of requiredCourts) {
    if (!courtsPresent.has(c)) return null; // incomplete metadata -> do not award points
  }

  // Helper: get matches for specific round+court
  const matchesFor = (round: number, court: number) => week.matches!.filter(m => m.round === round && m.court === court);

  // For final positions we only need round 3 per court
  const results: {
    playerId: string;
    finalCourt: number;
    finalPosition: number;
    globalRank: number;
    pointsEarned: number;
  }[] = [];

  for (const court of requiredCourts) {
    const matches = matchesFor(3, court);
    // Build per-player stats for this court's round 3
    const agg: Record<string, PlayerStats> = {};
    const ensure = (pid: string) => {
      if (!agg[pid]) {
        agg[pid] = {
          id: pid,
          points: 0,
          wins: 0,
          losses: 0,
          pointsWon: 0,
          pointsLost: 0,
          diff: 0,
          appearances: 0,
          champCourt: 0,
          weeklyRanks: []
        };
      }
    };
    matches.forEach(m => {
      const { team1, team2, score1, score2 } = m;
      const team1Won = score1 > score2;
      const team2Won = score2 > score1;

      team1.forEach(pid => { ensure(pid); agg[pid].appearances += 1; agg[pid].pointsWon += score1; agg[pid].pointsLost += score2; agg[pid].diff += (score1 - score2); if (team1Won) agg[pid].wins += 1; if (team2Won || score1 === score2) agg[pid].losses += 1; });
      team2.forEach(pid => { ensure(pid); agg[pid].appearances += 1; agg[pid].pointsWon += score2; agg[pid].pointsLost += score1; agg[pid].diff += (score2 - score1); if (team2Won) agg[pid].wins += 1; if (team1Won || score1 === score2) agg[pid].losses += 1; });
    });

    const players = Object.values(agg);
    // comparator restricted to matches for this court/round
    const comparator = (a: PlayerStats, b: PlayerStats) => {
      if ((a.wins || 0) !== (b.wins || 0)) return (b.wins || 0) - (a.wins || 0);
      // head-to-head restricted to these matches
      let aWins = 0, bWins = 0;
      matches.forEach(m => {
        const aOnTeam1 = m.team1.includes(a.id);
        const aOnTeam2 = m.team2.includes(a.id);
        const bOnTeam1 = m.team1.includes(b.id);
        const bOnTeam2 = m.team2.includes(b.id);
        if ((aOnTeam1 && bOnTeam2) || (aOnTeam2 && bOnTeam1)) {
          if (m.score1 > m.score2) {
            if (aOnTeam1) aWins++;
            if (bOnTeam1) bWins++;
          } else if (m.score2 > m.score1) {
            if (aOnTeam2) aWins++;
            if (bOnTeam2) bWins++;
          }
        }
      });
      if (aWins !== bWins) return bWins - aWins; // more head-to-head wins first
      if ((a.diff || 0) !== (b.diff || 0)) return (b.diff || 0) - (a.diff || 0);
      if ((a.pointsWon || 0) !== (b.pointsWon || 0)) return (b.pointsWon || 0) - (a.pointsWon || 0);
      if ((a.losses || 0) !== (b.losses || 0)) return (a.losses || 0) - (b.losses || 0);
      return a.id.localeCompare(b.id);
    };

    players.sort(comparator);

    players.forEach((p, idx) => {
      const position = idx + 1;
      const globalRank = (court - 1) * 4 + position;
      const pointsEarned = getPointsForRank(globalRank);
      results.push({
        playerId: p.id,
        finalCourt: court,
        finalPosition: position,
        globalRank,
        pointsEarned
      });
    });
  }

  return results;
};

/**
 * Calculate season-level aggregated PlayerStats by deriving weekly final court positions from matches.
 * Points for a week are only awarded based on final positions after round 3 (per rules).
 */
export const calculateSeasonStats = (seasonData: Season): PlayerStats[] => {
  const cumulative: Record<string, PlayerStats> = {};

  if (!seasonData.weeks) return [];

  seasonData.weeks.forEach(week => {
    if (!week.isCompleted) return;

    const finalPositions = calculateWeekFinalPositions(week);
    if (!finalPositions) return; // require full round3+court metadata

    // Aggregate per-week match-level stats (all rounds) to accumulate wins/losses/diff etc.
    const weekAgg = aggregatesFromWeek(week);

    finalPositions.forEach(fp => {
      const pid = fp.playerId;
      if (!cumulative[pid]) {
        cumulative[pid] = {
          id: pid,
          points: 0,
          wins: 0,
          losses: 0,
          pointsWon: 0,
          pointsLost: 0,
          diff: 0,
          appearances: 0,
          champCourt: 0,
          weeklyRanks: []
        };
      }

      cumulative[pid].points += fp.pointsEarned;
      // accumulate match stats from weekAgg if present
      const w = weekAgg[pid];
      if (w) {
        cumulative[pid].wins += w.wins || 0;
        cumulative[pid].losses += w.losses || 0;
        cumulative[pid].pointsWon += w.pointsWon || 0;
        cumulative[pid].pointsLost += w.pointsLost || 0;
        cumulative[pid].diff += w.diff || 0;
        cumulative[pid].appearances += w.appearances || 0;
      }
      cumulative[pid].weeklyRanks.push(fp.globalRank);
      if (fp.globalRank <= 4) cumulative[pid].champCourt += 1;
    });
  });

  // Convert to array and sort final season standings by points (primary), wins, diff
  return Object.values(cumulative).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.diff - a.diff;
  });
};

/**
 * Calculate all-time stats by summing season points.
 * For past seasons that provide stored standings we use them; otherwise derive from matches.
 */
export const calculateAllTimeStats = (currentSeason: Season, pastSeasons: Season[]): AllTimeStats[] => {
  const allStats: Record<string, { points: number; seasons: number }> = {};
  
  // Process current season (derive)
  const currentStats = calculateSeasonStats(currentSeason);
  currentStats.forEach(p => {
    if (!allStats[p.id]) allStats[p.id] = { points: 0, seasons: 0 };
    allStats[p.id].points += p.points;
    allStats[p.id].seasons += 1;
  });

  // Process past seasons (use stored standings if present, else derive)
  pastSeasons.forEach(season => {
    if (season.standings && season.standings.length > 0) {
      season.standings.forEach(p => {
        if (!allStats[p.playerId]) allStats[p.playerId] = { points: 0, seasons: 0 };
        allStats[p.playerId].points += p.points;
        allStats[p.playerId].seasons += 1;
      });
    } else {
      const derived = calculateSeasonStats(season);
      derived.forEach(p => {
        if (!allStats[p.id]) allStats[p.id] = { points: 0, seasons: 0 };
        allStats[p.id].points += p.points;
        allStats[p.id].seasons += 1;
      });
    }
  });

  return Object.entries(allStats)
    .map(([playerId, stats]) => ({
      playerId,
      points: stats.points,
      seasons: stats.seasons
    }))
    .sort((a, b) => b.points - a.points)
    .map((stat, index) => ({ ...stat, rank: index + 1 }));
};

/**
 * Helpers used by the calculator UI (existing logic preserved).
 */
export const getNextCourt = (round: number | string, court: number | string, rank: number): number | string => {
  const rNum = typeof round === 'string' ? parseInt(round) : round;
  const cNum = typeof court === 'string' ? parseInt(court) : court;

  if (rNum === 1) {
    // Round 1 Logic
    if (cNum === 1 || cNum === 4) {
      if (rank === 1) return 1;
      if (rank === 2) return 2;
      if (rank === 3) return 3;
      if (rank === 4) return 4;
    } else if (cNum === 2 || cNum === 3) {
      if (rank === 1) return 2;
      if (rank === 2) return 1;
      if (rank === 3) return 4;
      if (rank === 4) return 3;
    }
  } else if (rNum === 2) {
    // Round 2 Logic
    if (cNum === 1 || cNum === 2) {
      if (rank <= 2) return 1;
      return 2;
    } else if (cNum === 3 || cNum === 4) {
      if (rank <= 2) return 3;
      return 4;
    }
  } else if (rNum === 3) {
    return "DONE";
  }
  return "TBD";
};

export const generateSnakeDraw = (rankedPlayers: Player[]): { id: number; name: string; indices: number[]; players: (Player & { seed: number })[] }[] => {
  // Snake Draw Logic
  // Court 1: 1, 8, 9, 16 (Indices: 0, 7, 8, 15)
  // Court 2: 2, 7, 10, 15 (Indices: 1, 6, 9, 14)
  // Court 3: 3, 6, 11, 14 (Indices: 2, 5, 10, 13)
  // Court 4: 4, 5, 12, 13 (Indices: 3, 4, 11, 12)
  
  const courts = [
    { id: 1, name: "Championship Court", indices: [0, 7, 8, 15] },
    { id: 2, name: "Court 2", indices: [1, 6, 9, 14] },
    { id: 3, name: "Court 3", indices: [2, 5, 10, 13] },
    { id: 4, name: "Court 4", indices: [3, 4, 11, 12] },
  ];

  return courts.map(court => ({
    ...court,
    players: court.indices
      .map(idx => rankedPlayers[idx])
      .filter(Boolean) // Handle case where < 16 players selected
      .map((p, i) => ({ ...p, seed: court.indices[i] + 1 }))
  }));
};
