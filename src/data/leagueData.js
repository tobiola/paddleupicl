import playersData from './players.json';

export const players = playersData;

export const pastSeasons = [
  {
    season: "Season 0",
    date: "Oct - Nov 2023",
    standings: [
      { rank: 1, playerId: "bekahola", points: 500 },
      { rank: 2, playerId: "tobiola", points: 450 },
      { rank: 3, playerId: "playerthree", points: 400 },
      { rank: 4, playerId: "playerfour", points: 350 }
    ]
  },
  {
    season: "Season 1",
    date: "Jan - Feb 2024",
    standings: [
      { rank: 1, playerId: "jordansmith", points: 480 },
      { rank: 2, playerId: "alexrivera", points: 460 },
      { rank: 3, playerId: "caseyjohnson", points: 420 },
      { rank: 4, playerId: "taylorwilson", points: 380 }
    ]
  }
];

export const seasonData = {
  season: "Season 2",
  lastUpdated: "2024-02-18",
  weeks: [
    {
      id: 1,
      date: "Feb 11",
      isCompleted: true,
      rankings: [
        "bekahola", "jordansmith", "alexrivera", "tobiola",
        "caseyjohnson", "taylorwilson", "morganlee", "rileybrown",
        "jamiedavis", "quinnmiller", "averymoore", "drewtaylor",
        "reeseanderson", "skylerthomas", "playerthree", "playerfour"
      ],
      matches: [
        // Court 1
        { team1: ["bekahola", "jordansmith"], team2: ["alexrivera", "tobiola"], score1: 11, score2: 9 },
        { team1: ["bekahola", "alexrivera"], team2: ["jordansmith", "tobiola"], score1: 11, score2: 8 },
        { team1: ["bekahola", "tobiola"], team2: ["jordansmith", "alexrivera"], score1: 11, score2: 7 },
        // Court 2
        { team1: ["caseyjohnson", "taylorwilson"], team2: ["morganlee", "rileybrown"], score1: 11, score2: 6 },
        { team1: ["caseyjohnson", "morganlee"], team2: ["taylorwilson", "rileybrown"], score1: 11, score2: 5 },
        { team1: ["caseyjohnson", "rileybrown"], team2: ["taylorwilson", "morganlee"], score1: 11, score2: 4 },
        // Court 3
        { team1: ["jamiedavis", "quinnmiller"], team2: ["averymoore", "drewtaylor"], score1: 11, score2: 3 },
        { team1: ["jamiedavis", "averymoore"], team2: ["quinnmiller", "drewtaylor"], score1: 11, score2: 2 },
        { team1: ["jamiedavis", "drewtaylor"], team2: ["quinnmiller", "averymoore"], score1: 11, score2: 1 },
        // Court 4
        { team1: ["reeseanderson", "skylerthomas"], team2: ["playerthree", "playerfour"], score1: 11, score2: 0 },
        { team1: ["reeseanderson", "playerthree"], team2: ["skylerthomas", "playerfour"], score1: 11, score2: 0 },
        { team1: ["reeseanderson", "playerfour"], team2: ["skylerthomas", "playerthree"], score1: 11, score2: 0 }
      ]
    },
    {
      id: 2,
      date: "Feb 18",
      isCompleted: true,
      rankings: [
        "quinnmiller", "jamiedavis", "drewtaylor", "averymoore",
        "jordansmith", "bekahola", "tobiola", "alexrivera",
        "taylorwilson", "caseyjohnson", "rileybrown", "morganlee",
        "skylerthomas", "reeseanderson", "playerfour", "playerthree"
      ],
      matches: [
        // Court 1
        { team1: ["jordansmith", "bekahola"], team2: ["tobiola", "alexrivera"], score1: 11, score2: 10 },
        { team1: ["jordansmith", "tobiola"], team2: ["bekahola", "alexrivera"], score1: 11, score2: 9 },
        { team1: ["jordansmith", "alexrivera"], team2: ["bekahola", "tobiola"], score1: 11, score2: 8 },
        // Court 2
        { team1: ["taylorwilson", "caseyjohnson"], team2: ["rileybrown", "morganlee"], score1: 11, score2: 7 },
        { team1: ["taylorwilson", "rileybrown"], team2: ["caseyjohnson", "morganlee"], score1: 11, score2: 6 },
        { team1: ["taylorwilson", "morganlee"], team2: ["caseyjohnson", "rileybrown"], score1: 11, score2: 5 },
        // Court 3
        { team1: ["quinnmiller", "jamiedavis"], team2: ["drewtaylor", "averymoore"], score1: 11, score2: 4 },
        { team1: ["quinnmiller", "drewtaylor"], team2: ["jamiedavis", "averymoore"], score1: 11, score2: 3 },
        { team1: ["quinnmiller", "averymoore"], team2: ["jamiedavis", "drewtaylor"], score1: 11, score2: 2 },
        // Court 4
        { team1: ["skylerthomas", "reeseanderson"], team2: ["playerfour", "playerthree"], score1: 11, score2: 1 },
        { team1: ["skylerthomas", "playerfour"], team2: ["reeseanderson", "playerthree"], score1: 11, score2: 1 },
        { team1: ["skylerthomas", "playerthree"], team2: ["reeseanderson", "playerfour"], score1: 11, score2: 1 }
      ]
    },
    { id: 3, date: "Feb 25", isCompleted: false },
    { id: 4, date: "Mar 3", isCompleted: false },
    { id: 5, date: "Mar 10", isCompleted: false },
    { id: 6, date: "Mar 17", isCompleted: false },
    { id: 7, date: "Mar 24", isCompleted: false },
    { id: 8, date: "Mar 31", isCompleted: false }
  ]
};
