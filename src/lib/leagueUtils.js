import { rules } from '../data/leagueData';

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
          if (score1 > score2) playerStats[pid].wins += 1;
          else playerStats[pid].losses += 1;
        });

        // Team 2 Stats
        team2.forEach(pid => {
          if (!playerStats[pid]) return;
          playerStats[pid].diff -= diff;
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

const getPointsForRank = (rank) => {
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
