import {State as OXState } from './OX';

export const nextPlayer = (previousPlayer: OXState) => previousPlayer === OXState.X ? OXState.O : OXState.X;

export const nextMove = (board: OXState[][]) => 
                        (previousPlayer: OXState) =>
                        (x: number, y: number) => {
  if(board[x][y] !== OXState.Blank){
    return board;
  }

  const player = nextPlayer(previousPlayer);
  return board.map( (row,index) => {
    if(index === x){
      const newRow = row.slice(0);
      newRow[y]=player;
      return newRow;
    }else{
      return row;
    }
  })
}

export enum GameState {
  NOT_END=0,
  X_WIN,
  O_WIN,
  DRAW,
}

export const fullBoard = (board: OXState[][]) => !board.join().includes(OXState.Blank + '');

export const createColumns = (board: OXState[][]) => {
  let columns = [];
  for(let i =0;i<board.length;i++){
    columns[i] = [] as OXState[];
  }

  for (let x=0;x<board.length;x++){
    for(let y=0;y<board.length;y++){
      columns[x].push(board[y][x]);
    }
  }

  return columns;
}

export const evaluateWinner = (board: OXState[][]) => {
  const crossRow = [
    [board[0][0],board[1][1],board[2][2]],
    [board[0][2],board[1][1],board[2][0]],
  ];
  const columns = createColumns(board);
  
  const winner = board
  .concat(
      columns,
      crossRow
    )
  .map(
      row => {
        return evaluateWinnerByRow(row)
      } 
    )
  .reduce(
      (accumulated,result) => result !== GameState.NOT_END ? result : accumulated
    );


  if(fullBoard(board) && winner === GameState.NOT_END){
    return GameState.DRAW
  }
  
  return winner;
}

export const gameResult = evaluateWinner;

export const evaluateWinnerByRow = (row: OXState[]) => {

  const sameOXMark = row.reduce(
    (acc,x) => acc === x ? x : OXState.Blank ,
    row[0]
  );

  switch(sameOXMark){
    case OXState.O: return GameState.O_WIN;
    case OXState.X: return GameState.X_WIN;
    default: return GameState.NOT_END;
  }
  
}
