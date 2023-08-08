import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faO, faX } from "@fortawesome/free-solid-svg-icons";
import "./OX.scss";

export enum State {
  Blank=0,
  O,
  X
}

function OX(props: any){
  const ox = props.value === State.O ? faO 
              : props.value === State.X ? faX
              : faX
  return (
    <>
      <FontAwesomeIcon 
        icon={ox} 
        size="10x" 
        className={`${props.value === State.Blank?'blank':'black'}`}
        onClick={props.onClick}/>
    </>
  )
}
export default OX;
