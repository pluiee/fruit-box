import {
  BACKGROUND_COLOR,
  FRUIT_BORDER_COLOR,
  FRUIT_COLORS,
  FRUIT_MONO_COLOR,
  FRUIT_SIZE,
  FRUIT_TEXT_COLOR,
  drag,
  fruit,
  getDragArea
} from '../../config';
import { useRef, useEffect, useState } from 'react';

interface FruitProps {
  fruit: fruit;
  dragState: drag;
  colorful: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const Fruit = ({ fruit, dragState, colorful, setIsSelected }: FruitProps) => {
  const [isDragged, setIsDragged] = useState(false);
  const fruitRef = useRef<HTMLDivElement>(null);
  const fruitStyle = {
    width: FRUIT_SIZE,
    height: FRUIT_SIZE,
    backgroundColor: colorful ? FRUIT_COLORS[fruit.count - 1] : FRUIT_MONO_COLOR,
    border: `4px solid ${isDragged ? FRUIT_BORDER_COLOR : BACKGROUND_COLOR}`,
    color: FRUIT_TEXT_COLOR,
    opacity: fruit.isErased ? 0 : 1,
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    fontWeight: 800,
    fontSize: 24,
    transition: '0.1s'
  };
  useEffect(() => {
    if (dragState.isMouseDown === false || !fruitRef.current) {
      setIsDragged(false);
      return;
    }
    const dragArea = getDragArea(dragState);
    const fruitTop = fruitRef.current.offsetTop;
    const fruitLeft = fruitRef.current.offsetLeft;
    if (
      fruitTop > dragArea.top + dragArea.height ||
      fruitTop + FRUIT_SIZE < dragArea.top ||
      fruitLeft > dragArea.left + dragArea.width ||
      fruitLeft + FRUIT_SIZE < dragArea.left
    ) {
      setIsSelected((isSelected) => isSelected.map((x, i) => (i == fruit.id ? false : x)));
      setIsDragged(false);
    } else {
      setIsSelected((isSelected) => isSelected.map((x, i) => (i == fruit.id ? true : x)));
      setIsDragged(true);
    }
  }, [dragState]);
  return (
    <div style={fruitStyle} ref={fruitRef}>
      {fruit.count}
    </div>
  );
};

export default Fruit;
