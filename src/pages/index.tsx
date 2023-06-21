import { useState } from 'react';
import styles from './index.module.css';
const Home = () => {
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const direction = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];
  const [turnColor, setTurnColor] = useState(2);
  const newBoard: number[][] = JSON.parse(JSON.stringify(board));
  const clickcell = (x: number, y: number) => {
    if (newBoard[y][x] === 0) {
      for (const d of direction)
        if (
          0 < x + d[1] &&
          x + d[1] < 7 &&
          0 < y + d[0] &&
          y + d[0] < 7 &&
          newBoard[y + d[0]][x + d[1]] === 3 - turnColor
        ) {
          for (let distance = 2; distance < 8; distance += 1) {
            if (0 > y + d[0] * distance || y + d[1] * distance > 7) {
              break;
            } else if (newBoard[y + d[0] * distance][x + d[1] * distance] === 0) {
              break;
            } else if (newBoard[y + d[0] * distance][x + d[1] * distance] === 3 - turnColor) {
              continue;
            } else if (newBoard[y + d[0] * distance][x + d[1] * distance] === turnColor) {
              for (let dis = distance - 1; dis >= 0; dis -= 1) {
                newBoard[y + d[0] * dis][x + d[1] * dis] = turnColor;
              }
              break;
            }
          }
        }
      setTurnColor(-turnColor + 3);
      setBoard(newBoard);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((cell, x) => (
            <div className={styles.cell} key={'$(x)-$(y)'} onClick={() => clickcell(x, y)}>
              {cell !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: cell === 2 ? '#fff' : '#000' }}
                />
              )}
            </div>
          ))
        )}
      </div>
      <div>{`${turnColor === 1 ? '黒の番' : '白の番'}`}</div>
    </div>
  );
};
export default Home;
