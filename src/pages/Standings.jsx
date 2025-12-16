import React, { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { seasonData, pastSeasons, players } from '../data/leagueData';
import { calculateSeasonStats, calculateAllTimeStats } from '../lib/leagueUtils';
import { Trophy, ChevronDown, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../lib/utils';
import WeeklyPoints from '../components/WeeklyPoints';
import Card from '../components/ui/Card';
import PlayerAvatar from '../components/ui/PlayerAvatar';
import PageHeader from '../components/ui/PageHeader';
import RankBadge from '../components/ui/RankBadge';

const Standings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' });
  const seasonParam = searchParams.get('season');
  const isAllTime = seasonParam === 'all-time';

  // Combine all seasons into one list for the selector
  const allSeasons = [seasonData, ...pastSeasons];
  const selectedSeason = !isAllTime ? (allSeasons.find(s => s.season === seasonParam) || seasonData) : null;

  // Calculate standings if needed
  const baseStandings = useMemo(() => {
    if (isAllTime) {
      return calculateAllTimeStats(seasonData, pastSeasons);
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

  const standings = useMemo(() => {
    let sortedData = [...baseStandings];
    if (sortConfig.key !== 'rank') {
      sortedData.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle calculated percentages
        if (sortConfig.key === 'winPct') {
          aValue = a.wins + a.losses > 0 ? (a.wins / (a.wins + a.losses)) : 0;
          bValue = b.wins + b.losses > 0 ? (b.wins / (b.wins + b.losses)) : 0;
        } else if (sortConfig.key === 'pointsPct') {
          aValue = a.pointsWon + a.pointsLost > 0 ? (a.pointsWon / (a.pointsWon + a.pointsLost)) : 0;
          bValue = b.pointsWon + b.pointsLost > 0 ? (b.pointsWon / (b.pointsWon + b.pointsLost)) : 0;
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    } else {
      // Default rank sort (asc)
      sortedData.sort((a, b) => sortConfig.direction === 'asc' ? a.rank - b.rank : b.rank - a.rank);
    }
    return sortedData;
  }, [baseStandings, sortConfig]);

  const handleSort = (key) => {
    let direction = 'desc'; // Default to desc for stats (highest is best)
    if (key === 'rank') direction = 'asc'; // Default to asc for rank (1 is best)

    if (sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    setSortConfig({ key, direction });
  };

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
                <SortableHeader label="Rank" column="rank" sortConfig={sortConfig} onSort={handleSort} className="pl-6" />
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Player</th>
                <SortableHeader label="Total Points" column="points" sortConfig={sortConfig} onSort={handleSort} />
                {!isAllTime && selectedSeason.season === seasonData.season && (
                  <>
                    <SortableHeader label="Games Won" column="wins" sortConfig={sortConfig} onSort={handleSort} />
                    <SortableHeader label="Games Lost" column="losses" sortConfig={sortConfig} onSort={handleSort} />
                    <SortableHeader label="Games Won %" column="winPct" sortConfig={sortConfig} onSort={handleSort} />
                    <SortableHeader label="Pts Won" column="pointsWon" sortConfig={sortConfig} onSort={handleSort} />
                    <SortableHeader label="Pts Lost" column="pointsLost" sortConfig={sortConfig} onSort={handleSort} />
                    <SortableHeader label="Pts Won %" column="pointsPct" sortConfig={sortConfig} onSort={handleSort} />
                  </>
                )}
                {isAllTime && (
                  <SortableHeader label="Seasons" column="seasons" sortConfig={sortConfig} onSort={handleSort} />
                )}
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-border">
              {standings.map((entry) => {
                const player = players.find(p => p.id === entry.playerId) || { name: "Unknown", url: "" };
                
                // Calculate percentages
                const totalGames = (entry.wins || 0) + (entry.losses || 0);
                const winPct = totalGames > 0 ? ((entry.wins / totalGames) * 100).toFixed(1) : "0.0";
                
                const totalPoints = (entry.pointsWon || 0) + (entry.pointsLost || 0);
                const pointsPct = totalPoints > 0 ? ((entry.pointsWon / totalPoints) * 100).toFixed(1) : "0.0";

                return (
                  <tr 
                    key={entry.playerId} 
                    className={cn(
                      "hover:bg-surface-highlight transition-colors",
                      entry.rank <= 4 ? "bg-primary-light/10" : ""
                    )}
                  >
                    <td className="px-4 pl-6 py-4 whitespace-nowrap">
                      <RankBadge rank={entry.rank} />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Link to={`/player/${entry.playerId}`} className="flex items-center group">
                        <PlayerAvatar url={player.url} name={player.name} className="mr-3 group-hover:ring-2 ring-primary transition-all" />
                        <div className="text-sm font-medium text-text-main group-hover:text-primary transition-colors">{player.name}</div>
                        {entry.rank === 1 && <Trophy className="ml-2 h-4 w-4 text-warning" />}
                      </Link>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-text-main">{entry.points}</div>
                    </td>
                    {!isAllTime && selectedSeason.season === seasonData.season && (
                      <>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-text-muted">{entry.wins || 0}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-text-muted">{entry.losses || 0}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-text-muted">{winPct}%</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-text-muted">{entry.pointsWon || 0}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-text-muted">{entry.pointsLost || 0}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-text-muted">{pointsPct}%</td>
                      </>
                    )}
                    {isAllTime && (
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-text-muted">{entry.seasons}</td>
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

const SortIcon = ({ column, sortConfig }) => {
  if (sortConfig.key !== column) return <ArrowUpDown className="h-3 w-3 ml-1 text-text-muted/50" />;
  return sortConfig.direction === 'asc' 
    ? <ArrowUp className="h-3 w-3 ml-1 text-primary" />
    : <ArrowDown className="h-3 w-3 ml-1 text-primary" />;
};

const SortableHeader = ({ label, column, className, sortConfig, onSort }) => (
  <th 
    scope="col" 
    className={cn(
      "px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:bg-surface-highlight/50 transition-colors select-none",
      className
    )}
    onClick={() => onSort(column)}
  >
    <div className="flex items-center">
      {label}
      <SortIcon column={column} sortConfig={sortConfig} />
    </div>
  </th>
);

export default Standings;
