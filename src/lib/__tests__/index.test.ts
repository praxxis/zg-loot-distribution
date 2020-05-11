import {lowestRepSort, nonRepSum, repSum} from '../../lib';
import {Character} from '../../types';
import {charFactory, itemsFactory} from './lib';

describe('distribution', () => {
  let characters: {[name: string]: Character};

  beforeEach(() => {
    characters = {
      ...charFactory('Hah'),
      ...charFactory('Teaspoon'),
      ...charFactory('Gearman'),
      ...charFactory('Cabinets/Garage'),
      ...charFactory('Fingerblast'),
      ...charFactory('Mattson'),
      ...charFactory('Potatocrisp'),
      ...charFactory('Praxxis'),
      ...charFactory('Zeelazee'),
      ...charFactory('Eyopotato'),
      ...charFactory('Orcrouge'),
      ...charFactory('Shishkabob'),
      ...charFactory('Defecography'),
      ...charFactory('Ironhead'),
      ...charFactory('Prettypanda'),
      ...charFactory('Dioica'),
      ...charFactory('Marzik'),
      ...charFactory('Shealer'),
      ...charFactory('Meship'),
      ...charFactory('Trogz'),
    };
  });

  describe('repSum', () => {
    it('works', () => {
      const chars = charFactory('Hah', {
        bijou: 1,
        zulian: 1,
        razzashi: 1,
        hakkari: 1,
        sandfury: 1,
        skullsplitter: 1,
        bloodscalp: 1,
        gurubashi: 1,
        vilebranch: 1,
        witherbark: 1,
      });

      expect(repSum(chars['Hah'].items)).toEqual(150);
    });

    it('only counts full coin sets', () => {
      const chars = charFactory('Hah', {
        bijou: 0,

        zulian: 2,
        razzashi: 4,
        hakkari: 9,

        sandfury: 1,
        skullsplitter: 3,
        bloodscalp: 1,

        gurubashi: 0,
        vilebranch: 1,
        witherbark: 1,
      });

      expect(repSum(chars['Hah'].items)).toEqual(75);
    });
  });

  describe('lowestRepSort', () => {
    it('works', () => {
      characters = {
        ...charFactory('Hah', {bijou: 1}),
        ...charFactory('Gearman'),
        ...charFactory('Teaspoon', {
          gurubashi: 1,
          vilebranch: 1,
          witherbark: 1,
        }),
        ...charFactory('Cabinets/Garage', {
          zulian: 2,
          razzashi: 4,
          hakkari: 9,
        }),
      };

      expect(lowestRepSort(characters)).toMatchSnapshot();
    });

    it('tie breaks using the count of non rep items', () => {
      characters = {
        ...charFactory('Hah', {bijou: 1}),
        ...charFactory('Gearman'),
        ...charFactory('Teaspoon', {
          gurubashi: 3,
          vilebranch: 3,
          witherbark: 3,
        }),
        ...charFactory('Cabinets/Garage', {
          zulian: 1,
          razzashi: 4,
          hakkari: 4,
        }),
      };

      // tsp and garage have the same number of coins, but tsp's items represent 75 rep while Garage's only represent 25 rep
      expect(lowestRepSort(characters)).toMatchSnapshot();
    });
  });

  describe('nonRepSum', () => {
    it('works', () => {
      expect(
        nonRepSum(
          itemsFactory({
            bijou: 1,
            zulian: 1,
            razzashi: 2,
            hakkari: 1,
            sandfury: 1,
          })
        )
      ).toEqual(2);
    });
  });
});
