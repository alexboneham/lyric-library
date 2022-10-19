import Search from './search.component';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

import BackgroundImgMic from '../assets/images/mic-on-stage.jpg';
// import BackgroundImgBand from '../assets/images/instruments.jpg';
// import BackgroundImgGrey from '../assets/images/grey-background.jpg';

const Home = ({ title, message }) => {
  const backgroundStyles = {
    backgroundImage: `url(${BackgroundImgMic})`,
    backgroundSize: 'cover',
    height: '100vh',
  };

  return (
    <Container fluid style={backgroundStyles}>
      <Container className="p-5 shadow-lg rounded text-light">
        <Container className="text-center pt-5 pb-2">
          <h1 className="display-4">{title}</h1>
          <p>{message}</p>
        </Container>
        <hr />
        <Container className="bg-light bg-opacity-50 text-dark w-50 rounded-pill mt-4">
          <Search />
        </Container>
        
      </Container>
    </Container>
  );
};
export default Home;
