
export type Items = 'bijou' | 'zulian' | 'razzashi' | 'hakkari' | 'sandfury' | 'skullsplitter' | 'bloodscalp' | 'gurubashi' | 'vilebranch' | 'witherbark';

export interface Character {
  sent: boolean;
  items: { [k in Items]: number }
}
