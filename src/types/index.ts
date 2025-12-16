export interface Player {
  id: string;
  name: string;
  dupr?: number;
  image?: string;
  url?: string;
}

export interface Match {
  team1: string[];
  team2: string[];
  score1: number;
  score2: number;
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

export interface Rules {
  philosophy: string;
  seasonStructure: {
    rosterSize: number;
    duration: string;
    when: string;
    safeZone: string;
    dropZone: string;
  };
  qualification: {
    who: string[];
    format: string;
    advancement: string[];
    note: string;
  };
  general: string[];
  format: {
    title: string;
    description: string | string[];
  }[];
  scoring: string[];
  points: {
    championship: Record<number, number>;
    court2: Record<number, number>;
    court3: Record<number, number>;
    court4: Record<number, number>;
  };
  subs: string[];
}
