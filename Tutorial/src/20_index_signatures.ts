type NumberDict = { [k: string]: number };

const counters: NumberDict = {};

counters['likes'] = 1;
counters['views'] = 2;
counters['shares'] = 3;

console.log(counters);

type Metrices = Record<'likes' | 'views' | 'shares', number>;

const counters2: Metrices = {
  likes: 1,
  views: 2,
  shares: 3,
};

const priceMap = new Map<string, number>();

priceMap.set('apple', 1);
priceMap.set('banana', 2);
priceMap.set('orange', 3);

type LooseMap = Record<string, number | undefined>;

const priceMap2: LooseMap = {
  apple: 1,
  banana: 2,
  orange: 3,
  mango: undefined,
};

console.log(priceMap2);
