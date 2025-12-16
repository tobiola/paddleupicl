import { Rules } from '../types';

export const rules: Rules = {
  philosophy: "Competitive integrity is the priority. Rotating partners, merit-based court movement, and transparent standings determine advancement. Top performers earn season rewards and guaranteed spots for the next season, while lower performers must re-qualify to ensure a high level of competition.",
  seasonStructure: {
    rosterSize: 16,
    duration: "6 Weeks",
    when: "Sundays, 7:00 PM – 9:00 PM",
    safeZone: "Top 12 Players: Safe. You are guaranteed a roster spot for the next season.",
    dropZone: "Bottom 4 Players: Relegated. You lose your roster spot immediately. To rejoin, you must register for the Open Qualifiers and earn your way back in against new applicants."
  },
  qualification: {
    who: [
      "New applicants (DUPR 3.6+ required)",
      "Relegated players from the previous season"
    ],
    format: "Round Robin (Rotating Partners)",
    advancement: [
      "Qualifier #1: The Top 2 finishers earn a spot in the league",
      "Qualifier #2: The Top 2 finishers earn a spot in the league",
      "Remaining league spots (if any) are filled based on overall points from both events"
    ],
    note: "If you fail to qualify in the first event, you may register for the second event to try again."
  },
  general: [
    "DUPR 3.6+ required",
    "DUPR must be linked in CourtReserve prior to play",
  ],
  format: [
    {
      title: "Round 1: Quarterfinals",
      description: [
        "Players are divided into 4 courts based on seeding.",
        "Top 2 from each court advance to the Upper Bracket (Courts 1 & 2).",
        "Bottom 2 move to the Lower Bracket (Courts 3 & 4)."
      ]
    },
    {
      title: "Round 2: Semifinals",
      description: [
        "Bracket play.",
        "Top 2 from each Upper Bracket court advance to the Championship Court (C1); bottom 2 move to Court 2.",
        "Top 2 from each Lower Bracket court advance to Court 3; bottom 2 move to Court 4."
      ]
    },
    {
      title: "Round 3: Finals",
      description: [
        "Final placement.",
        "You play one last round robin on your assigned court (1-4) to determine your final points and ranking."
      ]
    }
  ],
  scoring: [
    "Rally scoring",
    "First to 11",
    "Ceiling contact = out"
  ],
  points: {
    championship: { 1: 1000, 2: 800, 3: 600, 4: 400 },
    court2: { 1: 300, 2: 250, 3: 200, 4: 150 },
    court3: { 1: 100, 2: 80, 3: 60, 4: 40 },
    court4: { 1: 30, 2: 25, 3: 20, 4: 15 }
  },
  subs: [
    "League players must contact league administration to arrange for a sub ahead of time",
    "Subs will be chosen from from the top performers in the most recent Open Qualifiers",
    "Absent players receive 0 points"
  ]
};
