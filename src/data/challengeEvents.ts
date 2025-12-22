/*
Example match data

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
*/


export const challengeEvents = [
  {
    id: '2025-12-14',
    name: 'The Challenge — 12/14',
    startDateTime: new Date('2025-12-14T19:00:00'),
    location: 'Paddle Up Pickleball Club',
    status: 'open',
    link: 'https://mobileapp.courtreserve.com/Online/Events/Details/10117?resId=45176797',
    players : [
      "bekahola", "tobiola", "playerfour", "annaleighwaters",
      "playerfive", "playersix", "playerseven", "playereight",
      "playernine", "playerten", "playereleven", "playertwelve",
      "playerthirteen", "playerfourteen", "playerfifteen", "playersixteen"
    ],
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
    id: '2025-12-28',
    name: 'The Challenge — 12/28',
    startDateTime: new Date('2025-12-28T19:00:00'),
    location: 'Paddle Up Pickleball Club',
    status: 'open',
    link: 'https://mobileapp.courtreserve.com/Online/Events/Details/10117?resId=45176797',
  },
  {
    id: '2026-01-04',
    name: 'The Challenge — 1/4',
    startDateTime: new Date('2026-01-04T19:00:00'),
    location: 'Paddle Up Pickleball Club',
    status: 'open',
    link: 'https://mobileapp.courtreserve.com/Online/Events/Details/10117/KIP6A7Q10117168?resId=45176798'
  },
  {
    id: '2026-01-11',
    name: 'The Challenge — 1/11',
    startDateTime: new Date('2026-01-11T19:00:00'),
    location: 'Paddle Up Pickleball Club',
    status: 'open',
    link: 'https://mobileapp.courtreserve.com/Online/Events/Details/10117/SQNPCTF10117214?resId=45176799'
  },
  {
    id: '2026-01-18',
    name: 'The Challenge — 1/18',
    startDateTime: new Date('2026-01-18T19:00:00'),
    location: 'Paddle Up Pickleball Club',
    status: 'open',
    link: 'https://mobileapp.courtreserve.com/Online/Events/Details/10117/6N5ZAKX10117261?resId=45176801'
  },
  {
    id: '2026-01-25',
    name: 'The Challenge — 1/25',
    startDateTime: new Date('2026-01-25T19:00:00'),
    location: 'Paddle Up Pickleball Club',
    status: 'open',
    link: 'https://mobileapp.courtreserve.com/Online/Events/Details/10117/LTANVTQ10117308?resId=45176802'
  },
  {
    id: '2026-02-01',
    name: 'The Challenge — 2/1',
    startDateTime: new Date('2026-02-01T19:00:00'),
    location: 'Paddle Up Pickleball Club',
    status: 'open',
    link: 'https://mobileapp.courtreserve.com/Online/Events/Details/10117/RNU98TK10117356?resId=45176803'
  }
];

export default challengeEvents;
