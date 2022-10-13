import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button variant='outline-secondary' onClick={() => navigate(-1)}>Back</Button>
  );
};

export default BackButton;
