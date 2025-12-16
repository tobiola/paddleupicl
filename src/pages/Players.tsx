import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { seasonData, players } from '../data/leagueData';
import { calculateSeasonStats } from '../lib/leagueUtils';
import { TrendingUp } from 'lucide-react';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';
import { Player } from '../types';

const Players: React.FC = () => {
  // Calculate stats from season data
  const activePlayers = useMemo(() => {
    let stats: any[] = [];
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
      const playerDetails = players.find(p => p.id === (entry.playerId || entry.id)) || { name: "Unknown", url: "", id: "unknown" } as Player;
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {activePlayers.map((player) => (
          <Link key={player.id} to={`/player/${player.id}`} className="block group">
            <Card className="h-full overflow-hidden p-0 border-border group-hover:border-primary/50 transition-all group-hover:shadow-lg group-hover:shadow-primary/5 flex flex-col">
              {/* Image Container */}
              <div className="aspect-square w-full relative bg-surface-highlight overflow-hidden">
                {player.url ? (
                  <img 
                    src={player.url.startsWith('/') ? `${import.meta.env.BASE_URL}${player.url.slice(1)}` : player.url} 
                    alt={player.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface-highlight">
                    <span className="text-4xl font-bold text-text-muted opacity-20">{player.name.charAt(0)}</span>
                  </div>
                )}
                
                {/* Rank Badge Overlay */}
                <div className="absolute top-3 left-3">
                  <div className="bg-surface/90 backdrop-blur-sm border border-border px-3 py-1 rounded-full text-sm font-bold text-text-main shadow-sm">
                    #{player.rank}
                  </div>
                </div>

                {/* Points Overlay */}
                <div className="absolute top-3 right-3">
                  <div className="bg-surface/90 backdrop-blur-md border border-primary/30 px-3 py-1 rounded-full text-sm font-bold text-primary shadow-lg">
                    {player.points} pts
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-lg font-bold text-text-main mb-1 group-hover:text-primary transition-colors text-center truncate">{player.name}</h2>
                <p className="text-xs text-text-muted text-center mb-3">DUPR {player.dupr || 'N/A'}</p>
                
                <div className="mt-auto grid grid-cols-2 gap-2 pt-3 border-t border-border">
                  <div className="text-center">
                    <p className="text-[10px] text-text-muted uppercase tracking-wide mb-0.5">Apps</p>
                    <p className="font-bold text-sm text-text-main">{player.appearances}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-text-muted uppercase tracking-wide mb-0.5">Champ Ct</p>
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="h-3 w-3 text-success" />
                      <p className="font-bold text-sm text-text-main">{player.champCourt}</p>
                    </div>
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
