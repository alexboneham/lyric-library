import './home.styles.scss';

const Home = ({title, message}) => {

  return (
    <div className="homepage-container">
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  );
};

export default Home;
