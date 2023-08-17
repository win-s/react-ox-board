
import { createColumns, GameState, evaluateWinnerByRow, evaluateWinner } from './service';
import { State } from './OX';

const [O,X,E] = [State.O,State.X,State.Blank];

describe('createColumns',()=>{
  
  test.each([
    {
      text: 'correctly pivot board',
      board: [
        [X,X,X],
        [E,E,E],
        [O,O,O],
      ],
      shouldBe: [
        [X,E,O],
        [X,E,O],
        [X,E,O],
      ]
    },
    {
      text: 'empty board should get empty columns',
      board: new Array(3).fill(
        new Array(3).fill(State.Blank)
      ),
      shouldBe: new Array(3).fill(
        new Array(3).fill(State.Blank)
      )
    },
    {
      text: 'cross X board should be equal to columns',
      board: [
        [X,E,O],
        [E,X,E],
        [O,E,X],
      ],
      shouldBe: [
        [X,E,O],
        [E,X,E],
        [O,E,X],
      ]
    },
  ])('$text', ({
    board,
    shouldBe
  }) => {

    const columns = createColumns(board);
    expect(columns).toEqual(shouldBe)
  
  })
});

describe('evaluateWinnerByRow',()=>{
  test.each([
    {
      text: 'X win',
      row: [X,X,X],
      shouldBe: GameState.X_WIN,
    },{
      text: 'O win',
      row: [O,O,O],
      shouldBe: GameState.O_WIN,
    },{
      text: 'no one win on blank row',
      row: [E,E,E],
      shouldBe: GameState.NOT_END,
    },{
      text: 'not x or y win',
      row: [X,O,O],
      shouldBe: GameState.NOT_END,
    },{
      text: 'no one win if it has a blank spot',
      row: [X,X,E],
      shouldBe: GameState.NOT_END,
    }
  ])('$text',({
    row,
    shouldBe
  })=>{
    const result = evaluateWinnerByRow(row);
    expect(result).toBe(shouldBe);
  });
});

describe('evaluateWinner',()=>{
  test.each([
    {
      text: 'X win by row',
      board: [
        [E,E,E],
        [X,X,X],
        [E,E,E],
      ],
      shouldBe: GameState.X_WIN
    },{
      text: 'X win by column',
      board: [
        [E,X,E],
        [E,X,E],
        [E,X,E],
      ],
      shouldBe: GameState.X_WIN
    },{
      text: 'X win by cross 1',
      board: [
        [X,E,E],
        [E,X,E],
        [E,E,X],
      ],
      shouldBe: GameState.X_WIN
    },{
      text: 'X win by cross 2',
      board: [
        [E,E,X],
        [E,X,E],
        [X,E,E],
      ],
      shouldBe: GameState.X_WIN
    },{
      text: 'Draw',
      board: [
        [O,O,X],
        [X,X,O],
        [O,X,O],
      ],
      shouldBe: GameState.DRAW
    },{
      text: 'O win with cross 2',
      board: [
        [E,E,O],
        [E,O,E],
        [O,E,E],
      ],
      shouldBe: GameState.O_WIN
    },{
      text: 'not end game yet when board is empty',
      board: [
        [E,E,E],
        [E,E,E],
        [E,E,E],
      ],
      shouldBe: GameState.NOT_END
    },{
      text: 'not end game yet when no one win',
      board: [
        [E,E,E],
        [E,O,E],
        [E,X,E],
      ],
      shouldBe: GameState.NOT_END
    },
  ])('$text',({
    board,
    shouldBe
  })=>{
    const gameState = evaluateWinner(board);
    expect(gameState).toBe(shouldBe);
  });
})
