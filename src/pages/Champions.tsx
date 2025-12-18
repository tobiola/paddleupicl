import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, Star, Medal } from 'lucide-react';
import { cn } from '../lib/utils';
import { pastSeasons, players } from '../data/leagueData';
import Card from '../components/ui/Card';
import PlayerAvatar from '../components/ui/PlayerAvatar';
import PageHeader from '../components/ui/PageHeader';
import { Player } from '../types';

const Champions: React.FC = () => {
  return (
    <div className="space-y-12">
      <PageHeader 
        title="Hall of Champions" 
        subtitle="Celebrating the elite performers of the Paddle Up Individual Championship League."
        center
      />

      {pastSeasons.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastSeasons.map((season, index) => {
            // Sort standings by points
            const sortedStandings = [...(season.standings || [])].sort((a, b) => b.points - a.points);
            const top3 = sortedStandings.slice(0, 3);

            return (
              <Card key={index} className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <Link 
                    to={`/standings?season=${encodeURIComponent(season.season)}`}
                    className="bg-primary-light text-primary text-xs font-bold px-3 py-1 rounded-full hover:bg-primary-light/80 transition-colors"
                  >
                    {season.season}
                  </Link>
                  <div className="flex items-center text-xs text-text-muted">
                    <Calendar className="h-3 w-3 mr-1" />
                    {season.date}
                  </div>
                </div>

                <div className="space-y-6 flex-1">
{top3.map((entry, i) => {
                    const player = players.find(p => p.id === entry.playerId) || { name: "Unknown", imageUrl: "" } as Player;
                    const medalColor = i === 0 ? "text-warning" : i === 1 ? "text-text-muted" : "text-orange-500";
                    const label = i === 0 ? "Champion" : i === 1 ? "Runner Up" : "Third Place";

                    return (
                      <Link key={entry.playerId} to={`/player/${entry.playerId}`} className="flex items-center gap-4 group">
                        <div className="relative">
                          <PlayerAvatar 
                            imageUrl={player.imageUrl} 
                            name={player.name} 
                            size="lg" 
                            className={cn(
                              i === 0 ? 'border-warning' : 'border-border',
                              "group-hover:ring-2 ring-primary transition-all"
                            )}
                            border={true}
                          />
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-surface shadow-sm flex items-center justify-center border border-border`}>
                            {i === 0 ? (
                              <Trophy className="h-3 w-3 text-warning" />
                            ) : (
                              <Medal className={`h-3 w-3 ${medalColor}`} />
                            )}
                          </div>
                        </div>
                        <div>
                          <p className={`text-xs font-bold uppercase tracking-wider ${medalColor}`}>{label}</p>
                          <p className="font-bold text-text-main group-hover:text-primary transition-colors">{player.name}</p>
                          <p className="text-xs text-text-muted">{entry.points} pts</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="text-center py-16 border-dashed">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-warning/20 rounded-full mb-4">
            <Star className="h-8 w-8 text-warning" />
          </div>
          <h2 className="text-xl font-medium text-text-main mb-2">Season In Progress</h2>
          <p className="text-text-muted max-w-md mx-auto">
            The first champions will be crowned at the end of Season 0. Check back soon to see who takes the title!
          </p>
        </Card>
      )}
    </div>
  );
};

export default Champions;
