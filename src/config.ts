export const FRUIT_SIZE = 54;
export const GAP_SIZE = 4;
export const ROW_COUNT = 10;
export const COL_COUNT = 17;
export const PADDING = 10;
export const BACKGROUND_COLOR = '#ffffff';
export const FRUIT_COLOR = '#777777';
export const FRUIT_TEXT_COLOR = '#ffffff';
export const FRUIT_BORDER_COLOR = '#000000';
export const TARGET_SUM = 10;
export const TIME_LIMIT = 100;

export const gameStyle = {
  gap: GAP_SIZE,
  width: FRUIT_SIZE * COL_COUNT + GAP_SIZE * (COL_COUNT - 1) + 2 * PADDING + 2,
  height: FRUIT_SIZE * ROW_COUNT + GAP_SIZE * (ROW_COUNT - 1) + 2 * PADDING + 2,
  padding: PADDING
};

export interface fruit {
  id: number;
  count: number;
  isErased: boolean;
}

export const getRandomFruitList = (): fruit[] => {
  const fruitList: fruit[] = [];
  for (let i = 0; i < ROW_COUNT * COL_COUNT; i++) {
    fruitList.push({
      id: i,
      count: 1 + Math.floor(Math.random() * 9),
      isErased: false
    });
  }
  return fruitList;
};

export const getInitialIsSelected = (): boolean[] => {
  const isSelected = [];
  for (let i = 0; i < ROW_COUNT * COL_COUNT; i++) {
    isSelected.push(false);
  }
  return isSelected;
};

export interface drag {
  isMouseDown: boolean;
  startX: number;
  startY: number;
  currX: number;
  currY: number;
}

export const initialDrag = {
  isMouseDown: false,
  startX: 0,
  startY: 0,
  currX: 0,
  currY: 0
};

export const getDragArea = (dragState: drag) => {
  return {
    top: Math.min(dragState.startY, dragState.currY),
    left: Math.min(dragState.startX, dragState.currX),
    height: Math.abs(dragState.currY - dragState.startY),
    width: Math.abs(dragState.currX - dragState.startX)
  };
};

// export const getDraggedFruits = (fruitState: fruit[], dragState: drag) => {

// }
