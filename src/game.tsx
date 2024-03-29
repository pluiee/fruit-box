import Fruit from './components/fruit';
import {
  COL_COUNT,
  ROW_COUNT,
  TARGET_SUM,
  TIME_LIMIT,
  drag,
  gameStyle,
  getDragArea,
  getInitialIsSelected,
  initialDrag,
  fruit
} from './config';
import './game.css';
import { useState, MouseEvent, useMemo, useEffect } from 'react';
import { getRandomFruitList, getSolvableFruitList } from './map';

const Game = () => {
  const initialIsSelected = getInitialIsSelected();
  const [score, setScore] = useState(0);
  const [fruitState, setFruitState] = useState<fruit[]>([]);
  const [dragState, setDragState] = useState<drag>(initialDrag);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSelected, setIsSelected] = useState<boolean[]>(initialIsSelected);
  const [isFinished, setIsFinished] = useState(false);
  const [time, setTime] = useState(0);
  const [colorful, setColorful] = useState(true);
  const [infinite, setInfinite] = useState(false);
  const [seed, setSeed] = useState(0);
  const [seeded, setSeeded] = useState(false);
  const [solvable, setSolvable] = useState(true);
  const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    setDragState({
      isMouseDown: true,
      startX: event.pageX,
      startY: event.pageY,
      currX: event.pageX,
      currY: event.pageY
    });
  };
  const onMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    event?.stopPropagation();
    if (draggedSum == TARGET_SUM) {
      let fruitCount = 0;
      const selectedIndex: number[] = [];
      isSelected.forEach((flag, i) => {
        if (flag && !fruitState[i].isErased) {
          fruitCount++;
          selectedIndex.push(i);
        }
      });
      setScore((score) => score + fruitCount);
      setFruitState((fruitState) =>
        fruitState.map((fruit, i) =>
          selectedIndex.includes(i) ? { ...fruit, isErased: true } : fruit
        )
      );
    }
    setDragState(initialDrag);
    setIsSelected(initialIsSelected);
  };
  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (dragState.isMouseDown === false) return;
    setDragState((dragState) => ({
      ...dragState,
      currX: event.pageX,
      currY: event.pageY
    }));
  };
  const dragAreaStyle = getDragArea(dragState);
  const draggedSum = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < ROW_COUNT * COL_COUNT; i++) {
      if (isSelected[i] && !fruitState[i].isErased) sum += fruitState[i].count;
    }
    return sum;
  }, [isSelected]);

  const reset = () => {
    setScore(0);
    setFruitState(
      solvable ? getSolvableFruitList() : getRandomFruitList(seeded ? seed : Math.random())
    );
    setDragState(initialDrag);
    setIsSelected(initialIsSelected);
    setTime(0);
    setIsFinished(false);
  };

  useEffect(() => {
    reset();
    if (!isPlaying) return;
    const timeInterval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timeInterval);
  }, [isPlaying]);

  useEffect(() => {
    if (time === TIME_LIMIT + 1 && !infinite) setIsFinished(true);
  }, [time]);

  useEffect(() => {
    if (!isFinished) return;
    alert(`Your score is ${score}!`);
    setIsPlaying(false);
  }, [isFinished]);

  return (
    <div className="screen" onMouseUp={onMouseUp}>
      <div className="score">score: {score}</div>
      <div className="settings">
        <span>
          <button onClick={() => setIsPlaying(true)}>start</button>
          <button onClick={() => setIsPlaying(false)}>reset</button>
        </span>
        <span className="options">
          <label className="label">
            <input
              type="checkbox"
              checked={colorful}
              onChange={(e) => setColorful(e.target.checked)}
            />
            color
          </label>
          {!isPlaying && (
            <>
              <label className="label">
                <input
                  type="checkbox"
                  checked={!infinite}
                  onChange={(e) => setInfinite(!e.target.checked)}
                />
                clock
              </label>
              <label className="label">
                <input
                  type="checkbox"
                  checked={solvable}
                  onChange={(e) => setSolvable(e.target.checked)}
                />
                solvable
              </label>
              <label className="label">
                <input
                  type="checkbox"
                  checked={seeded}
                  disabled={solvable}
                  onChange={(e) => setSeeded(e.target.checked)}
                />
                seeded
              </label>
            </>
          )}
        </span>
        {!isPlaying && (
          <label>
            <input
              type="number"
              step="0.01"
              className="seed"
              value={seed}
              onChange={(e) => setSeed(+e.target.value)}
            />
            seed
          </label>
        )}
      </div>
      {isPlaying && (
        <>
          {!infinite && (
            <div className="full-time-bar">
              <div className="time-bar" style={{ width: 500 * (time / TIME_LIMIT) }} />
            </div>
          )}
          <div
            className="game-frame"
            style={gameStyle}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}>
            {fruitState.map((fruit) => (
              <Fruit
                key={fruit.id}
                fruit={fruit}
                colorful={colorful}
                dragState={dragState}
                setIsSelected={setIsSelected}
              />
            ))}
            {dragState.isMouseDown ? <div className="drag-area" style={dragAreaStyle} /> : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
