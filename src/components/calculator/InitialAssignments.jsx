import React, { useState, useMemo } from 'react';
import { Grid, Users, CheckCircle } from 'lucide-react';
import { players as allPlayers, seasonData } from '../../data/leagueData';
import { calculateSeasonStats, generateSnakeDraw } from '../../lib/leagueUtils';
import Card from '../ui/Card';
import PageHeader from '../ui/PageHeader';
import { cn } from '../../lib/utils';

const InitialAssignments = ({ onBack }) => {
  const [selectedPlayers, setSelectedPlayers] = useState(new Set());
  const [assignments, setAssignments] = useState(null);

  // Get all players with their current season stats
  const playerStats = useMemo(() => {
    const stats = calculateSeasonStats(seasonData);
    const statsMap = new Map(stats.map(s => [s.id, s]));
    
    return allPlayers.map(p => ({
      ...p,
      points: statsMap.get(p.id)?.points || 0,
      dupr: p.dupr || 0
    })).sort((a, b) => {
      // Sort by Points (Desc), then DUPR (Desc), then Name (Asc)
      if (b.points !== a.points) return b.points - a.points;
      if (b.dupr !== a.dupr) return b.dupr - a.dupr;
      return a.name.localeCompare(b.name);
    });
  }, []);

  const togglePlayer = (id) => {
    const newSelected = new Set(selectedPlayers);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      if (newSelected.size < 16) {
        newSelected.add(id);
      }
    }
    setSelectedPlayers(newSelected);
  };

  const handleGenerate = () => {
    // Get selected players and sort them by rank (points/dupr)
    const rankedPlayers = playerStats
      .filter(p => selectedPlayers.has(p.id))
      .sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.dupr !== a.dupr) return b.dupr - a.dupr;
        return a.name.localeCompare(b.name);
      });

    const newAssignments = generateSnakeDraw(rankedPlayers);
    setAssignments(newAssignments);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader 
        title={
          <span className="flex items-center justify-center gap-3">
            <Grid className="h-8 w-8 text-primary" />
            Initial Assignments
          </span>
        }
        subtitle="Select players to generate court assignments based on season rankings."
        center
      >
        <div className="flex justify-center mt-4">
          <div className="bg-surface-highlight p-1 rounded-lg inline-flex">
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors text-text-muted hover:text-text-main"
            >
              Match Calculator
            </button>
            <button
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-primary text-text-main shadow-sm"
            >
              Initial Assignments
            </button>
          </div>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Player Selection */}
        <Card className="lg:col-span-1 h-[600px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Select Players
            </h3>
            <span className={cn(
              "text-sm font-bold px-2 py-1 rounded-full",
              selectedPlayers.size === 16 ? "bg-success/20 text-success" : "bg-surface-highlight text-text-muted"
            )}>
              {selectedPlayers.size}/16
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-2 pr-2">
            {playerStats.map((p, index) => (
              <div 
                key={p.id}
                onClick={() => togglePlayer(p.id)}
                className={cn(
                  "flex items-center justify-between p-2 rounded-md cursor-pointer border transition-all",
                  selectedPlayers.has(p.id) 
                    ? "bg-primary/10 border-primary" 
                    : "bg-surface-highlight border-transparent hover:border-border"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 text-center text-xs font-bold text-text-muted">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{p.name}</p>
                    <p className="text-xs text-text-muted">{p.points} pts</p>
                  </div>
                </div>
                {selectedPlayers.has(p.id) && (
                  <CheckCircle className="h-4 w-4 text-primary" />
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 mt-4 border-t border-border">
            <button
              onClick={handleGenerate}
              disabled={selectedPlayers.size === 0}
              className="w-full bg-primary text-text-main py-2 rounded-md font-bold hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Generate Assignments
            </button>
          </div>
        </Card>

        {/* Assignments Display */}
        <div className="lg:col-span-2 space-y-6">
          {!assignments ? (
            <div className="h-full flex flex-col items-center justify-center text-text-muted border-2 border-dashed border-border rounded-xl p-12">
              <Grid className="h-12 w-12 mb-4 opacity-20" />
              <p>Select players and click Generate</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assignments.map((court) => (
                <Card key={court.id} className="border-l-4 border-l-primary">
                  <h3 className="font-bold text-lg mb-4 pb-2 border-b border-border flex justify-between items-center">
                    {court.name}
                    <span className="text-xs font-normal text-text-muted bg-surface-highlight px-2 py-1 rounded">
                      Seeds: {court.indices.map(i => i + 1).join(', ')}
                    </span>
                  </h3>
                  <div className="space-y-3">
                    {court.players.map((p) => (
                      <div key={p.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-text-muted w-6">#{p.seed}</span>
                          <span className="font-medium">{p.name}</span>
                        </div>
                        <span className="text-xs text-text-muted">{p.points} pts</span>
                      </div>
                    ))}
                    {court.players.length === 0 && (
                      <p className="text-sm text-text-muted italic">No players assigned</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InitialAssignments;
