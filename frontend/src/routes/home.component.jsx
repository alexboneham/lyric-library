import Search from './search.component';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Photo by Markus Spispke on Unsplash
import BackgroundGrey from '../assets/images/grey.jpg';

const Home = () => {
  const backgroundStyles = {
    backgroundImage: `url(${BackgroundGrey})`,
    backgroundSize: 'cover',
    height: '100vh',
  };

  const title = 'Lyric Library';
  let subtitle = 'Search | Edit | Organize | Perform';
  let message =
    'Lyric Library is a one-stop-shop application for organizing song lyrics, poetry, prose, or any other text format.';

  return (
    <Container fluid style={backgroundStyles}>
      <Row style={{ height: '30px' }}></Row>
      <Container className="p-3 shadow-lg rounded text-dark">
        <Container className="text-center pt-4 pb-2">
          <h1 className="display-3">{title}</h1>
          <h4>{subtitle}</h4>
          <div className="d-flex flex-column align-items-center">
            <p>
              <em>{message}</em>
            </p>
            <ul style={{ listStyle: 'square' }} className="text-start">
              <li>
                <em>Search for a song by title, or by title and artist.</em>
              </li>
              <li>
                <em>Save songs to your library for features such as editing.</em>
              </li>
              <li>
                <em>Create setlists and add songs.</em>
              </li>
              <li>
                <em>Write your own songs and store them in your library</em>
              </li>
            </ul>
          </div>
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
