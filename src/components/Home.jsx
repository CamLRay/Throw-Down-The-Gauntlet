import {Link} from 'react-router-dom';

const Home = () =>{
  return( 
    <>
      <h1>Homepage</h1>
      <Link to='/tournament/new'>Create Tournament</Link>
    </>
  
  );
}

export default Home;