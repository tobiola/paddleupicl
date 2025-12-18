import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ArrowRight, Users, Calendar, Star } from 'lucide-react';
import { seasonData, players } from '../data/leagueData';
import { calculateSeasonStats } from '../lib/leagueUtils';
import Card from '../components/ui/Card';
import PlayerAvatar from '../components/ui/PlayerAvatar';
import RankBadge from '../components/ui/RankBadge';
import { Player } from '../types';

const Home: React.FC = () => {
  // Get top 3 players
  const topPlayers = React.useMemo(() => {
    if (seasonData.weeks) {
      return calculateSeasonStats(seasonData)
        .slice(0, 3)
        .map((stat, index) => ({
          ...stat,
          rank: index + 1,
          playerId: stat.id
        }));
    }
    // Fallback if no weeks data, though calculateSeasonStats handles empty weeks
    return (seasonData.standings || []).slice(0, 3).map((s, i) => ({
      ...s,
      rank: i + 1,
      wins: 0, // Default if using raw standings
      losses: 0,
      winRate: 0,
      pointsPerWeek: 0,
      attendance: 0
    }));
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-surface border border-border">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 px-8 py-16 md:py-24 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-highlight border border-border mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span className="text-sm font-medium text-text-main">Season {seasonData.season} is Live</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-text-main mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Paddle Up Individual Championship <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Pickleball League</span>
          </h1>
          
          <p className="text-xl text-text-muted mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            The premier competitive league in St. Louis. Merit-based advancement, weekly stakes, and a path to the championship.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link 
              to="/standings" 
              className="w-full sm:w-auto px-8 py-4 bg-primary text-text-main rounded-xl font-bold text-lg hover:bg-primary-hover transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
            >
              View Standings <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              to="/format" 
              className="w-full sm:w-auto px-8 py-4 bg-surface-highlight text-text-main border border-border rounded-xl font-bold text-lg hover:bg-surface-alt transition-all flex items-center justify-center gap-2"
            >
              League Format
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-6 flex flex-col items-center justify-center text-center hover:border-primary/30 transition-colors group">
          <Users className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
          <span className="text-3xl font-bold text-text-main mb-1">{players.length}</span>
          <span className="text-sm text-text-muted uppercase tracking-wider">Active Players</span>
        </Card>
        <Card className="p-6 flex flex-col items-center justify-center text-center hover:border-primary/30 transition-colors group">
          <Calendar className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
          <span className="text-3xl font-bold text-text-main mb-1">6</span>
          <span className="text-sm text-text-muted uppercase tracking-wider">Weeks</span>
        </Card>
        <Card className="p-6 flex flex-col items-center justify-center text-center hover:border-primary/30 transition-colors group">
          <Trophy className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
          <span className="text-3xl font-bold text-text-main mb-1">$100</span>
          <span className="text-sm text-text-muted uppercase tracking-wider">Prize Pool</span>
        </Card>
        <Card className="p-6 flex flex-col items-center justify-center text-center hover:border-primary/30 transition-colors group">
          <Star className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
          <span className="text-3xl font-bold text-text-main mb-1">3.75+ DUPR</span>
          <span className="text-sm text-text-muted uppercase tracking-wider">Level Format</span>
        </Card>
      </div>

      {/* Prizes Summary */}
      <div className="bg-surface-highlight/50 rounded-2xl p-8 border border-border text-center">
        <h2 className="text-2xl font-bold text-text-main mb-4 flex items-center justify-center gap-2">
          <Trophy className="h-6 w-6 text-warning" />
          Season Prizes
        </h2>
        <p className="text-text-muted max-w-2xl mx-auto mb-6">
          Compete for over $200 in court credits and Paddle Up Club points. Top performers earn free entry to the next season and exclusive rewards.
        </p>
        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="bg-surface p-4 rounded-xl border border-border">
            <span className="block text-2xl font-bold text-warning mb-1">1st Place</span>
            <span className="text-sm text-text-muted">$100 Credit + 50 Club Pts</span>
          </div>
          <div className="bg-surface p-4 rounded-xl border border-border">
            <span className="block text-2xl font-bold text-text-main mb-1">2nd Place</span>
            <span className="text-sm text-text-muted">$60 Credit + 30 Club Pts</span>
          </div>
          <div className="bg-surface p-4 rounded-xl border border-border">
            <span className="block text-2xl font-bold text-text-main mb-1">3rd Place</span>
            <span className="text-sm text-text-muted">$40 Credit + 20 Club Pts</span>
          </div>
        </div>
      </div>

      {/* Top Players Preview */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-main flex items-center gap-2">
              <Trophy className="h-6 w-6 text-warning" />
              Current Leaders
            </h2>
            <Link to="/standings" className="text-sm text-primary hover:text-primary-hover font-medium flex items-center gap-1">
              Full Standings <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="space-y-4 flex-1">
            {topPlayers.map((entry, index) => {
const player = players.find(p => p.id === entry.playerId) || { name: "Unknown", imageUrl: "", id: "unknown" } as Player;
              return (
                <Link key={entry.playerId} to={`/player/${entry.playerId}`} className="flex items-center justify-between p-3 rounded-xl bg-surface-highlight border border-border hover:border-primary/50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <RankBadge rank={index + 1} size="sm" />
                    <div className="flex items-center gap-3">
<PlayerAvatar imageUrl={player.imageUrl} name={player.name} size="md" className="group-hover:ring-2 ring-primary transition-all" />
                      <span className="font-bold text-text-main group-hover:text-primary transition-colors">{player.name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-primary">{entry.points} pts</span>
                    <span className="text-xs text-text-muted">{entry.wins} Wins</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>

        <Card className="h-full flex flex-col bg-gradient-to-br from-surface to-surface-highlight relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-text-main mb-4">Next Match Night</h2>
            <div className="space-y-6">
              <div>
                <p className="text-text-muted text-sm uppercase tracking-wider mb-1">Date</p>
                <p className="text-xl font-bold text-text-main">Sunday, December 28th</p>
              </div>
              <div>
                <p className="text-text-muted text-sm uppercase tracking-wider mb-1">Time</p>
                <p className="text-xl font-bold text-text-main">7:00 PM - 9:00 PM</p>
              </div>
              <div>
                <p className="text-text-muted text-sm uppercase tracking-wider mb-1">Location</p>
                <p className="text-xl font-bold text-text-main">Paddle Up Pickleball Club</p>
                <p className="text-text-muted">Chesterfield, MO</p>
              </div>
              
              <div className="pt-4">
                <a 
                  href="https://courtreserve.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-surface border border-border hover:border-primary/50 rounded-xl text-text-main font-bold transition-colors"
                >
                  Register on CourtReserve
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* How to Join */}
      <div className="bg-primary-light rounded-2xl p-8 md:p-12 text-center border border-primary/50">
        <h2 className="text-3xl font-bold text-text-main mb-4">Want to Join the League?</h2>
        <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
          We are always looking for competitive players to join the roster. Check out the format and rules to see if you qualify.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link 
            to="/format" 
            className="bg-primary text-text-main px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            View Format <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
