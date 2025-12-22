import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { players as allPlayers } from '../data/players';
import { generateSnakeDraw, getNextCourt } from '../lib/leagueUtils';
import Card from '../components/ui/Card';
import CourtCard from '../components/match/CourtCard';
import PageHeader from '../components/ui/PageHeader';

/**
 * MatchSheet page
 * - Auto-fills initial assignments using a snake draw of top 16 players (by DUPR)
 * - Shows per-court inputs for scores (one numeric score per player)
 * - Recomputes ranks and shows suggested next court using leagueUtils.getNextCourt
 *
 * Note: This is a browser-first interactive UI (no PDF). State lives in memory;
 * you can add localStorage persistence later if desired.
 */

const MatchSheetPage: React.FC = () => {
  // Build initial ranked players (top 16 by DUPR; fallback to name)
  const rankedPlayers = useMemo(() => {
    return [...allPlayers]
      .sort((a, b) => {
        if ((b.dupr || 0) !== (a.dupr || 0)) return (b.dupr || 0) - (a.dupr || 0);
        return a.name.localeCompare(b.name);
      })
      .slice(0, 16);
  }, []);

  const location = useLocation();
  const stateAssignments = (location.state as any)?.assignments as ReturnType<typeof generateSnakeDraw> | undefined;
  const initialAssignments = useMemo(() => stateAssignments ?? generateSnakeDraw(rankedPlayers), [rankedPlayers, stateAssignments]);

  const [round, setRound] = useState<number>(1);
  // scores state: map courtId -> array of scores (aligned with players array)
  const [scores, setScores] = useState<Record<number, (number | '')[]>>(() => {
    const s: Record<number, (number | '')[]> = {};
    initialAssignments.forEach(c => {
      s[c.id] = c.players.map(() => '');
    });
    return s;
  });

  // Derived: compute ranks & next courts for each player
  const computeNext = (): Record<number, { ranks: number[]; next: (number | string)[] }> => {
    const result: Record<number, { ranks: number[]; next: (number | string)[] }> = {};
    initialAssignments.forEach((court) => {
      const raw = scores[court.id] || [];
      const courtScores: (number | null)[] = raw.map((v: number | '') => (v === '' ? null : Number(v)));

      // Build array of { idx, score } so we can rank ties deterministically by idx
      type Item = { idx: number; score: number | null };
      const arr: Item[] = courtScores.map((s, idx) => ({ idx, score: s }));

      // Sort descending by score (nulls go last). Higher score => better rank (1)
      arr.sort((a: Item, b: Item) => {
        if (a.score === null && b.score === null) return a.idx - b.idx;
        if (a.score === null) return 1;
        if (b.score === null) return -1;
        // both non-null
        return (b.score as number) - (a.score as number) || a.idx - b.idx;
      });

      // assign ranks: best -> 1
      const ranks: number[] = new Array(court.players.length).fill(court.players.length);
      arr.forEach((item: Item, pos: number) => {
        ranks[item.idx] = pos + 1;
      });

      const next = ranks.map((r) => getNextCourt(round, court.id, r));

      result[court.id] = { ranks, next };
    });
    return result;
  };

  const nextByCourt = computeNext();

  const updateScore = (courtId: number, playerIndex: number, value: string) => {
    const parsed = value === '' ? '' : Number(value);
    setScores(prev => {
      const copy = { ...prev };
      copy[courtId] = [...(copy[courtId] || [])];
      copy[courtId][playerIndex] = parsed === '' || Number.isNaN(parsed) ? '' : parsed;
      return copy;
    });
  };

  const clearScores = () => {
    const s: Record<number, (number | '')[]> = {};
    initialAssignments.forEach(c => {
      s[c.id] = c.players.map(() => '');
    });
    setScores(s as any);
  };

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Match Sheet"
        subtitle="Interactive court sheets — enter scores and see suggested next courts"
        center
      />

      <div className="max-w-5xl mx-auto space-y-6">
        <Card className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm text-text-muted">Round</label>
            <select
              value={round}
              onChange={(e) => setRound(Number(e.target.value))}
              className="px-3 py-2 rounded border border-border bg-surface-highlight"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearScores}
              className="px-3 py-2 rounded bg-surface-highlight text-sm hover:bg-surface-highlight/80"
            >
              Clear Scores
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded bg-primary text-text-main font-bold"
            >
              Open Print Preview
            </button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialAssignments.map((court) => (
            <CourtCard
              key={court.id}
              court={court}
              scores={(scores[court.id] || []) as (number | '')[]}
              onScoreChange={(idx, val) => updateScore(court.id, idx, val)}
              ranks={nextByCourt[court.id]?.ranks}
              nextCourts={nextByCourt[court.id]?.next}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchSheetPage;
