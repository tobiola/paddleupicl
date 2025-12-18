import { Season, Qualifier } from '../types';

/**
 * Qualifiers: one-night events similar to a Week.
 * Each qualifier has an id (number), date and optional rankings/matches.
 * Qualifiers are marked with event: 'qualifier' where appropriate.
 */
export const qualifiers: Qualifier[] = [
  // Qualifier events should mirror a single-week season structure with 16 players.
  // Round 3 matches included across 4 courts so final positions can be derived.
  {
    id: 101,
    date: "2023-12-09",
    isCompleted: true,
    matches: [
      // Court 1
      { team1: ["q101_p1", "q101_p2"], team2: ["q101_p3", "q101_p4"], score1: 11, score2: 8, round: 3, court: 1, event: 'qualifier' },
      { team1: ["q101_p1", "q101_p3"], team2: ["q101_p2", "q101_p4"], score1: 11, score2: 6, round: 3, court: 1, event: 'qualifier' },
      { team1: ["q101_p1", "q101_p4"], team2: ["q101_p2", "q101_p3"], score1: 11, score2: 7, round: 3, court: 1, event: 'qualifier' },

      // Court 2
      { team1: ["q101_p5", "q101_p6"], team2: ["q101_p7", "q101_p8"], score1: 11, score2: 9, round: 3, court: 2, event: 'qualifier' },
      { team1: ["q101_p5", "q101_p7"], team2: ["q101_p6", "q101_p8"], score1: 11, score2: 7, round: 3, court: 2, event: 'qualifier' },
      { team1: ["q101_p5", "q101_p8"], team2: ["q101_p6", "q101_p7"], score1: 11, score2: 5, round: 3, court: 2, event: 'qualifier' },

      // Court 3
      { team1: ["q101_p9", "q101_p10"], team2: ["q101_p11", "q101_p12"], score1: 11, score2: 4, round: 3, court: 3, event: 'qualifier' },
      { team1: ["q101_p9", "q101_p11"], team2: ["q101_p10", "q101_p12"], score1: 11, score2: 3, round: 3, court: 3, event: 'qualifier' },
      { team1: ["q101_p9", "q101_p12"], team2: ["q101_p10", "q101_p11"], score1: 11, score2: 2, round: 3, court: 3, event: 'qualifier' },

      // Court 4
      { team1: ["q101_p13", "q101_p14"], team2: ["q101_p15", "q101_p16"], score1: 11, score2: 6, round: 3, court: 4, event: 'qualifier' },
      { team1: ["q101_p13", "q101_p15"], team2: ["q101_p14", "q101_p16"], score1: 11, score2: 5, round: 3, court: 4, event: 'qualifier' },
      { team1: ["q101_p13", "q101_p16"], team2: ["q101_p14", "q101_p15"], score1: 11, score2: 4, round: 3, court: 4, event: 'qualifier' }
    ]
  },
  {
    id: 102,
    date: "2024-01-06",
    isCompleted: true,
    matches: [
      // Court 1
      { team1: ["q102_p1", "q102_p2"], team2: ["q102_p3", "q102_p4"], score1: 11, score2: 9, round: 3, court: 1, event: 'qualifier' },
      { team1: ["q102_p1", "q102_p3"], team2: ["q102_p2", "q102_p4"], score1: 11, score2: 7, round: 3, court: 1, event: 'qualifier' },
      { team1: ["q102_p1", "q102_p4"], team2: ["q102_p2", "q102_p3"], score1: 11, score2: 6, round: 3, court: 1, event: 'qualifier' },

      // Court 2
      { team1: ["q102_p5", "q102_p6"], team2: ["q102_p7", "q102_p8"], score1: 11, score2: 8, round: 3, court: 2, event: 'qualifier' },
      { team1: ["q102_p5", "q102_p7"], team2: ["q102_p6", "q102_p8"], score1: 11, score2: 6, round: 3, court: 2, event: 'qualifier' },
      { team1: ["q102_p5", "q102_p8"], team2: ["q102_p6", "q102_p7"], score1: 11, score2: 5, round: 3, court: 2, event: 'qualifier' },

      // Court 3
      { team1: ["q102_p9", "q102_p10"], team2: ["q102_p11", "q102_p12"], score1: 11, score2: 4, round: 3, court: 3, event: 'qualifier' },
      { team1: ["q102_p9", "q102_p11"], team2: ["q102_p10", "q102_p12"], score1: 11, score2: 3, round: 3, court: 3, event: 'qualifier' },
      { team1: ["q102_p9", "q102_p12"], team2: ["q102_p10", "q102_p11"], score1: 11, score2: 2, round: 3, court: 3, event: 'qualifier' },

      // Court 4
      { team1: ["q102_p13", "q102_p14"], team2: ["q102_p15", "q102_p16"], score1: 11, score2: 7, round: 3, court: 4, event: 'qualifier' },
      { team1: ["q102_p13", "q102_p15"], team2: ["q102_p14", "q102_p16"], score1: 11, score2: 6, round: 3, court: 4, event: 'qualifier' },
      { team1: ["q102_p13", "q102_p16"], team2: ["q102_p14", "q102_p15"], score1: 11, score2: 5, round: 3, court: 4, event: 'qualifier' }
    ]
  }
];

/**
 * Past seasons (full Season objects). We intentionally DO NOT keep authoritative
 * stored standings here — standings will be derived from matches at runtime.
 *
 * Filled with sample round-3 matches so standings can be derived.
 */
export const pastSeasons: Season[] = [
  {
    season: "Season 0",
    date: "Oct - Nov 2023",
    lastUpdated: "2023-11-30",
    weeks: [
      {
        id: 1,
        date: "Oct 08",
        isCompleted: true,
        // sample seeding across 4 courts (players grouped by 4)
        matches: [
          // Court 1 (players 0..3) - round 3 matches
          { team1: ["bekahola", "tobiola"], team2: ["playerfour", "annaleighwaters"], score1: 11, score2: 7, round: 3, court: 1 },
          { team1: ["bekahola", "playerfour"], team2: ["tobiola", "annaleighwaters"], score1: 11, score2: 9, round: 3, court: 1 },
          { team1: ["bekahola", "annaleighwaters"], team2: ["tobiola", "playerfour"], score1: 11, score2: 8, round: 3, court: 1 },

          // Court 2 (players 4..7)
          { team1: ["playerfive", "playersix"], team2: ["playerseven", "playereight"], score1: 11, score2: 6, round: 3, court: 2 },
          { team1: ["playerfive", "playerseven"], team2: ["playersix", "playereight"], score1: 11, score2: 5, round: 3, court: 2 },
          { team1: ["playerfive", "playereight"], team2: ["playersix", "playerseven"], score1: 11, score2: 4, round: 3, court: 2 },

          // Court 3 (players 8..11)
          { team1: ["playernine", "playerten"], team2: ["playereleven", "playertwelve"], score1: 11, score2: 3, round: 3, court: 3 },
          { team1: ["playernine", "playereleven"], team2: ["playerten", "playertwelve"], score1: 11, score2: 2, round: 3, court: 3 },
          { team1: ["playernine", "playertwelve"], team2: ["playerten", "playereleven"], score1: 11, score2: 1, round: 3, court: 3 },

          // Court 4 (players 12..15)
          { team1: ["playerthirteen", "playerfourteen"], team2: ["playerfifteen", "playersixteen"], score1: 11, score2: 4, round: 3, court: 4 },
          { team1: ["playerthirteen", "playerfifteen"], team2: ["playerfourteen", "playersixteen"], score1: 11, score2: 2, round: 3, court: 4 },
          { team1: ["playerthirteen", "playersixteen"], team2: ["playerfourteen", "playerfifteen"], score1: 11, score2: 1, round: 3, court: 4 }
        ]
      },
      {
        id: 2,
        date: "Oct 15",
        isCompleted: true,
        matches: [
          // Court 1
          { team1: ["tobiola", "bekahola"], team2: ["annaleighwaters", "playerfour"], score1: 11, score2: 9, round: 3, court: 1 },
          { team1: ["tobiola", "annaleighwaters"], team2: ["bekahola", "playerfour"], score1: 11, score2: 8, round: 3, court: 1 },
          { team1: ["tobiola", "playerfour"], team2: ["bekahola", "annaleighwaters"], score1: 11, score2: 7, round: 3, court: 1 },

          // Court 2
          { team1: ["playerfive", "playersix"], team2: ["playerseven", "playereight"], score1: 11, score2: 7, round: 3, court: 2 },
          { team1: ["playerfive", "playerseven"], team2: ["playersix", "playereight"], score1: 11, score2: 6, round: 3, court: 2 },
          { team1: ["playerfive", "playereight"], team2: ["playersix", "playerseven"], score1: 11, score2: 5, round: 3, court: 2 },

          // Court 3
          { team1: ["playernine", "playerten"], team2: ["playereleven", "playertwelve"], score1: 11, score2: 4, round: 3, court: 3 },
          { team1: ["playernine", "playereleven"], team2: ["playerten", "playertwelve"], score1: 11, score2: 2, round: 3, court: 3 },
          { team1: ["playernine", "playertwelve"], team2: ["playerten", "playereleven"], score1: 11, score2: 1, round: 3, court: 3 },

          // Court 4
          { team1: ["playerthirteen", "playerfourteen"], team2: ["playerfifteen", "playersixteen"], score1: 11, score2: 6, round: 3, court: 4 },
          { team1: ["playerthirteen", "playerfifteen"], team2: ["playerfourteen", "playersixteen"], score1: 11, score2: 5, round: 3, court: 4 },
          { team1: ["playerthirteen", "playersixteen"], team2: ["playerfourteen", "playerfifteen"], score1: 11, score2: 4, round: 3, court: 4 }
        ]
      }
    ]
  },
  {
    season: "Season 1",
    date: "Jan - Feb 2024",
    lastUpdated: "2024-02-28",
    weeks: [
      {
        id: 1,
        date: "Jan 07",
        isCompleted: true,
        matches: [
          // Court 1
          { team1: ["benjohns", "annaleighwaters"], team2: ["caseyjohnson", "taylorwilson"], score1: 11, score2: 6, round: 3, court: 1 },
          { team1: ["benjohns", "caseyjohnson"], team2: ["annaleighwaters", "taylorwilson"], score1: 11, score2: 7, round: 3, court: 1 },
          { team1: ["benjohns", "taylorwilson"], team2: ["annaleighwaters", "caseyjohnson"], score1: 11, score2: 5, round: 3, court: 1 },

          // Court 2
          { team1: ["p5", "p6"], team2: ["p7", "p8"], score1: 11, score2: 7, round: 3, court: 2 },
          { team1: ["p5", "p7"], team2: ["p6", "p8"], score1: 11, score2: 6, round: 3, court: 2 },
          { team1: ["p5", "p8"], team2: ["p6", "p7"], score1: 11, score2: 5, round: 3, court: 2 },

          // Court 3
          { team1: ["p9", "p10"], team2: ["p11", "p12"], score1: 11, score2: 4, round: 3, court: 3 },
          { team1: ["p9", "p11"], team2: ["p10", "p12"], score1: 11, score2: 3, round: 3, court: 3 },
          { team1: ["p9", "p12"], team2: ["p10", "p11"], score1: 11, score2: 2, round: 3, court: 3 },

          // Court 4
          { team1: ["p13", "p14"], team2: ["p15", "p16"], score1: 11, score2: 5, round: 3, court: 4 },
          { team1: ["p13", "p15"], team2: ["p14", "p16"], score1: 11, score2: 4, round: 3, court: 4 },
          { team1: ["p13", "p16"], team2: ["p14", "p15"], score1: 11, score2: 3, round: 3, court: 4 }
        ]
      },
      {
        id: 2,
        date: "Jan 14",
        isCompleted: true,
        matches: [
          // Court 1
          { team1: ["annaleighwaters", "taylorwilson"], team2: ["benjohns", "caseyjohnson"], score1: 11, score2: 9, round: 3, court: 1 },
          { team1: ["annaleighwaters", "benjohns"], team2: ["taylorwilson", "caseyjohnson"], score1: 11, score2: 8, round: 3, court: 1 },
          { team1: ["annaleighwaters", "caseyjohnson"], team2: ["benjohns", "taylorwilson"], score1: 11, score2: 7, round: 3, court: 1 },

          // Court 2
          { team1: ["p5", "p6"], team2: ["p7", "p8"], score1: 11, score2: 9, round: 3, court: 2 },
          { team1: ["p5", "p7"], team2: ["p6", "p8"], score1: 11, score2: 8, round: 3, court: 2 },
          { team1: ["p5", "p8"], team2: ["p6", "p7"], score1: 11, score2: 7, round: 3, court: 2 },

          // Court 3
          { team1: ["p9", "p10"], team2: ["p11", "p12"], score1: 11, score2: 6, round: 3, court: 3 },
          { team1: ["p9", "p11"], team2: ["p10", "p12"], score1: 11, score2: 5, round: 3, court: 3 },
          { team1: ["p9", "p12"], team2: ["p10", "p11"], score1: 11, score2: 4, round: 3, court: 3 },

          // Court 4
          { team1: ["p13", "p14"], team2: ["p15", "p16"], score1: 11, score2: 8, round: 3, court: 4 },
          { team1: ["p13", "p15"], team2: ["p14", "p16"], score1: 11, score2: 7, round: 3, court: 4 },
          { team1: ["p13", "p16"], team2: ["p14", "p15"], score1: 11, score2: 6, round: 3, court: 4 }
        ]
      }
    ]
  }
];

/**
 * Current season data (keeps the same variable name used across project: seasonData)
 * Weeks fully populated with sample round-3 matches so standings can be derived.
 */
export const seasonData: Season = {
  season: "Season 2",
  lastUpdated: "2024-02-18",
  weeks: [
    {
      id: 1,
      date: "Feb 11",
      isCompleted: true,
      matches: [
        // Round 1 & 2 sample matches (kept for reference)
        { team1: ["bekahola", "benjohns"], team2: ["annaleighwaters", "tobiola"], score1: 11, score2: 9, round: 1, court: 1 },
        { team1: ["bekahola", "annaleighwaters"], team2: ["benjohns", "tobiola"], score1: 11, score2: 8, round: 1, court: 1 },
        { team1: ["bekahola", "tobiola"], team2: ["benjohns", "annaleighwaters"], score1: 11, score2: 7, round: 1, court: 1 },

        // Round 3 matches (final positions) - distribute players into 4 courts (4 players each)
        // Court 1 (players 0..3)
        { team1: ["bekahola", "benjohns"], team2: ["annaleighwaters", "tobiola"], score1: 11, score2: 9, round: 3, court: 1 },
        { team1: ["bekahola", "annaleighwaters"], team2: ["benjohns", "tobiola"], score1: 11, score2: 8, round: 3, court: 1 },
        { team1: ["bekahola", "tobiola"], team2: ["benjohns", "annaleighwaters"], score1: 11, score2: 7, round: 3, court: 1 },

        // Court 2 (players 4..7)
        { team1: ["caseyjohnson", "taylorwilson"], team2: ["morganlee", "rileybrown"], score1: 11, score2: 6, round: 3, court: 2 },
        { team1: ["caseyjohnson", "morganlee"], team2: ["taylorwilson", "rileybrown"], score1: 11, score2: 5, round: 3, court: 2 },
        { team1: ["caseyjohnson", "rileybrown"], team2: ["taylorwilson", "morganlee"], score1: 11, score2: 4, round: 3, court: 2 },

        // Court 3 (players 8..11)
        { team1: ["jamiedavis", "quinnmiller"], team2: ["averymoore", "drewtaylor"], score1: 11, score2: 3, round: 3, court: 3 },
        { team1: ["jamiedavis", "averymoore"], team2: ["quinnmiller", "drewtaylor"], score1: 11, score2: 2, round: 3, court: 3 },
        { team1: ["jamiedavis", "drewtaylor"], team2: ["quinnmiller", "averymoore"], score1: 11, score2: 1, round: 3, court: 3 },

        // Court 4 (players 12..15)
        { team1: ["reeseanderson", "skylerthomas"], team2: ["alexrivera", "playerfour"], score1: 11, score2: 0, round: 3, court: 4 },
        { team1: ["reeseanderson", "alexrivera"], team2: ["skylerthomas", "playerfour"], score1: 11, score2: 0, round: 3, court: 4 },
        { team1: ["reeseanderson", "playerfour"], team2: ["skylerthomas", "alexrivera"], score1: 11, score2: 0, round: 3, court: 4 }
      ]
    },
    {
      id: 2,
      date: "Feb 18",
      isCompleted: true,
      matches: [
        // Round 1 sample
        { team1: ["benjohns", "bekahola"], team2: ["tobiola", "annaleighwaters"], score1: 11, score2: 10, round: 1, court: 1 },
        { team1: ["benjohns", "tobiola"], team2: ["bekahola", "annaleighwaters"], score1: 11, score2: 9, round: 1, court: 1 },

        // Round 3 final positions across courts
        // Court 1
        { team1: ["quinnmiller", "jamiedavis"], team2: ["drewtaylor", "averymoore"], score1: 11, score2: 4, round: 3, court: 1 },
        { team1: ["quinnmiller", "drewtaylor"], team2: ["jamiedavis", "averymoore"], score1: 11, score2: 3, round: 3, court: 1 },
        { team1: ["quinnmiller", "averymoore"], team2: ["jamiedavis", "drewtaylor"], score1: 11, score2: 2, round: 3, court: 1 },

        // Court 2
        { team1: ["benjohns", "bekahola"], team2: ["tobiola", "annaleighwaters"], score1: 11, score2: 10, round: 3, court: 2 },
        { team1: ["benjohns", "tobiola"], team2: ["bekahola", "annaleighwaters"], score1: 11, score2: 9, round: 3, court: 2 },
        { team1: ["benjohns", "annaleighwaters"], team2: ["bekahola", "tobiola"], score1: 11, score2: 8, round: 3, court: 2 },

        // Court 3
        { team1: ["taylorwilson", "caseyjohnson"], team2: ["rileybrown", "morganlee"], score1: 11, score2: 7, round: 3, court: 3 },
        { team1: ["taylorwilson", "rileybrown"], team2: ["caseyjohnson", "morganlee"], score1: 11, score2: 6, round: 3, court: 3 },
        { team1: ["taylorwilson", "morganlee"], team2: ["caseyjohnson", "rileybrown"], score1: 11, score2: 5, round: 3, court: 3 },

        // Court 4
        { team1: ["skylerthomas", "reeseanderson"], team2: ["playerfour", "alexrivera"], score1: 11, score2: 1, round: 3, court: 4 },
        { team1: ["skylerthomas", "playerfour"], team2: ["reeseanderson", "alexrivera"], score1: 11, score2: 1, round: 3, court: 4 },
        { team1: ["skylerthomas", "alexrivera"], team2: ["reeseanderson", "playerfour"], score1: 11, score2: 1, round: 3, court: 4 }
      ]
    },
    {
      id: 3,
      date: "Feb 25",
      isCompleted: true,
      matches: [
        // Court 1
        { team1: ["bekahola", "jamiedavis"], team2: ["benjohns", "quinnmiller"], score1: 11, score2: 8, round: 3, court: 1 },
        { team1: ["bekahola", "benjohns"], team2: ["jamiedavis", "quinnmiller"], score1: 11, score2: 7, round: 3, court: 1 },
        { team1: ["bekahola", "quinnmiller"], team2: ["benjohns", "jamiedavis"], score1: 11, score2: 6, round: 3, court: 1 },

        // Court 2
        { team1: ["caseyjohnson", "rileybrown"], team2: ["taylorwilson", "morganlee"], score1: 11, score2: 5, round: 3, court: 2 },
        { team1: ["caseyjohnson", "taylorwilson"], team2: ["rileybrown", "morganlee"], score1: 11, score2: 4, round: 3, court: 2 },
        { team1: ["caseyjohnson", "morganlee"], team2: ["taylorwilson", "rileybrown"], score1: 11, score2: 3, round: 3, court: 2 },

        // Court 3
        { team1: ["averymoore", "drewtaylor"], team2: ["jamiedavis", "quinnmiller"], score1: 11, score2: 2, round: 3, court: 3 },
        { team1: ["averymoore", "quinnmiller"], team2: ["drewtaylor", "jamiedavis"], score1: 11, score2: 1, round: 3, court: 3 },
        { team1: ["averymoore", "jamiedavis"], team2: ["drewtaylor", "quinnmiller"], score1: 11, score2: 0, round: 3, court: 3 },

        // Court 4
        { team1: ["reeseanderson", "alexrivera"], team2: ["skylerthomas", "playerfour"], score1: 11, score2: 4, round: 3, court: 4 },
        { team1: ["reeseanderson", "playerfour"], team2: ["skylerthomas", "alexrivera"], score1: 11, score2: 3, round: 3, court: 4 },
        { team1: ["reeseanderson", "skylerthomas"], team2: ["playerfour", "alexrivera"], score1: 11, score2: 2, round: 3, court: 4 }
      ]
    },
    {
      id: 4,
      date: "Mar 03",
      isCompleted: true,
      matches: [
        // Court 1
        { team1: ["benjohns", "quinnmiller"], team2: ["bekahola", "jamiedavis"], score1: 11, score2: 9, round: 3, court: 1 },
        { team1: ["benjohns", "jamiedavis"], team2: ["bekahola", "quinnmiller"], score1: 11, score2: 8, round: 3, court: 1 },
        { team1: ["benjohns", "bekahola"], team2: ["jamiedavis", "quinnmiller"], score1: 11, score2: 7, round: 3, court: 1 },

        // Court 2
        { team1: ["taylorwilson", "morganlee"], team2: ["caseyjohnson", "rileybrown"], score1: 11, score2: 6, round: 3, court: 2 },
        { team1: ["taylorwilson", "rileybrown"], team2: ["caseyjohnson", "morganlee"], score1: 11, score2: 5, round: 3, court: 2 },
        { team1: ["taylorwilson", "caseyjohnson"], team2: ["morganlee", "rileybrown"], score1: 11, score2: 4, round: 3, court: 2 },

        // Court 3
        { team1: ["averymoore", "quinnmiller"], team2: ["drewtaylor", "jamiedavis"], score1: 11, score2: 3, round: 3, court: 3 },
        { team1: ["averymoore", "drewtaylor"], team2: ["quinnmiller", "jamiedavis"], score1: 11, score2: 2, round: 3, court: 3 },
        { team1: ["averymoore", "jamiedavis"], team2: ["quinnmiller", "drewtaylor"], score1: 11, score2: 1, round: 3, court: 3 },

        // Court 4
        { team1: ["reeseanderson", "playerfour"], team2: ["alexrivera", "skylerthomas"], score1: 11, score2: 2, round: 3, court: 4 },
        { team1: ["reeseanderson", "skylerthomas"], team2: ["alexrivera", "playerfour"], score1: 11, score2: 1, round: 3, court: 4 },
        { team1: ["reeseanderson", "alexrivera"], team2: ["skylerthomas", "playerfour"], score1: 11, score2: 0, round: 3, court: 4 }
      ]
    },
    {
      id: 5,
      date: "Mar 10",
      isCompleted: true,
      matches: [
        // Court 1
        { team1: ["quinnmiller", "benjohns"], team2: ["jamiedavis", "bekahola"], score1: 11, score2: 6, round: 3, court: 1 },
        { team1: ["quinnmiller", "jamiedavis"], team2: ["benjohns", "bekahola"], score1: 11, score2: 5, round: 3, court: 1 },
        { team1: ["quinnmiller", "bekahola"], team2: ["benjohns", "jamiedavis"], score1: 11, score2: 4, round: 3, court: 1 },

        // Court 2
        { team1: ["morganlee", "taylorwilson"], team2: ["rileybrown", "caseyjohnson"], score1: 11, score2: 3, round: 3, court: 2 },
        { team1: ["morganlee", "rileybrown"], team2: ["taylorwilson", "caseyjohnson"], score1: 11, score2: 2, round: 3, court: 2 },
        { team1: ["morganlee", "caseyjohnson"], team2: ["taylorwilson", "rileybrown"], score1: 11, score2: 1, round: 3, court: 2 },

        // Court 3
        { team1: ["averymoore", "jamiedavis"], team2: ["drewtaylor", "quinnmiller"], score1: 11, score2: 0, round: 3, court: 3 },
        { team1: ["averymoore", "drewtaylor"], team2: ["jamiedavis", "quinnmiller"], score1: 11, score2: 0, round: 3, court: 3 },
        { team1: ["averymoore", "quinnmiller"], team2: ["drewtaylor", "jamiedavis"], score1: 11, score2: 0, round: 3, court: 3 },

        // Court 4
        { team1: ["reeseanderson", "alexrivera"], team2: ["playerfour", "skylerthomas"], score1: 11, score2: 2, round: 3, court: 4 },
        { team1: ["reeseanderson", "playerfour"], team2: ["alexrivera", "skylerthomas"], score1: 11, score2: 1, round: 3, court: 4 },
        { team1: ["reeseanderson", "skylerthomas"], team2: ["alexrivera", "playerfour"], score1: 11, score2: 0, round: 3, court: 4 }
      ]
    },
    {
      id: 6,
      date: "Mar 17",
      isCompleted: true,
      matches: [
        // Court 1
        { team1: ["benjohns", "taylorwilson"], team2: ["bekahola", "jamiedavis"], score1: 11, score2: 9, round: 3, court: 1 },
        { team1: ["benjohns", "bekahola"], team2: ["taylorwilson", "jamiedavis"], score1: 11, score2: 8, round: 3, court: 1 },
        { team1: ["benjohns", "jamiedavis"], team2: ["bekahola", "taylorwilson"], score1: 11, score2: 7, round: 3, court: 1 },

        // Court 2
        { team1: ["rileybrown", "caseyjohnson"], team2: ["morganlee", "quinnmiller"], score1: 11, score2: 6, round: 3, court: 2 },
        { team1: ["rileybrown", "quinnmiller"], team2: ["morganlee", "caseyjohnson"], score1: 11, score2: 5, round: 3, court: 2 },
        { team1: ["rileybrown", "morganlee"], team2: ["quinnmiller", "caseyjohnson"], score1: 11, score2: 4, round: 3, court: 2 },

        // Court 3
        { team1: ["averymoore", "quinnmiller"], team2: ["jamiedavis", "drewtaylor"], score1: 11, score2: 3, round: 3, court: 3 },
        { team1: ["averymoore", "jamiedavis"], team2: ["quinnmiller", "drewtaylor"], score1: 11, score2: 2, round: 3, court: 3 },
        { team1: ["averymoore", "drewtaylor"], team2: ["quinnmiller", "jamiedavis"], score1: 11, score2: 1, round: 3, court: 3 },

        // Court 4
        { team1: ["reeseanderson", "skylerthomas"], team2: ["alexrivera", "playerfour"], score1: 11, score2: 2, round: 3, court: 4 },
        { team1: ["reeseanderson", "alexrivera"], team2: ["skylerthomas", "playerfour"], score1: 11, score2: 1, round: 3, court: 4 },
        { team1: ["reeseanderson", "playerfour"], team2: ["skylerthomas", "alexrivera"], score1: 11, score2: 0, round: 3, court: 4 }
      ]
    },
  ]
};
