import { React, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from '../firebase-config';
import { useAuth } from '../context/AuthContext';
import { v4 } from 'uuid';
import { ChevronDownIcon, UserIcon } from '@heroicons/react/solid';

function Dashboard() {
  const listRef = useRef([]);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState('all');
  const [pending, setPending] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [complete, setComplete] = useState([]);
  
  const {user} = useAuth();
  
  useEffect(()=>{
    if(user.uid){
      const tourniesRef = collection(db, 'tournaments')
      const usersTournies = query(tourniesRef, where('toid', '==', user.uid ));
      const unsub = onSnapshot(usersTournies, (snapshot) => {
      
        let tournaments = []
        snapshot.docs.forEach((doc) => {
          tournaments.push({...doc.data(), id: doc.id})
        })
        setList(tournaments);
        listRef.current = tournaments;
        setPending(listRef.current.filter(tournament => tournament.status === 'pending'));
        setInProgress(listRef.current.filter(tournament => tournament.status === 'inProgress'));
        setComplete(listRef.current.filter(tournament => tournament.status === 'complete'));
      });
      return ()=> unsub();
    }
  },[user])

  const filterAll = () => {
    setSelected("all");
    setList(listRef.current);
  }
  const filterPending = () => {
    setSelected("pending");
    setList([...pending]);
  } 
  const filterInProgress = () => {
    setSelected("inProgress");
 
    setList([...inProgress]);
  } 
  const filterComplete = () => {
    setSelected("complete");

    setList([...complete]);
  } 

  return (
    <>
    <div className='flex justify-center bg-slate-700 py-10'>
      <div className='w-2/3'>
        <h1 className='text-2xl mb-2 font-thin text-white'>{user.displayName}'s tournaments </h1>
        <Link to="/tournament/new"><button className='bg-amber-500 hover:bg-amber-600 text-white font-bold py-1 px-4 rounded w-full'>Create Tournament<ChevronDownIcon className='w-6 inline' /></button></Link>
      </div>
    </div>
    <div className='text-center'>
      <button 
        className={selected === 'all' ? 'm-1 hover:text-white underline underline-offset-4 decoration-amber-500 decoration-4' :'m-1 hover:text-white'} 
        onClick={()=>filterAll()}>All - {listRef.current.length ? listRef.current.length : 0}
      </button>
      <button 
        className={selected === 'pending' ? `m-1 hover:text-white underline underline-offset-4 decoration-amber-500 decoration-4` : 'm-1 hover:text-white' }
        onClick={()=>filterPending()}>Pending - {pending.length ? pending.length : 0}
      </button>
      <button 
        className={selected === 'inProgress' ? `m-1 hover:text-white underline underline-offset-4 decoration-amber-500 decoration-4` : 'm-1 hover:text-white' } 
        onClick={()=>filterInProgress()}>In Progress - {inProgress.length ? inProgress.length: 0}
      </button>
      <button 
        className={selected === 'complete' ? `m-1 hover:text-white underline underline-offset-4 decoration-amber-500 decoration-4` : 'm-1 hover:text-white' } 
        onClick={()=>filterComplete()}>Complete - {complete.length ? complete.length : 0}
      </button>
    </div>
    <div className='flex flex-col m-4'>
      {list.length ? list.map((tournament)=>{
        return( 
        <Link key={v4()} to={`/tournament/${tournament.id}`} className="bg-neutral-600 text-white border-b border-slate-800 p-4 px-6 hover:bg-slate-600 flex justify-between">
          <div>
            <h4 className='font-semibold'>{tournament.name}</h4>
            <p className='text-white/50 text-[.70rem]'>{tournament.style.groups} {tournament.style.elim ? `- ${tournament.style.elim}` : null}</p>
          </div>
          <div className="flex">

            <p className='my-auto mx-1'>{tournament.players.length}</p>
            <UserIcon className='w-5' />
          </div>
        </Link>
        )
      }): "Loading"}
    </div>
    </>


  )
}

export default Dashboard