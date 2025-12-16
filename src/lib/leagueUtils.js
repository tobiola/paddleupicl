import { rules } from '../data/rules';

export const calculateSeasonStats = (seasonData) => {
  const playerStats = {};

  // Initialize stats for all players found in the season
  // We'll discover players as we iterate, or we could pass a player list.
  // For now, let's build it dynamically.

  seasonData.weeks.forEach(week => {
    if (!week.isCompleted) return;

    // 1. Calculate League Points from Rankings
    week.rankings.forEach((playerId, index) => {
      if (!playerStats[playerId]) {
        playerStats[playerId] = {
          id: playerId,
          points: 0,
          wins: 0,
          losses: 0,
          pointsWon: 0,
          pointsLost: 0,
          diff: 0,
          appearances: 0,
          champCourt: 0,
          weeklyRanks: [] // Track history
        };
      }

      const rank = index + 1;
      const points = getPointsForRank(rank);
      
      playerStats[playerId].points += points;
      playerStats[playerId].appearances += 1;
      playerStats[playerId].weeklyRanks.push(rank);

      // Champ Court Appearance: Top 4 finish implies they ended on Champ Court
      if (rank <= 4) {
        playerStats[playerId].champCourt += 1;
      }
    });

    // 2. Calculate Wins/Losses/Diff from Matches
    if (week.matches) {
      week.matches.forEach(match => {
        const { team1, team2, score1, score2 } = match;
        const diff = score1 - score2;

        // Team 1 Stats
        team1.forEach(pid => {
          if (!playerStats[pid]) return; // Should exist from rankings, but safety check
          playerStats[pid].diff += diff;
          playerStats[pid].pointsWon += score1;
          playerStats[pid].pointsLost += score2;
          if (score1 > score2) playerStats[pid].wins += 1;
          else playerStats[pid].losses += 1;
        });

        // Team 2 Stats
        team2.forEach(pid => {
          if (!playerStats[pid]) return;
          playerStats[pid].diff -= diff;
          playerStats[pid].pointsWon += score2;
          playerStats[pid].pointsLost += score1;
          if (score2 > score1) playerStats[pid].wins += 1;
          else playerStats[pid].losses += 1;
        });
      });
    }
  });

  // Convert to array and sort
  return Object.values(playerStats).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.diff - a.diff;
  });
};

export const calculateAllTimeStats = (currentSeason, pastSeasons) => {
  const allStats = {};
  
  // Process current season
  const currentStats = calculateSeasonStats(currentSeason);
  currentStats.forEach(p => {
    if (!allStats[p.id]) allStats[p.id] = { points: 0, seasons: 0 };
    allStats[p.id].points += p.points;
    allStats[p.id].seasons += 1;
  });

  // Process past seasons
  pastSeasons.forEach(season => {
    season.standings.forEach(p => {
      if (!allStats[p.playerId]) allStats[p.playerId] = { points: 0, seasons: 0 };
      allStats[p.playerId].points += p.points;
      allStats[p.playerId].seasons += 1;
    });
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

export const getNextCourt = (round, court, rank) => {
  const rNum = parseInt(round);
  const cNum = parseInt(court);

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

export const generateSnakeDraw = (rankedPlayers) => {
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

export const getPointsForRank = (rank) => {
  const { championship, court2, court3, court4 } = rules.points;

  // Champ Court (1-4)
  if (rank <= 4) return championship[rank] || 0;
  
  // Court 2 (5-8)
  if (rank <= 8) return court2[rank - 4] || 0;

  // Court 3 (9-12)
  if (rank <= 12) return court3[rank - 8] || 0;

  // Court 4 (13-16)
  if (rank <= 16) return court4[rank - 12] || 0;

  return 0;
};
