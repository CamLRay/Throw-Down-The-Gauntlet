import TwoStage from "./TwoStage";
import SingleStage from "./SingleStage";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { addDoc, collection} from 'firebase/firestore'
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

const TournamentCreate = (props) =>{
  const [name, setName] = useState('');
  const [isTwoStage, setIsTwoStage] = useState(false);
  const [style, setStyle] = useState({groups: null, elim: null});
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
        categories: categories,
        players:[]
      })
        .then((docRef)=>{
          navigate('/tournament/' + docRef.id)
        })
        .catch((error)=>{
          console.error("Error adding document: ", error)
        })
    }  
    
  }

  const handleCategoryAdd = () => {
    setCategories([...categories, categoryToAdd])
  }

  return(
    <>
    <form className="flex-col m-10 text-white" onSubmit={onSubmit} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
      <div className="bg-slate-700 flex flex-col rounded mb-5">
        <h3 className="bg-slate-800 p-1 pl-2">Info</h3>
        <div className="flex justify-between p-2">
          <label className="w-1/3">Tournament name</label>
          <input className="w-2/3 bg-gray-600 p-1 rounded" type='text' placeholder="Tournament Name" onChange={(e)=>setName(e.target.value)} required/>
        </div>
        <div className="flex justify-between p-2">
          <label>Description</label>
          <textarea className='w-2/3 h-40 bg-gray-600 p-1 rounded' onChange={(e)=>setDescription(e.target.value)} required/>
        </div>
      </div>
      <div className="bg-slate-700 flex flex-col rounded mb-5">
        <h3 className="bg-slate-800 p-1 pl-2">Rules</h3>
        <div>
          <div className="flex justify-between p-2">
            <label className="w-1/3">Round Length</label>
            <input className="w-2/3 bg-gray-600 p-1 rounded" type="number" placeholder="Minutes" min={0} max={99} onChange={(e)=>setLength(e.target.value)} required/>
          </div>
          <label className="p-2">Categories</label>
          <div className="flex justify-between p-2">
            <div className="w-1/3 bg-gray-600 p-2 rounded">
              <input className="bg-gray-700 p-1 rounded mb-1" type='text' placeholder="Category" onChange={(e)=>setCategoryToAdd(e.target.value)}/>
              <button className="bg-amber-600 p-1 rounded" type='button' onClick={()=>handleCategoryAdd()}>Add Category</button>
              <button className="bg-amber-900 p-1 rounded ml-1" type="button" onClick={()=>setCategories([])}>Clear List</button>
            </div>
            <ol className="bg-gray-800 p-2 w-2/3 flex flex-col flex-wrap overflow-auto justify-start h-40">
              {categories.length ? categories.map((category)=> {
              return <li className="pr-2" key={v4()}>{category}</li>}): <li className="text-white/50 text-center text-4xl">Empty</li>}
            </ol>
          </div>
            
            <div className="flex justify-center">
              <div className="p-1">
                <input type='radio' id="single" name="torny_type" value={false} onChange={()=>{setIsTwoStage(false)}} />
                <label htmlFor='single' checked='checked'>Single Stage</label>
              </div>
              <div className="p-1">
                <input type='radio' id="two" name="torny_type" value={true} onChange={()=>{setIsTwoStage(true)}} />
                <label htmlFor='two'>Two Stage</label>
              </div>
            </div>
          
        </div>
        <div>
          {isTwoStage ? <TwoStage setStyle={[setStyle]} /> : <SingleStage setTyle={[setStyle]} />}
        </div>
      </div>
      <button className="bg-amber-600 p-1 font-semibold rounded">Create Tournament</button>
    </form>
    </>
  );
}

export default TournamentCreate;