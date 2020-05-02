import { Character } from '../types';
import { distributeItem } from '../lib';

function charFactory(name: string, items: {} = {}) {
  return {
    [name]: {
      sent: false,
      items: {
        ...items,
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
      }
    }
  }
}

describe('distributeItem', () => {
  let characters: { [name: string]: Character };

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
    }
  })

  it('distributes when characters > number of items', () => {
    const distributed = distributeItem(characters, 'bijou', 15);
    expect(distributed).toMatchSnapshot();
  });

  it('distributes when characters === number of items', () => {
    const distributed = distributeItem(characters, 'bijou', 20);
    expect(distributed).toMatchSnapshot();
  });

  xit('distributes when characters < number of items', () => {
    const distributed = distributeItem(characters, 'bijou', 25);
    expect(distributed).toMatchSnapshot();
  });

  it('distributes when characters < number of items * 2', () => {
    const distributed = distributeItem(characters, 'bijou', 45);
    expect(distributed).toMatchSnapshot();
  });

  describe('with existing item counts', () => {
    it('resets the count to 0 as it distributes items', () => {
      characters = {
        ...characters,
        ...charFactory('Hah', {bijou: 42}),
      }

      const distributed = distributeItem(characters, 'bijou', 20);
      expect(distributed).toMatchSnapshot();
    });

    it('resets the count to 0 if an item is not distributed', () => {
      characters = {
        ...charFactory('Hah'),
        ...charFactory('Teaspoon', { bijou: 42 }),
      }

      const distributed = distributeItem(characters, 'bijou', 1);
      expect(distributed).toMatchSnapshot();
    });
  });
});
