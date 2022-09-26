import './home.styles.scss';

const Home = ({ title, message }) => (
  <div className="homepage-container">
    <h1>{title}</h1>
    <p>{message}</p>
  </div>
);

export default Home;
