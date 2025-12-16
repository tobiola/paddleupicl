import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { seasonData, players } from '../data/leagueData';
import { calculateSeasonStats } from '../lib/leagueUtils';
import { TrendingUp } from 'lucide-react';
import Card from '../components/ui/Card';
import PlayerAvatar from '../components/ui/PlayerAvatar';
import PageHeader from '../components/ui/PageHeader';

const Players = () => {
  // Calculate stats from season data
  const activePlayers = useMemo(() => {
    let stats = [];
    if (seasonData.weeks) {
      stats = calculateSeasonStats(seasonData).map((stat, index) => ({
        ...stat,
        rank: index + 1,
        playerId: stat.id
      }));
    } else {
      stats = seasonData.standings || [];
    }

    return stats.map(entry => {
      const playerDetails = players.find(p => p.id === (entry.playerId || entry.id)) || { name: "Unknown", url: "" };
      return {
        ...entry,
        ...playerDetails
      };
    });
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Player Roster" 
        subtitle={`${activePlayers.length} Active Players • ${seasonData.season}`}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activePlayers.map((player) => (
          <Link key={player.id} to={`/player/${player.id}`} className="block group">
            <Card className="h-full group-hover:border-primary/50 transition-all group-hover:shadow-lg group-hover:shadow-primary/5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <PlayerAvatar url={player.url} name={player.name} size="lg" className="group-hover:ring-2 ring-primary transition-all" />
                  <div>
                    <h2 className="text-xl text-text-main group-hover:text-primary transition-colors">{player.name}</h2>
                    <p className="text-sm text-text-muted">Rank #{player.rank}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-bold text-primary">{player.points}</span>
                  <span className="text-xs text-text-muted uppercase tracking-wide">Points</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Appearances</p>
                  <p className="font-medium text-text-main">{player.appearances}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Champ Court</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-success" />
                    <p className="font-medium text-text-main">{player.champCourt}</p>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Players;
