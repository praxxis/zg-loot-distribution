export const charFactory = (name: string, items: {} = {}) => {
  return {
    [name]: {
      sent: false,
      items: itemsFactory(items),
    },
  };
};

export const itemsFactory = (items: {}) => ({
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
  ...items,
});
