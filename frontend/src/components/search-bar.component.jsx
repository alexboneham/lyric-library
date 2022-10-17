import { ReactComponent as Arrow } from '../assets/logos/right-arrow.svg';

import Form from 'react-bootstrap/Form';

const SearchBar = ({ handleChange, value, placeholderValue }) => {
  const groupStyles = {
    position: 'relative',
  };
  const buttonStyles = {
    all: 'unset',
  };
  const arrowStyles = {
    height: '25px',
    position: 'absolute',
    right: '5px',
    top: '6px',
  };

  return (
    <>
      <Form.Group style={groupStyles}>
        <Form.Control type="text" placeholder={placeholderValue} value={value} onChange={handleChange} />
        <button type="submit" style={buttonStyles}>
          <Arrow style={arrowStyles} />
        </button>
      </Form.Group>
    </>
  );
};

export default SearchBar;
