import {Character} from '../../types';
import {distributeCoinSets, distributeItem} from '../distribution';
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

  describe('distributeItem', () => {
    it('distributes when characters > number of items', () => {
      const distributed = distributeItem(characters, itemsFactory({bijou: 15}), 'bijou');
      expect(distributed[0]).toMatchSnapshot();
    });

    it('distributes when characters === number of items', () => {
      const distributed = distributeItem(characters, itemsFactory({bijou: 20}), 'bijou');
      expect(distributed[0]).toMatchSnapshot();
    });

    it('distributes when characters < number of items', () => {
      const distributed = distributeItem(characters, itemsFactory({bijou: 25}), 'bijou');
      expect(distributed[0]).toMatchSnapshot();
    });

    it('distributes when characters < number of items * 2', () => {
      const distributed = distributeItem(characters, itemsFactory({bijou: 45}), 'bijou');
      expect(distributed[0]).toMatchSnapshot();
    });

    it('removes the number of distributed items from the item count', () => {
      const distributed = distributeItem(characters, itemsFactory({bijou: 25}), 'bijou');
      expect(distributed[1]).toMatchSnapshot();
    });

    it('handles empty character lists', () => {
      const empty = {};
      const distributed = distributeItem(empty, itemsFactory({bijou: 25}), 'bijou');
      expect(distributed[0]).toBe(empty);
    });
  });

  describe('distributeCoinSets', () => {
    it('works', () => {
      const [distributed, remainingCoins] = distributeCoinSets(characters, {
        bijou: 0,

        zulian: 9,
        razzashi: 11,
        hakkari: 13,

        sandfury: 10,
        skullsplitter: 5,
        bloodscalp: 13,

        gurubashi: 8,
        vilebranch: 16,
        witherbark: 17,
      });
      expect(distributed).toMatchSnapshot();
      expect(remainingCoins).toMatchSnapshot();
    });

    it('handles empty character lists', () => {
      const empty = {};
      const distributed = distributeCoinSets(empty, itemsFactory({bijou: 25}));
      expect(distributed[0]).toBe(empty);
    });
  });
});
