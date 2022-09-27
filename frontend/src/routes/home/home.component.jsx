import { Link } from 'react-router-dom';

import './home.styles.scss';

const Home = ({ title, message }) => (
  <div className="homepage-container">
    <h1>{title}</h1>
    <p>{message}</p>
    <hr />
    <div className='usage-container'>
      <h2>Usage:</h2>
      <ul className='list'>
        <li className='list-item'>
          <Link to={'/search'}>Search</Link> for a song by title or artist
        </li>
        <li className='list-item'>
          Save a song to your <Link to={'/library'}>Library</Link> for fast access and more features
        </li>
        <li className='list-item'>
          Create <Link to={'/setlists'}>Setlists</Link> and add songs
        </li>
      </ul>
    </div>
  </div>
);

export default Home;
