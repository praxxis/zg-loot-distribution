import {Items} from './types';

export const itemNames = [
  'bijou',
  'zulian',
  'razzashi',
  'hakkari',
  'sandfury',
  'skullsplitter',
  'bloodscalp',
  'gurubashi',
  'vilebranch',
  'witherbark',
] as const;

export const coinSets = [
  ['zulian', 'razzashi', 'hakkari'] as const,
  ['sandfury', 'skullsplitter', 'bloodscalp'] as const,
  ['gurubashi', 'vilebranch', 'witherbark'] as const,
];

// TODO: freeze?
export const emptyItems: Items = {
  bijou: 0,
  zulian: 0,
  razzashi: 0,
  hakkari: 0,
  sandfury: 0,
  skullsplitter: 0,
  bloodscalp: 0,
  gurubashi: 0,
  vilebranch: 0,
  witherbark: 0,
};
