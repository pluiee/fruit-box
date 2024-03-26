import { COL_COUNT, ROW_COUNT, TARGET_SUM, fruit } from './config';

const randInt = (min: number, max: number): number => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

/// Initialize map with zeros
const initMap = (): number[][] => {
  const map = Array<number[]>(ROW_COUNT);
  for (let i = 0; i < ROW_COUNT; i++) {
    map[i] = Array<number>(COL_COUNT).fill(0);
  }
  return map;
};

const emptyCoordinatesInRange = (
  map: number[][],
  left: number,
  right: number,
  top: number,
  bottom: number
): [number, number][] => {
  const emptyCoordinates: [number, number][] = [];
  for (let i = top; i < bottom; i++) {
    for (let j = left; j < right; j++) {
      if (map[i][j] === 0) emptyCoordinates.push([i, j]);
    }
  }
  return emptyCoordinates;
};

/// return a list of `len` random numbers which sum is `TARGET_SUM`
const generateTargetSumList = (len: number): number[] => {
  const arr: number[] = [];
  for (let i = 0; i < len - 1; i++) {
    const arr_sum = arr.reduce((a, b) => a + b, 0);
    const elem = randInt(1, TARGET_SUM - len + i + 1 - arr_sum);
    arr.push(elem);
  }
  arr.push(TARGET_SUM - arr.reduce((a, b) => a + b, 0));
  return arr;
};

const createSolvableMap = (): number[] => {
  const map = initMap();
  let prefillCnt = 20;
  while (prefillCnt--) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const lr = randInt(0, 1);
      const tb = 1 - lr;
      const left = randInt(0, COL_COUNT - 1 - lr);
      const right = left + 1 + lr;
      const top = randInt(0, ROW_COUNT - 1 - tb);
      const bottom = top + 1 + tb;

      const empty = emptyCoordinatesInRange(map, left, right, top, bottom);

      if (empty.length === 2) {
        const set = generateTargetSumList(2);
        for (let i = 0; i < empty.length; i++) {
          map[empty[i][0]][empty[i][1]] = set[i];
        }
        break;
      }
    }
  }

  while (emptyCoordinatesInRange(map, 0, COL_COUNT, 0, ROW_COUNT).length >= 2) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const lr = randInt(0, 1);
      const tb = 1 - lr;
      const left = randInt(0, COL_COUNT - 1 - lr);
      const right = randInt(left + 1 + lr, COL_COUNT);
      const top = randInt(0, ROW_COUNT - 1 - tb);
      const bottom = randInt(top + 1 + tb, ROW_COUNT);

      const empty = emptyCoordinatesInRange(map, left, right, top, bottom);

      if (empty.length >= 2 && empty.length <= 5) {
        const set = generateTargetSumList(empty.length);
        for (let i = 0; i < empty.length; i++) {
          map[empty[i][0]][empty[i][1]] = set[i];
        }
        break;
      }
    }
  }

  return map.flat();
};

export const getSolvableFruitList = (): fruit[] => {
  const fruitList: fruit[] = [];
  let countList = createSolvableMap();
  while (countList.filter((x) => x === 0).length) {
    countList = createSolvableMap();
  }
  for (let i = 0; i < ROW_COUNT * COL_COUNT; i++) {
    fruitList.push({
      id: i,
      count: countList[i],
      isErased: false
    });
  }
  return fruitList;
};

// random map creator
const random = (seed: number) => {
  const x = Math.sin(++seed) * 10000;
  return x - Math.floor(x);
};

export const getRandomFruitList = (seed: number): fruit[] => {
  const fruitList: fruit[] = [];
  let x = random(seed);
  for (let i = 0; i < ROW_COUNT * COL_COUNT; i++) {
    fruitList.push({
      id: i,
      count: 1 + Math.floor(x * 9),
      isErased: false
    });
    x = random(x);
  }
  return fruitList;
};
