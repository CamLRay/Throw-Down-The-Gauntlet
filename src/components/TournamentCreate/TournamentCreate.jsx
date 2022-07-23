import TwoStage from "./TwoStage";
import SingleStage from "./SingleStage";
import { v4 } from "uuid";
import { useState } from "react";

const TournamentCreate = (props) =>{
  const { onCreate } = props;
  const [name, setName] = useState('');
  const [isTwoStage, setIsTwoStage] = useState(false);
  const [style, setStyle] = useState('koth');
  const [categoryToAdd, setCategoryToAdd] = useState('');
  const [categories, setCategories] = useState([]);
  const [length, setLength] = useState(0)

  const onSubmit = (e) =>{
    e.preventDefault();
    onCreate({name: name, style: style});
  }

  const handleCategoryAdd = () => {
    setCategories([...categories, categoryToAdd])
    console.log("click")
  }

  return(
    <>
    <form onSubmit={onSubmit}>
      <div>
        <h3 className="bg-slate-700 text">Info</h3>
        <label>Tournament name</label>
        <input type='text' placeholder="Tournament Name" onChange={(e)=>setName(e.target.value)}/>
        <label>Description</label>
        <textarea />
      </div>
      <div>
        <h3>Rules</h3>
        <div>
        <div>
          <label>Round Length</label>
          <input type="number" placeholder="Minutes" min={0} max={99} onChange={(e)=>setLength(e.target.value)}/>
        </div>
          <label>Categories</label>
          <ol>
            {categories.map((category)=> {
            return <li key={v4()}>{category}</li>})}
          </ol>

          <input type='text' placeholder="Category" onChange={(e)=>setCategoryToAdd(e.target.value)} />
          <button type='button' onClick={()=>handleCategoryAdd()}>Add Category</button>
          <input type='radio' id="single" name="torny_type" value={false} onChange={()=>{setIsTwoStage(false)}} />
          <label htmlFor='single' checked='checked'>Single Stage</label>
          <input type='radio' id="two" name="torny_type" value={true} onChange={()=>{setIsTwoStage(true)}} />
          <label htmlFor='two'>Two Stage</label>
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