import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from '../firebase-config';
import { useAuth } from '../context/AuthContext';
import { v4 } from 'uuid';

function Dashboard() {
  const [list, setList] = useState([]);
  const {user} = useAuth();
  console.log(user)
  const tourniesRef = collection(db, 'tournaments')
  const usersTournies = query(tourniesRef, where('toid', '==', user.uid ));
  useEffect(()=>{
    onSnapshot(usersTournies, (snapshot) => {
    
      let tournaments = []
      snapshot.docs.forEach((doc) => {
        tournaments.push({...doc.data(), id: doc.id})
      
      })
      setList(tournaments)
    })
  },[])



  


    
  return (
    <>
    <h1>Your tournaments</h1>
    <div>
      <Link to="/tournament/new"><button className='bg-amber-700 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded ml-4'>Create Tournament</button></Link>
    </div>
    <div>
      <button className='m-1'>All-{list.length}</button>
      <button className='m-1'>Pending-{}</button>
      <button className='m-1'>in Progress-{}</button>
      <button className='m-1'>Complete-{}</button>
    </div>
    <div>
      {list.map((tournament)=>{
        return <div key={v4()}><Link to={'/tournament/'+ tournament.id}>{tournament.name}</Link></div>
      })}
    </div>
    </>


  )
}

export default Dashboard