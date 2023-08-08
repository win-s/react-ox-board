import BoardRow from "./BoardRow";
import {State as OXState} from "./OX";

function Board(props: any){
  const board = [
    [OXState.O,OXState.Blank,OXState.Blank],
    [OXState.Blank,OXState.Blank,OXState.Blank],
    [OXState.Blank,OXState.Blank,OXState.Blank],
  ]
  const handleClick = (row: number) => (column:number) => () => {
    // props.onClick(row,column);
    console.log(`row:${row} column:${column}`);
  }
  return (
    <>
      {[0,1,2].map((row)=>
        <BoardRow
          key={row}
          columns={board[row]}
          onClick={handleClick(row)}/>
      )}
    </>
  )
}

export default Board;