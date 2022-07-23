import TwoStage from "./TwoStage";
import SingleStage from "./SingleStage";
import { useState } from "react";

const TournamentCreate = (props) =>{
  const { onCreate } = props;
  const [name, setName] = useState('');
  const [isTwoStage, setIsTwoStage] = useState(false);
  const [style, setStyle] = useState('koth');

  const onSubmit = (e) =>{
    e.preventDefault();
    onCreate({name: name, style: style});
  }

  return(
    <>
    <form onSubmit={onSubmit}>
      <div>
        <h3>Base Info</h3>
        <label>Tournament name</label>
        <input type='text' placeholder="Tournament Name" onChange={(e)=>setName(e.target.value)}/>
        <label>Description</label>
        <textarea />
      </div>
      <div>
        <h3>Base Rules</h3>
        <div>
          <input type='radio' id="single" name="torny_type" value={false} onChange={()=>{setIsTwoStage(false)}} />
          <label for='single'>Single Stage</label>
          <input type='radio' id="two" name="torny_type" value={true} onChange={()=>{setIsTwoStage(true)}} />
          <label for='two'>Two Stage</label>
        </div>
        <label>Format</label>
        {isTwoStage ? <TwoStage /> : <SingleStage />}
      </div>
      <button>Create Tournament</button>
    </form>
    </>
  );
}

export default TournamentCreate;