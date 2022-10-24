import Search from './search.component';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Photo by Markus Spispke on Unsplash
import BackgroundGrey from '../assets/images/grey.jpg';

const Home = ({ title, message }) => {
  const backgroundStyles = {
    backgroundImage: `url(${BackgroundGrey})`,
    backgroundSize: 'cover',
    height: '100vh',
  };

  return (
    <Container fluid style={backgroundStyles}>
      <Row style={{ height: '50px' }}></Row>
      <Container className="p-4 shadow-lg rounded text-dark">
        <Container className="text-center pt-5 pb-2">
          <h1 className="display-4">{title}</h1>
          <p>{message}</p>
        </Container>
        <hr />
        <Row style={{ height: '275px' }} className="">
          <Col className="d-flex flex-column justify-content-center">
            <Container className=" text-dark mt-3">
              <Search />
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
export default Home;
