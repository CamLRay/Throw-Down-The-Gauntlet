import { useState } from "react";
const TournamentCreate = (props) =>{
  const { onCreate } = props;
  const [name, setName] = useState('');
  const [style, setStyle] = useState('koth');

  const onSubmit = (e) =>{
    e.preventDefault();
    onCreate({name: name, style: style});
  }

  return(
    <>
    <form onSubmit={onSubmit}>
      <input type='text' placeholder="Tournament Name..." onChange={(e)=>setName(e.target.value)}/>
      <select onChange={(e)=>setStyle(e.target.value)}>
        <option value='koth' defaultValue>King of the Hill</option>
        <option value='swiss'>Swiss</option>
      </select>
      <button>Create Tournament</button>
    </form>
    </>
  );
}

export default TournamentCreate;