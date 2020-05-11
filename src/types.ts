export type Items = {
  bijou: number;
  zulian: number;
  razzashi: number;
  hakkari: number;
  sandfury: number;
  skullsplitter: number;
  bloodscalp: number;
  gurubashi: number;
  vilebranch: number;
  witherbark: number;
};

export type ItemNames = keyof Items;

export interface Character {
  sent: boolean;
  items: Items;
}
