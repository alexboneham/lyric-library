import { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';

const SongCard = ({ song }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handlerEnter = () => setIsHovering(true);
  const handleLeave = () => setIsHovering(false);

  return (
    <Card
      style={{ cursor: 'pointer' }}
      className={isHovering && 'opacity-75'}
      onMouseEnter={handlerEnter}
      onMouseLeave={handleLeave}
    >
      <Card.Img src={song.thumbnail_url} alt={song.full_title} />
      <Collapse in={isHovering} timeout={300}>
        <div>
          <Card.Body className="text-center">
            <Card.Title>{song.title}</Card.Title>
            <Card.Text>{song.artist}</Card.Text>
          </Card.Body>
        </div>
      </Collapse>
    </Card>
  );
};

export default SongCard;
