import Search from './search.component';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import BackgroundImgMic from '../assets/images/mic-on-stage.jpg';
import BackgroundBlue from '../assets/images/backgroundBlue.jpg';
// import BackgroundImgBand from '../assets/images/instruments.jpg';
// import BackgroundImgGrey from '../assets/images/grey-background.jpg';

const Home = ({ title, message }) => {
  const backgroundStyles = {
    backgroundImage: `url(${BackgroundBlue})`,
    backgroundSize: 'cover',
    height: '100vh',
  };

  return (
    <Container fluid style={backgroundStyles}>
      <Row style={{ height: '100px' }}></Row>
      <Container className="p-4 shadow-lg rounded text-dark">
        <Container className="text-center pt-5 pb-2">
          <h1 className="display-4">{title}</h1>
          <p>{message}</p>
        </Container>
        <hr />
        <Row style={{ height: '275px' }} className=''>
          <Col className='d-flex flex-column justify-content-center'>
            <Container className="bg-light bg-opacity-50 text-dark w-50 rounded-pill mt-3">
              <Search />
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
export default Home;
