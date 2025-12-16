import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { seasonData, pastSeasons, players } from '../data/leagueData';
import { calculateSeasonStats } from '../lib/leagueUtils';
import { Trophy, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import WeeklyPoints from '../components/WeeklyPoints';
import Card from '../components/ui/Card';
import PlayerAvatar from '../components/ui/PlayerAvatar';
import PageHeader from '../components/ui/PageHeader';
import RankBadge from '../components/ui/RankBadge';

const Standings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const seasonParam = searchParams.get('season');
  const isAllTime = seasonParam === 'all-time';

  // Combine all seasons into one list for the selector
  const allSeasons = [seasonData, ...pastSeasons];
  const selectedSeason = !isAllTime ? (allSeasons.find(s => s.season === seasonParam) || seasonData) : null;

  // Calculate standings if needed
  const standings = useMemo(() => {
    if (isAllTime) {
      const allStats = {};
      
      // Process current season
      const currentStats = calculateSeasonStats(seasonData);
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
    }

    if (selectedSeason.weeks) {
      return calculateSeasonStats(selectedSeason).map((stat, index) => ({
        ...stat,
        rank: index + 1,
        playerId: stat.id
      }));
    }
    return selectedSeason.standings;
  }, [selectedSeason, isAllTime]);

  const handleSeasonChange = (e) => {
    const newSeason = e.target.value;
    if (newSeason === seasonData.season) {
      searchParams.delete('season');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ season: newSeason });
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader 
        title={isAllTime ? "All-Time Standings" : "Standings"}
        subtitle={isAllTime ? "Cumulative points across all seasons" : (selectedSeason.date || `Last Updated: ${selectedSeason.lastUpdated}`)}
      >
        <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
          {!isAllTime && selectedSeason.season === seasonData.season && (
            <div className="bg-primary-light text-primary px-4 py-2 rounded-lg text-sm font-medium border border-primary/50">
              Top 4 qualify for next season
            </div>
          )}
          <div className="relative">
            <select
              value={isAllTime ? 'all-time' : selectedSeason.season}
              onChange={handleSeasonChange}
              className="appearance-none bg-surface border border-border text-text-main text-lg font-bold rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
            >
              {allSeasons.map((s) => (
                <option key={s.season} value={s.season}>
                  {s.season}
                </option>
              ))}
              <option value="all-time">All Time</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted pointer-events-none" />
          </div>
        </div>
      </PageHeader>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-surface-highlight">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Rank</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Player</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Total Points</th>
                {!isAllTime && selectedSeason.season === seasonData.season && (
                  <>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Wins</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Diff</th>
                  </>
                )}
                {isAllTime && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Seasons</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-border">
              {standings.map((entry, index) => {
                const player = players.find(p => p.id === entry.playerId) || { name: "Unknown", url: "" };
                return (
                  <tr 
                    key={entry.playerId} 
                    className={cn(
                      "hover:bg-surface-highlight transition-colors",
                      index < 4 ? "bg-primary-light/10" : ""
                    )}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <RankBadge rank={entry.rank} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/player/${entry.playerId}`} className="flex items-center group">
                        <PlayerAvatar url={player.url} name={player.name} className="mr-3 group-hover:ring-2 ring-primary transition-all" />
                        <div className="text-sm font-medium text-text-main group-hover:text-primary transition-colors">{player.name}</div>
                        {index === 0 && <Trophy className="ml-2 h-4 w-4 text-warning" />}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-text-main">{entry.points}</div>
                    </td>
                    {!isAllTime && selectedSeason.season === seasonData.season && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">{entry.wins}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                          {entry.diff > 0 ? '+' : ''}{entry.diff}
                        </td>
                      </>
                    )}
                    {isAllTime && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">{entry.seasons}</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {!isAllTime && <WeeklyPoints />}
    </div>
  );
};

export default Standings;
