import React, { useState } from 'react';
import { Calculator as CalcIcon, ArrowRight, RefreshCw, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { rules, players as allPlayers } from '../data/leagueData';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';
import RankBadge from '../components/ui/RankBadge';
import PlayerSelect from '../components/PlayerSelect';

const Calculator = () => {
  const [round, setRound] = useState(1);
  const [court, setCourt] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [players, setPlayers] = useState([
    { id: 1, name: '', wins: 0, points: 0, diff: 0 },
    { id: 2, name: '', wins: 0, points: 0, diff: 0 },
    { id: 3, name: '', wins: 0, points: 0, diff: 0 },
    { id: 4, name: '', wins: 0, points: 0, diff: 0 },
  ]);
  
  const [scores, setScores] = useState([
    { t1: '', t2: '' },
    { t1: '', t2: '' },
    { t1: '', t2: '' },
  ]);

  const [results, setResults] = useState(null);

  const handleScoreChange = (gameIdx, team, value) => {
    const newScores = [...scores];
    newScores[gameIdx][team] = value;
    setScores(newScores);
  };

  const handlePlayerNameChange = (id, name) => {
    const newPlayers = players.map(p => p.id === id ? { ...p, name } : p);
    setPlayers(newPlayers);
  };

  const getName = (id) => {
    const player = players.find(p => p.id === id);
    return player?.name || `P${id}`;
  };

  const calculateResults = () => {
    // Reset stats
    let currentPlayers = players.map(p => ({ ...p, wins: 0, points: 0, diff: 0 }));

    // Helper to update stats
    const updateStats = (pId, scored, allowed) => {
      const pIndex = currentPlayers.findIndex(p => p.id === pId);
      if (pIndex === -1) return;
      
      currentPlayers[pIndex].points += parseInt(scored || 0);
      currentPlayers[pIndex].diff += (parseInt(scored || 0) - parseInt(allowed || 0));
      if (parseInt(scored || 0) > parseInt(allowed || 0)) {
        currentPlayers[pIndex].wins += 1;
      }
    };

    // Game 1: P1/P2 vs P3/P4
    updateStats(1, scores[0].t1, scores[0].t2);
    updateStats(2, scores[0].t1, scores[0].t2);
    updateStats(3, scores[0].t2, scores[0].t1);
    updateStats(4, scores[0].t2, scores[0].t1);

    // Game 2: P1/P3 vs P2/P4
    updateStats(1, scores[1].t1, scores[1].t2);
    updateStats(3, scores[1].t1, scores[1].t2);
    updateStats(2, scores[1].t2, scores[1].t1);
    updateStats(4, scores[1].t2, scores[1].t1);

    // Game 3: P1/P4 vs P2/P3
    updateStats(1, scores[2].t1, scores[2].t2);
    updateStats(4, scores[2].t1, scores[2].t2);
    updateStats(2, scores[2].t2, scores[2].t1);
    updateStats(3, scores[2].t2, scores[2].t1);

    // Sort: Wins > Diff > Points
    currentPlayers.sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      if (b.diff !== a.diff) return b.diff - a.diff;
      return b.points - a.points;
    });

    // Assign Rank and Next Court
    const rankedResults = currentPlayers.map((p, index) => {
      const rank = index + 1;
      let nextCourt = getNextCourt(round, court, rank);
      let pointsDisplay = null;
      
      // Only calculate points for Round 3
      if (parseInt(round) === 3) {
        const cNum = parseInt(court);
        let points = 0;
        if (cNum === 1) points = rules.points.championship[rank];
        else if (cNum === 2) points = rules.points.court2[rank];
        else if (cNum === 3) points = rules.points.court3[rank];
        else if (cNum === 4) points = rules.points.court4[rank];
        pointsDisplay = `${points} pts`;
      }

      return { ...p, rank, nextCourt, pointsDisplay };
    });

    setResults(rankedResults);
  };

  const getNextCourt = (r, c, rank) => {
    const rNum = parseInt(r);
    const cNum = parseInt(c);

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

  const reset = () => {
    setScores([
      { t1: '', t2: '' },
      { t1: '', t2: '' },
      { t1: '', t2: '' },
    ]);
    setResults(null);
  };

  const handleSubmit = async () => {
    if (!results) return;
    setIsSubmitting(true);
    setSubmitStatus(null);

    const subject = `Court ${court} - Round ${round} Results`;
    
    let message = `Court ${court} - Round ${round} Results\n\n`;
    
    results.forEach(p => {
      message += `${p.rank}. ${p.name || `Player ${p.id}`}\n`;
      message += `   Wins: ${p.wins}, Diff: ${p.diff > 0 ? '+' : ''}${p.diff}, Points: ${p.points}\n`;
      message += `   Next: ${p.nextCourt === "DONE" ? "Completed" : p.nextCourt === "TBD" ? "See Admin" : `Court ${p.nextCourt}`}\n\n`;
    });

    message += `Scores:\n`;
    message += `Game 1: ${scores[0].t1} - ${scores[0].t2}\n`;
    message += `Game 2: ${scores[1].t1} - ${scores[1].t2}\n`;
    message += `Game 3: ${scores[2].t1} - ${scores[2].t2}\n`;

    // Generate JSON for leagueData.js
    message += `\n\n--- JSON Data for leagueData.js ---\n`;
    
    // Helper to get real player ID from name
    const getRealId = (name) => {
      const found = allPlayers.find(p => p.name === name);
      return found ? `"${found.id}"` : `"${name}"`;
    };

    if (parseInt(round) === 3) {
      // Rankings for Round 3
      const rankings = results.map(p => getRealId(p.name));
      message += `// Court ${court}\nrankings: [\n  ${rankings.join(', ')}\n]`;
    } else {
      // Matches for Round 1 & 2
      const getPId = (id) => {
        const p = players.find(p => p.id === id);
        return getRealId(p?.name || `Player ${id}`);
      };
      
      const matches = [
        `{ team1: [${getPId(1)}, ${getPId(2)}], team2: [${getPId(3)}, ${getPId(4)}], score1: ${scores[0].t1 || 0}, score2: ${scores[0].t2 || 0} }`,
        `{ team1: [${getPId(1)}, ${getPId(3)}], team2: [${getPId(2)}, ${getPId(4)}], score1: ${scores[1].t1 || 0}, score2: ${scores[1].t2 || 0} }`,
        `{ team1: [${getPId(1)}, ${getPId(4)}], team2: [${getPId(2)}, ${getPId(3)}], score1: ${scores[2].t1 || 0}, score2: ${scores[2].t2 || 0} }`
      ];
      
      message += `// Court ${court}\nmatches: [\n  ${matches.join(',\n  ')}\n]`;
    }

    try {
      const response = await fetch("https://formspree.io/f/xanrzonk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subject: subject,
          message: message,
          court: court,
          round: round,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <PageHeader 
        title={
          <span className="flex items-center justify-center gap-3">
            <CalcIcon className="h-8 w-8 text-primary" />
            Court Calculator
          </span>
        }
        subtitle="Enter scores to calculate rankings and next court assignments."
        center
      />

      <Card className="space-y-6">
        {/* Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Round</label>
            <select 
              value={round} 
              onChange={(e) => setRound(e.target.value)}
              className="w-full rounded-md bg-surface-highlight border-border text-text-main shadow-sm focus:border-primary focus:ring-primary border p-2"
            >
              <option value={1}>Round 1</option>
              <option value={2}>Round 2</option>
              <option value={3}>Round 3</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Court</label>
            <select 
              value={court} 
              onChange={(e) => setCourt(e.target.value)}
              className="w-full rounded-md bg-surface-highlight border-border text-text-main shadow-sm focus:border-primary focus:ring-primary border p-2"
            >
              <option value={1}>Court 1</option>
              <option value={2}>Court 2</option>
              <option value={3}>Court 3</option>
              <option value={4}>Court 4</option>
            </select>
          </div>
        </div>

        {/* Player Names */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-muted">Players</label>
          <div className="grid grid-cols-2 gap-3">
            {players.map((p) => (
              <PlayerSelect
                key={p.id}
                placeholder={`Player ${p.id}`}
                value={p.name}
                onChange={(name) => handlePlayerNameChange(p.id, name)}
              />
            ))}
          </div>
        </div>

        {/* Scores */}
        <div className="space-y-4 border-t border-border pt-4">
          <label className="block text-sm font-medium text-text-muted">Match Scores</label>
          
          {/* Game 1 */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-text-muted w-12">Game 1</span>
            <div className="flex-1 grid grid-cols-2 gap-2 items-center">
              <div className="relative">
                <input
                  type="number"
                  placeholder={`${getName(1)} & ${getName(2)}`}
                  value={scores[0].t1}
                  onChange={(e) => handleScoreChange(0, 't1', e.target.value)}
                  className="w-full rounded-md bg-surface-highlight border-border text-text-main border p-2 text-center placeholder:text-xs placeholder:text-text-muted"
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder={`${getName(3)} & ${getName(4)}`}
                  value={scores[0].t2}
                  onChange={(e) => handleScoreChange(0, 't2', e.target.value)}
                  className="w-full rounded-md bg-surface-highlight border-border text-text-main border p-2 text-center placeholder:text-xs placeholder:text-text-muted"
                />
              </div>
            </div>
          </div>

          {/* Game 2 */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-text-muted w-12">Game 2</span>
            <div className="flex-1 grid grid-cols-2 gap-2 items-center">
              <div className="relative">
                <input
                  type="number"
                  placeholder={`${getName(1)} & ${getName(3)}`}
                  value={scores[1].t1}
                  onChange={(e) => handleScoreChange(1, 't1', e.target.value)}
                  className="w-full rounded-md bg-surface-highlight border-border text-text-main border p-2 text-center placeholder:text-xs placeholder:text-text-muted"
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder={`${getName(2)} & ${getName(4)}`}
                  value={scores[1].t2}
                  onChange={(e) => handleScoreChange(1, 't2', e.target.value)}
                  className="w-full rounded-md bg-surface-highlight border-border text-text-main border p-2 text-center placeholder:text-xs placeholder:text-text-muted"
                />
              </div>
            </div>
          </div>

          {/* Game 3 */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-text-muted w-12">Game 3</span>
            <div className="flex-1 grid grid-cols-2 gap-2 items-center">
              <div className="relative">
                <input
                  type="number"
                  placeholder={`${getName(1)} & ${getName(4)}`}
                  value={scores[2].t1}
                  onChange={(e) => handleScoreChange(2, 't1', e.target.value)}
                  className="w-full rounded-md bg-surface-highlight border-border text-text-main border p-2 text-center placeholder:text-xs placeholder:text-text-muted"
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder={`${getName(2)} & ${getName(3)}`}
                  value={scores[2].t2}
                  onChange={(e) => handleScoreChange(2, 't2', e.target.value)}
                  className="w-full rounded-md bg-surface-highlight border-border text-text-main border p-2 text-center placeholder:text-xs placeholder:text-text-muted"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <button
            onClick={calculateResults}
            className="flex-1 bg-primary text-text-main py-2 px-4 rounded-md hover:bg-primary-hover font-medium shadow-sm"
          >
            Calculate Results
          </button>
          <button
            onClick={reset}
            className="bg-surface-highlight text-text-muted py-2 px-4 rounded-md hover:bg-surface-alt border border-border"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </Card>

      {/* Results */}
      {results && (
        <Card className="animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-warning" />
              Results & Next Court
            </h2>
            
            {!submitStatus ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-text-main px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {isSubmitting ? 'Sending...' : 'Submit Results'}
              </button>
            ) : submitStatus === 'success' ? (
              <div className="flex items-center gap-2 text-success bg-success/20 px-3 py-1.5 rounded-md text-sm font-medium border border-success/50">
                <CheckCircle className="h-4 w-4" />
                Sent!
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-error hover:bg-error/80 text-text-main px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
              >
                <AlertCircle className="h-4 w-4" />
                Retry
              </button>
            )}
          </div>
          <div className="space-y-3">
            {results.map((p) => (
              <div key={p.id} className="flex items-center justify-between bg-surface-highlight p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <RankBadge rank={p.rank} size="sm" />
                  <div>
                    <p className="font-bold">{p.name || `Player ${p.id}`}</p>
                    <p className="text-xs text-text-muted">
                      {p.wins} Wins • {p.diff > 0 ? '+' : ''}{p.diff} Diff
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {round == 3 ? (
                    <>
                      <p className="text-xs text-text-muted uppercase">Earned</p>
                      <p className="text-lg font-bold text-success">{p.pointsDisplay}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-xs text-text-muted uppercase">
                        {round == 1 ? (
                          [1, 2].includes(p.nextCourt) ? "Upper Bracket" : "Lower Bracket"
                        ) : round == 2 ? (
                          p.nextCourt === 1 ? "Championship Court" : "Go To"
                        ) : "Go To"}
                      </p>
                      <p className="text-lg font-bold text-primary">
                        {p.nextCourt === "DONE" ? "Completed" : p.nextCourt === "TBD" ? "See Admin" : `Court ${p.nextCourt}`}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Calculator;
