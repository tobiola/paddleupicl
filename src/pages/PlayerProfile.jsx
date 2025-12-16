import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { players, seasonData, pastSeasons } from '../data/leagueData';
import { calculateSeasonStats } from '../lib/leagueUtils';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import PlayerAvatar from '../components/ui/PlayerAvatar';
import RankBadge from '../components/ui/RankBadge';
import { Trophy, TrendingUp, Calendar, Activity, ArrowLeft } from 'lucide-react';

const PlayerProfile = () => {
  const { id } = useParams();
  const player = players.find(p => p.id === id);
  
  if (!player) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-text-main mb-4">Player Not Found</h2>
        <Link to="/players" className="text-primary hover:underline">Back to Players</Link>
      </div>
    );
  }

  // Calculate current season stats
  const standings = calculateSeasonStats(seasonData);
  const currentStats = standings.find(s => s.id === id);
  const currentRank = standings.findIndex(s => s.id === id) + 1;

  // Get weekly history
  const weeklyHistory = seasonData.weeks
    .filter(week => week.isCompleted && week.rankings.includes(id))
    .map(week => {
      const weeklyRank = week.rankings.indexOf(id) + 1;
      // Calculate points for this week (simplified logic based on rank)
      // Note: This is an approximation if we don't store exact points per week in history
      // Ideally leagueUtils would provide this breakdown
      return {
        week: week.id,
        date: week.date,
        rank: weeklyRank
      };
    });

  // Get match history
  const matches = [];
  seasonData.weeks.forEach(week => {
    if (week.matches) {
      week.matches.forEach(match => {
        if (match.team1.includes(id) || match.team2.includes(id)) {
          const isTeam1 = match.team1.includes(id);
          const partner = isTeam1 
            ? match.team1.find(p => p !== id) 
            : match.team2.find(p => p !== id);
          const opponents = isTeam1 ? match.team2 : match.team1;
          const score = isTeam1 ? match.score1 : match.score2;
          const opponentScore = isTeam1 ? match.score2 : match.score1;
          const result = score > opponentScore ? 'W' : 'L';
          
          matches.push({
            week: week.id,
            date: week.date,
            partner,
            opponents,
            score,
            opponentScore,
            result
          });
        }
      });
    }
  });

  // Get past achievements
  const achievements = pastSeasons
    .filter(season => season.standings.some(s => s.playerId === id && s.rank <= 3))
    .map(season => {
      const result = season.standings.find(s => s.playerId === id);
      return {
        season: season.season,
        rank: result.rank
      };
    });

  return (
    <div className="space-y-8 pb-12">
      <Link to="/players" className="inline-flex items-center text-text-muted hover:text-primary transition-colors mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Players
      </Link>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        <PlayerAvatar 
          src={player.image} 
          alt={player.name} 
          size="xl" 
          className="border-4 border-surface-highlight shadow-xl"
        />
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-4xl font-bold text-text-main">{player.name}</h1>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold border border-primary/20">
              DUPR {player.dupr}
            </span>
            {currentStats && (
              <span className="bg-surface-highlight text-text-muted px-3 py-1 rounded-full text-sm font-medium border border-border">
                Rank #{currentRank}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <Trophy className="h-6 w-6 text-warning mb-2" />
          <span className="text-2xl font-bold text-text-main">{currentStats?.points || 0}</span>
          <span className="text-xs text-text-muted uppercase tracking-wider">Season Points</span>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <Activity className="h-6 w-6 text-primary mb-2" />
          <span className="text-2xl font-bold text-text-main">{matches.length}</span>
          <span className="text-xs text-text-muted uppercase tracking-wider">Matches Played</span>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <TrendingUp className="h-6 w-6 text-success mb-2" />
          <span className="text-2xl font-bold text-text-main">
            {matches.length > 0 
              ? Math.round((matches.filter(m => m.result === 'W').length / matches.length) * 100) 
              : 0}%
          </span>
          <span className="text-xs text-text-muted uppercase tracking-wider">Win Rate</span>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <Calendar className="h-6 w-6 text-text-muted mb-2" />
          <span className="text-2xl font-bold text-text-main">{weeklyHistory.length}</span>
          <span className="text-xs text-text-muted uppercase tracking-wider">Weeks Played</span>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: History & Trophies */}
        <div className="md:col-span-2 space-y-8">
          {/* Match History */}
          <Card>
            <h3 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Matches
            </h3>
            <div className="space-y-3">
              {matches.length > 0 ? (
                matches.slice().reverse().map((match, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-surface-highlight rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        match.result === 'W' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
                      }`}>
                        {match.result}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-main">
                          w/ {players.find(p => p.id === match.partner)?.name || match.partner}
                        </p>
                        <p className="text-xs text-text-muted">
                          vs {match.opponents.map(oid => players.find(p => p.id === oid)?.name || oid).join(' & ')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-text-main">
                        {match.score}-{match.opponentScore}
                      </p>
                      <p className="text-xs text-text-muted">{match.date}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-text-muted text-center py-4">No matches played yet this season.</p>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Achievements & Weekly Ranks */}
        <div className="space-y-8">
          {/* Trophy Case */}
          {achievements.length > 0 && (
            <Card>
              <h3 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-warning" />
                Trophy Case
              </h3>
              <div className="space-y-3">
                {achievements.map((ach, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-surface-highlight rounded-lg border border-border">
                    <RankBadge rank={ach.rank} size="sm" />
                    <div>
                      <p className="font-bold text-text-main">{ach.season}</p>
                      <p className="text-xs text-text-muted">
                        {ach.rank === 1 ? 'Champion' : `${ach.rank}${ach.rank === 2 ? 'nd' : 'rd'} Place`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Weekly Rankings */}
          <Card>
            <h3 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Weekly Rankings
            </h3>
            <div className="space-y-2">
              {weeklyHistory.length > 0 ? (
                weeklyHistory.map((week, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 border-b border-border last:border-0">
                    <span className="text-sm text-text-muted">{week.date}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-text-main">Rank #{week.rank}</span>
                      <RankBadge rank={week.rank} size="xs" />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-text-muted text-center py-4">No weekly data available.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
