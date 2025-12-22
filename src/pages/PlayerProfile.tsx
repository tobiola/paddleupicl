import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { players } from '../data/players';
import { challengeEvents } from '../data/challengeEvents';
import { calculateWeekFinalPositions } from '../lib/leagueUtils';
import Card from '../components/ui/Card';
import RankBadge from '../components/ui/RankBadge';
import { Trophy, TrendingUp, Calendar, Activity, ArrowLeft } from 'lucide-react';
import { Match } from '../types';

interface MatchHistory {
  eventId: string;
  date: string;
  partner: string;
  opponents: string[];
  score: number;
  opponentScore: number;
  result: 'W' | 'L';
  eventName: string;
}

const PlayerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const player = players.find((p) => p.id === id);

  if (!player) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-text-main mb-4">Player Not Found</h2>
        <Link to="/players" className="text-primary hover:underline">Back to Players</Link>
      </div>
    );
  }

  // Aggregate leaderboard across challengeEvents to derive points and rank
  const eventFinals = challengeEvents
    .filter((ev) => Array.isArray(ev.matches) && ev.matches.length > 0)
    .map((ev) => {
      const weekLike = {
        id: ev.id,
        date: ev.startDateTime ? ev.startDateTime.toISOString() : ev.id,
        isCompleted: true,
        matches: ev.matches
      } as any;
      const finals = calculateWeekFinalPositions(weekLike) || [];
      return { ev, finals };
    });

  // aggregate per-player totals
  const totals = new Map<string, { points: number; events: number; champWins: number }>();
  eventFinals.forEach(({ finals }) => {
    finals.forEach((f: any) => {
      const pid = f.playerId;
      const pts = f.pointsEarned || 0;
      const cur = totals.get(pid) || { points: 0, events: 0, champWins: 0 };
      cur.points += pts;
      cur.events += 1;
      if (f.globalRank === 1) cur.champWins += 1;
      totals.set(pid, cur);
    });
  });

  const aggregated = Array.from(totals.entries()).map(([playerId, v]) => ({
    playerId,
    points: v.points,
    eventsPlayed: v.events,
    champWins: v.champWins
  })).sort((a, b) => b.points - a.points);

  // Determine rank for this player
  let overallRank: number | null = null;
  aggregated.forEach((r, idx) => {
    if (r.playerId === id) overallRank = idx + 1;
  });

  const currentStats = totals.get(id || '') || { points: 0, events: 0, champWins: 0 };

  // Build match history and weekly history from challengeEvents
  const matchHistory: MatchHistory[] = [];
  const weeklyHistory: { eventId: string; date: string; rank: number }[] = [];

  eventFinals.forEach(({ ev, finals }) => {
    // find this player's final entry for event
    const finalEntry = finals.find((f: any) => f.playerId === id);
    if (finalEntry) {
      weeklyHistory.push({
        eventId: ev.id,
        date: ev.startDateTime ? ev.startDateTime.toLocaleDateString() : (ev.id as string),
        rank: finalEntry.globalRank
      });
    }

    // collect per-match entries for this player
    if (Array.isArray(ev.matches)) {
      ev.matches.forEach((match: Match) => {
        if (match.team1.includes(id!) || match.team2.includes(id!)) {
          const isTeam1 = match.team1.includes(id!);
          const partner = isTeam1 ? match.team1.find((p) => p !== id) : match.team2.find((p) => p !== id);
          const opponents = isTeam1 ? match.team2 : match.team1;
          const score = isTeam1 ? match.score1 : match.score2;
          const opponentScore = isTeam1 ? match.score2 : match.score1;
          const result = score > opponentScore ? 'W' : 'L';
          matchHistory.push({
            eventId: ev.id,
            date: ev.startDateTime ? ev.startDateTime.toLocaleDateString() : (ev.id as string),
            partner: partner || 'Unknown',
            opponents,
            score,
            opponentScore,
            result,
            eventName: ev.name || ev.id
          });
        }
      });
    }
  });

  return (
    <div className="space-y-8 pb-12">
      <Link to="/players" className="inline-flex items-center text-text-muted hover:text-primary transition-colors mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Players
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Player Image & Key Info */}
        <div className="md:col-span-1 space-y-6">
          <Card className="p-0 overflow-hidden border-border">
            <div className="aspect-square w-full relative bg-surface-highlight">
              {player.imageUrl ? (
                <img
                  src={player.imageUrl.startsWith('/') ? `${import.meta.env.BASE_URL}${player.imageUrl.slice(1)}` : player.imageUrl}
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl font-bold text-text-muted opacity-20">{player.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <div className="p-6 text-center">
              <h1 className="text-3xl font-bold text-text-main mb-2">{player.name}</h1>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold border border-primary/20">
                  DUPR {player.dupr ?? 'N/A'}
                </span>
                <span className="bg-surface-highlight text-text-muted px-3 py-1 rounded-full text-sm font-medium border border-border">
                  Rank #{overallRank ?? '-'}
                </span>
              </div>
            </div>
          </Card>

          {/* Key Stats Grid (Moved to sidebar for desktop) */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 flex flex-col items-center justify-center text-center">
              <Trophy className="h-6 w-6 text-warning mb-2" />
              <span className="text-2xl font-bold text-text-main">{currentStats.points}</span>
              <span className="text-xs text-text-muted uppercase tracking-wider">Points</span>
            </Card>
            <Card className="p-4 flex flex-col items-center justify-center text-center">
              <TrendingUp className="h-6 w-6 text-success mb-2" />
              <span className="text-2xl font-bold text-text-main">
                {matchHistory.length > 0
                  ? Math.round((matchHistory.filter((m) => m.result === 'W').length / matchHistory.length) * 100)
                  : 0}%
              </span>
              <span className="text-xs text-text-muted uppercase tracking-wider">Win Rate</span>
            </Card>
            <Card className="p-4 flex flex-col items-center justify-center text-center">
              <Activity className="h-6 w-6 text-primary mb-2" />
              <span className="text-2xl font-bold text-text-main">{matchHistory.length}</span>
              <span className="text-xs text-text-muted uppercase tracking-wider">Matches</span>
            </Card>
            <Card className="p-4 flex flex-col items-center justify-center text-center">
              <Calendar className="h-6 w-6 text-text-muted mb-2" />
              <span className="text-2xl font-bold text-text-main">{weeklyHistory.length}</span>
              <span className="text-xs text-text-muted uppercase tracking-wider">Events</span>
            </Card>
          </div>
        </div>

        {/* Right Column: History & Trophies */}
        <div className="md:col-span-2 space-y-8">
          {/* Match History */}
          <Card>
            <h3 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Matches
            </h3>
            <div className="space-y-3">
              {matchHistory.length > 0 ? (
                matchHistory.slice().reverse().map((match, idx) => (
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
                <p className="text-text-muted text-center py-4">No matches played yet.</p>
              )}
            </div>
          </Card>

          {/* Weekly Rankings */}
          <Card>
            <h3 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Event Rankings
            </h3>
            <div className="space-y-2">
              {weeklyHistory.length > 0 ? (
                weeklyHistory
                  .slice()
                  .reverse()
                  .map((week, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 border-b border-border last:border-0">
                      <span className="text-sm text-text-muted">{week.date}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-text-main">Rank #{week.rank}</span>
                        <RankBadge rank={week.rank} size="sm" />
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-text-muted text-center py-4">No event data available.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
