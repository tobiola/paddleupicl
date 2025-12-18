import { players as playersData } from './players';
import { pastSeasons as importedPastSeasons, seasonData as importedSeasonData, qualifiers as importedQualifiers } from './events';
import { Player, Season } from '../types';

export const players: Player[] = playersData;
export const pastSeasons: Season[] = importedPastSeasons;
export const seasonData: Season = importedSeasonData;
export const qualifiers = importedQualifiers;
