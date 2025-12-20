import { leagueRules, challengeRules } from '../data/rules';

export type ViewKey = 'current' | 'future';

export function getFormatConfig(view: ViewKey) {
  // Base is the league rules
  const base = leagueRules;

  if (view === 'current') {
    // current view uses challengeRules overrides
    const price = challengeRules.price ?? { display: base.fee, note: base.seasonStructure?.duration ?? '' };
    const title = challengeRules.title ?? 'The Challenge';
    const showSections = {
      seasonStructure: challengeRules.showSections?.seasonStructure ?? false,
      prizes: challengeRules.showSections?.prizes ?? false,
      qualifiers: challengeRules.showSections?.qualifiers ?? false
    };

    return { title, price, showSections, base };
  }

  // future view: use league defaults
  const price = { display: base.fee, note: base.seasonStructure?.duration ?? '' };
  const title = base.title;
  const showSections = { seasonStructure: true, prizes: true, qualifiers: true };

  return { title, price, showSections, base };
}

export default getFormatConfig;
