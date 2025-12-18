export interface Player {
  id: string;
  name: string;
  dupr?: number;
  imageUrl?: string;
}

export interface Match {
  id?: string;
  team1: string[];
  team2: string[];
  score1: number;
  score2: number;
  court?: number;
  round?: number;
  event?: 'regular' | 'qualifier';
  notes?: string;
}

export interface Week {
  id: number;
  date: string;
  isCompleted: boolean;
  rankings?: string[];
  matches?: Match[];
}

export interface Standing {
  rank: number;
  playerId: string;
  points: number;
}

export interface Season {
  season: string;
  date?: string;
  lastUpdated?: string;
  weeks?: Week[];
  standings?: Standing[];
}

/**
 * Qualifier events are similar in shape to a single Week (one-night events).
 * We keep a dedicated type for clarity in data files and components.
 */
export type Qualifier = Week;

export type SeasonData = Season;

export interface PlayerStats {
  id: string;
  points: number;
  wins: number;
  losses: number;
  pointsWon: number;
  pointsLost: number;
  diff: number;
  appearances: number;
  champCourt: number;
  weeklyRanks: number[];
  rank?: number;
}

export interface AllTimeStats {
  playerId: string;
  points: number;
  seasons: number;
  rank?: number;
}
