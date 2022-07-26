import TwoStage from "./TwoStage";
import SingleStage from "./SingleStage";
import { v4 } from "uuid";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { addDoc, collection } from 'firebase/firestore'
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

const TournamentCreate = (props) =>{
  const [name, setName] = useState('');
  const [isTwoStage, setIsTwoStage] = useState(false);
  const [style, setStyle] = useState({groups: "koth", elim: null});
  const [categoryToAdd, setCategoryToAdd] = useState('');
  const [categories, setCategories] = useState([]);
  const [length, setLength] = useState(0);
  const [description, setDescription] = useState('')

  const {user} = useAuth();
  const navigate = useNavigate();

  const onSubmit = async(e) =>{
    e.preventDefault();
    if(user){
      await addDoc(collection(db, 'tournaments'), {
        name: name,
        toid: user.uid,
        description: description,
        style: style,
        length: parseInt(length),
        categories: categories
      });
      navigate('/tournament');
    }  
    
  }

  const handleCategoryAdd = () => {
    setCategories([...categories, categoryToAdd])
    console.log("click")
  }

  return(
    <>
    <form onSubmit={onSubmit}>
      <div>
        <h3 className="bg-slate-600">Info</h3>
        <label>Tournament name</label>
        <input type='text' placeholder="Tournament Name" onChange={(e)=>setName(e.target.value)} required/>
        <label>Description</label>
        <textarea onChange={(e)=>setDescription(e.target.value)} required/>
      </div>
      <div>
        <h3>Rules</h3>
        <div>
        <div>
          <label>Round Length</label>
          <input type="number" placeholder="Minutes" min={0} max={99} onChange={(e)=>setLength(e.target.value)} required/>
        </div>
          <label>Categories</label>
          <ol>
            {categories.map((category)=> {
            return <li key={v4()}>{category}</li>})}
          </ol>

          <input type='text' placeholder="Category" onChange={(e)=>setCategoryToAdd(e.target.value)}/>
          <button type='button' onClick={()=>handleCategoryAdd()}>Add Category</button>
          <input type='radio' id="single" name="torny_type" value={false} onChange={()=>{setIsTwoStage(false)}} />
          <label htmlFor='single' checked='checked'>Single Stage</label>
          <input type='radio' id="two" name="torny_type" value={true} onChange={()=>{setIsTwoStage(true)}} />
          <label htmlFor='two'>Two Stage</label>
        </div>
        <label>Format</label>
        {isTwoStage ? <TwoStage setStyle={setStyle} /> : <SingleStage setTyle={setStyle} />}
      </div>
      <button>Create Tournament</button>
    </form>
    </>
  );
}

export default TournamentCreate;