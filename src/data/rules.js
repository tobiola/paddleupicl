export const rules = {
  general: [
    "DUPR 3.6+ required",
    "DUPR must be linked in CourtReserve prior to play",
  ],
  format: [
    {
      title: "Round 1: The Qualifier",
      description: [
        "The field splits.",
        "Top 2 from each court advance to the Upper Bracket (Courts 1 & 2).",
        "Bottom 2 move to the Lower Bracket (Courts 3 & 4)."
      ]
    },
    {
      title: "Round 2: The Semis",
      description: [
        "Bracket play.",
        "Top 2 from each Upper Bracket court advance to the Championship Court (C1); bottom 2 move to Court 2.",
        "Top 2 from each Lower Bracket court advance to Court 3; bottom 2 move to Court 4."
      ]
    },
    {
      title: "Round 3: The Finals",
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
    "Players may not choose their own subs",
    "Subs assigned by league administration only",
    "Subs must meet DUPR requirements and be skill-matched",
    "Sub points do not count toward season standings",
    "Absent players receive 0 points"
  ]
};
