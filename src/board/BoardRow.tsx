
import "./BoardRow.scss";

import OX from "./OX";


function BoardRow(props: any){
  return (
    <div className="row">
      {props.columns}
      {
        [0,1,2].map( (column) =>{
          return (
            <div className="cell" key={column}>
              {props.columns[column]}
              <OX
                value={props.columns[column]}
                onClick={props.onClick(column)}/>
            </div>
          )
        })
      }
    </div>
  )
}

export default BoardRow;
